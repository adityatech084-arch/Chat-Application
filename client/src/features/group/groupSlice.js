// import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
// import {axiosInstance} from "../../utils/axios.js";


// const initialState = {
//     groups: [],
//     grpMsg:[],
//      selectedUser: null,
//     loading: false,
//     error: null,
// }
// export const getGroupMessages = createAsyncThunk(
//   "group/getGroupMessages",
//   async (groupId, { rejectWithValue }) => {
//     try {
//       const res = await axiosInstance.get(`/groups/${groupId}/messages`);
//       return { groupId, messages: res.data };
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

// export const getgroups = createAsyncThunk(
//     "group/getgroups",
//     async (_, {rejectWithValue}) => {
//         try {
//            const responce = await axiosInstance.get(`/groups/my `);
//            return responce.data;
//         }

//         catch (error) {
//             return rejectWithValue(error.message);
//         }   
//     }
// );


// const groupSlice = createSlice({
//     name: "group",
//     initialState,   
//     reducers: {
//         addGroup(state, action) {
//             state.groups = [...state.groups , action.payload];
//         },
//           addGroupMessage: (state, action) => {
//       // payload = { groupId, message }
//       const { groupId, message } = action.payload;

//       if (!state.messages[groupId]) state.messages[groupId] = [];
//       state.messages[groupId].push(message);

//       // Update lastMessage and unreadCount
//       const group = state.groups.find(g => g.id === groupId);
//       if (group) {
//         group.lastMessage = message;
//         group.unreadCount = (group.unreadCount || 0) + 1;
//       }
//     },

        

//     },
//     extraReducers: (builder) => {
//         builder
//         .addCase(getgroups.pending, (state) => {
//             state.loading = true;
//             state.error = null;
//         })
//         .addCase(getgroups.fulfilled, (state, action) => {
//             state.loading = false;
//             state.groups = action.payload;
//         })
//         .addCase(getgroups.rejected, (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//         });
//     }
// });

// export const {addGroup ,addGroupMessage} = groupSlice.actions;

// export default groupSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axios.js";

const initialState = {
  groups: [],
  groupmessages: [],   // array of message objects
  selectedGroup: null,
  grouploading: false,
  groupmsgloading:true,
  error: null,
};

/* ============================
   GET MY GROUPS
============================ */
export const getgroups = createAsyncThunk(
  "group/getgroups",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/groups/user/groups");
      // console.log(res.data)
      return res.data.groups;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/* ============================
   GET GROUP MESSAGES
============================ */
export const getGroupMessages = createAsyncThunk(
  "group/getGroupMessages",
  async (groupId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/groups/messages/${groupId}`);
      return res.data; // array of messages
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    /* select group */
    setSelectedGroup(state, action) {
      state.selectedGroup = action.payload;
    },

    /* add new group (socket) */
    addGroup(state, action) {
  const newGroup = action.payload;

  // Convert _id to string for comparison
  const exists = state.groups.some(
    (g) => String(g._id || g.id) === String(newGroup._id || newGroup.id)
  );

  if (!exists) {
    state.groups.push(newGroup);
  }
}
,

    /* add new message to groupmessages */
    // addGroupMessage(state, action) {
    //   const msg = action.payload.message;

    //   // Ensure createdAt is string to avoid non-serializable error
    //   if (msg.createdAt && !(typeof msg.createdAt === "string")) {
    //     msg.createdAt = new Date(msg.createdAt).toISOString();
    //   }

    //   // push to groupmessages array
    //   state.groupmessages.push({
    //     ...msg,
    //     group: action.payload.groupId,
    //   });
    // },
      
    
    addGroupMessage: (state, action) => {
  const { message: msg, currentUserId, selectedGroupId } = action.payload;
  const groupId = msg.groupId || msg.group;

  // Prevent duplicates in groupmessages
  const exists = state.groupmessages.find(
    (m) => m._id === msg._id || m._id === msg.localId
  );
  if (!exists && selectedGroupId === groupId) {
    state.groupmessages.push(msg);
  }

  // Find the group
  const groupIndex = state.groups.findIndex((g) => g._id === groupId || g.id === groupId);
  const group = state.groups[groupIndex];

  if (group) {
    // Update last message & timestamp
    group.lastMessage = msg.text || "Media";
    group.lastMessageAt = msg.createdAt || new Date();

    // Increment unread only if group not currently selected and sender is not current user
    if (groupId !== selectedGroupId && msg.sender?._id !== currentUserId) {
      group.unreadCount = (group.unreadCount || 0) + 1;
    }

    // Move group to top
    if (groupIndex > -1) {
      const [moved] = state.groups.splice(groupIndex, 1);
      state.groups.unshift(moved);
    }
  } else {
    // If group not in state.groups yet, add it
    state.groups.unshift({
      _id: groupId,
      name: msg.groupName || "Unknown Group",
      lastMessage: msg.text || "Media",
      lastMessageAt: msg.createdAt || new Date(),
      unreadCount: (groupId !== selectedGroupId && msg.sender?._id !== currentUserId) ? 1 : 0,
    });
  }
},

    updateGroupLastMessage: (state, action) => {
    const { groupId, lastMessage, lastMessageAt, incrementUnread } = action.payload;
    const group = state.groups.find(g => g._id === groupId || g.groupId === groupId);
    if (group) {
      group.lastMessage = lastMessage;
      group.lastMessageAt = lastMessageAt;
      if (incrementUnread) {
        group.unreadCount = (group.unreadCount || 0) + 1;
      }
    }
  },

    /* reset unread when opening group */
  resetGroupUnread(state, action) {
  const group = state.groups.find(
    (g) => g._id === action.payload
  );

  if (group) {
    group.unreadCount = 0;
  }
}

  },

  extraReducers: (builder) => {
    builder
      /* get groups */
      .addCase(getgroups.pending, (state) => {
        state.grouploading = true;
        state.error = null;
      })
      .addCase(getgroups.fulfilled, (state, action) => {
        state.grouploading = false;
        state.groups = action.payload;
      })
      .addCase(getgroups.rejected, (state, action) => {
        state.grouploading = false;
        state.error = action.payload;
      })

      /* get group messages */
        .addCase(getGroupMessages.pending, (state, action) => {
        state.groupmsgloading = true;
      })
      .addCase(getGroupMessages.fulfilled, (state, action) => {
        state.groupmessages = action.payload;
        state.groupmsgloading = false;

      });
  },
});

export const {
  addGroup,
  addGroupMessage,
  setSelectedGroup,
  resetGroupUnread,
  updateGroupLastMessage
} = groupSlice.actions;

export default groupSlice.reducer;
