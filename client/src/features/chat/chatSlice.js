
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { axiosInstance } from "../../utils/axios";
// import axios from "axios";

// // Fetch chats
// export const markChatAsReadDb = createAsyncThunk(
//   "chat/markChatAsReadDb",
//   async (chatUserId, { rejectWithValue }) => {
//     try {
//       const res = await axiosInstance.put(`/message/mark-read/${chatUserId}`);
//       return chatUserId;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );
// export const fetchChats = createAsyncThunk(
//   "chat/fetchChats",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await axiosInstance.get("/message/previous-chats");
//       // console.log(res.data)
//       return res.data.chats;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

// // Fetch messages
// export const fetchMessages = createAsyncThunk(
//   "chat/fetchMessages",
//   async (userId, { rejectWithValue }) => {
//     try {
//       const res = await axiosInstance.get(`/message/${userId}`);
//       // console.log(res.data)
//       return { userId, messages: res.data };
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

// // Send message
// export const sendMessage = createAsyncThunk(
//   "chat/sendMessage",
//   async ({ receiverId, text, media }, { rejectWithValue }) => {
//     try {
//       const formData = new FormData();
//       formData.append("receiverId", receiverId);
//       formData.append("text", text || "");
//       if (media?.length) media.forEach(file => formData.append("media", file));

//       const res = await axiosInstance.post("/message/send-message", formData);
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );
// export const resetUnreadCount = createAsyncThunk(
//   "chat/resetUnreadCount",
//   async (chatUserId, { rejectWithValue }) => {
//     try {
//       const res = await axios.post(`/api/messages/read/${chatUserId}`);
//       return { chatUserId };
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );
// export const searchUsers = createAsyncThunk(
//   "chat/searchUsers",
//   async (username, { getState, rejectWithValue }) => {
//     try {
   

//       const res = await axiosInstance.get(
//         `/auth/user/search?username=${username}`);


//       console.log("SEARCH RESPONSE:", res.data);
//       return res.data;
//     } catch (err) {
//       console.error("SEARCH ERROR:", err.response?.data || err.message);
//       return rejectWithValue(
//         err.response?.data?.message || err.message
//       );
//     }
//   }
// );

// const chatSlice = createSlice({
//   name: "chat",
//   initialState: {
//     chats: [], 
//     NewChats: [],
//     selectedUser: null,
//    messages: [],  
//     searchResults: [],
//     chatmsgloading:false,
//     chatloading: false,
//     loadingSearch: false, // Added missing state
//     error: null,
//   },
//   reducers: {
//       setUserOnline: (state, action) => {
//       const userId = action.payload;
//       const chat = state.chats.find(c => c.user._id === userId);
//       if (chat) chat.user.online = true;
//     },
//     setUserOffline: (state, action) => {
//       const userId = action.payload;
//       const chat = state.chats.find(c => c.user._id === userId);
//       if (chat) chat.user.online = false;
//     },

// // addMessageInfo: (state, action) => {
// //   const { message: msg, currentUserId, selectedUserId } = action.payload;

// //   const chatUserId = msg.sender._id || msg.sender; // handle if sender is object or string
// //   const isSelectedUser = selectedUserId === chatUserId;

// //   // Find chat by matching _id
// //   const chatIndex = state.chats.findIndex((c) => {
// //     const id = c.user?._id || c.user; // handle both cases
// //     return String(id) === String(chatUserId); // compare as strings
// //   });

// //   if (chatIndex !== -1) {
// //     const chat = state.chats[chatIndex];

// //     // Update last message
// //     chat.lastMessage = msg.text || "Media";
// //     chat.lastMessageAt = msg.createdAt || new Date();

// //     // 🔥 Increment unread ONLY if chat is NOT selected
// //     if (!isSelectedUser) {
// //       chat.unreadCount = (chat.unreadCount || 0) + 1;
// //     }

// //     // Move chat to top
// //     const [movedChat] = state.chats.splice(chatIndex, 1);
// //     state.chats.unshift(movedChat);

// //   } else {
// //     // Chat does not exist → create new
// //     state.chats.unshift({
// //       user: { _id: chatUserId, fullName: msg.senderName || "Unknown" },
// //       lastMessage: msg.text || "Media",
// //       lastMessageAt: msg.createdAt || new Date(),
// //       unreadCount: isSelectedUser ? 0 : 1,
// //     });
// //   }

// //   // Add to messages if selected
// //   if (isSelectedUser) {
// //     state.messages.push(msg);
// //   }
// // },


// //  addMessageInfo: (state, action) => {
// //   const { message: msg, currentUserId, selectedUserId } = action.payload;

// //   // Make sure senderId is a string
// //   const chatUserId = typeof msg.sender === "string" ? msg.sender : msg.sender._id;
// //   const isSelectedUser = selectedUserId === chatUserId;

// //   // Find existing chat
// //   const chatIndex = state.chats.findIndex(
// //     (c) => (c.user?._id || c.user) === chatUserId
// //   );

// //   if (chatIndex !== -1) {
// //     const chat = state.chats[chatIndex];

// //     // Update last message & timestamp
// //     chat.lastMessage = msg.text || "Media";
// //     chat.lastMessageAt = msg.createdAt || new Date();

// //     // Increment unread ONLY if chat is NOT selected
// //     if (!isSelectedUser && msg.sender !== currentUserId) {
// //       chat.unreadCount = (chat.unreadCount || 0) + 1;
// //     }

// //     // Move chat to top
// //     const [movedChat] = state.chats.splice(chatIndex, 1);
// //     state.chats.unshift(movedChat);

// //   } else {
// //     // Chat does not exist → create new
// //     state.chats.unshift({
// //       user: {
// //         _id: chatUserId,
// //         fullName: msg.senderName || msg.sender?.fullName || "Unknown",
// //         profilePic: msg.sender?.profilePic || null,
// //       },
// //       lastMessage: msg.text || "Media",
// //       lastMessageAt: msg.createdAt || new Date(),
// //       unreadCount: isSelectedUser ? 0 : 1,
// //     });
// //   }

// //   // Add message to messages array if currently selected chat
// //   if (isSelectedUser) {
// //     state.messages.push(msg);
// //   }
// // },



// addMessageInfo: (state, action) => {
//   const { message: msg, currentUserId, selectedUserId } = action.payload;

//   const chatUserId = typeof msg.sender === "string" ? msg.sender : msg.sender._id;
//   const isSelectedUser = selectedUserId === chatUserId;

//   // Find existing chat
//   const chatIndex = state.chats.findIndex(
//     (c) => (c.user?._id || c.user) === chatUserId
//   );

//   if (chatIndex !== -1) {
//     const chat = state.chats[chatIndex];

//     // Update last message & timestamp
//     chat.lastMessage = msg.text || "Media";
//     chat.lastMessageAt = msg.createdAt || new Date();

//     // Increment unread ONLY if chat is NOT selected and sender is NOT current user
//     if (!isSelectedUser && chatUserId !== currentUserId) {
//       chat.unreadCount = (chat.unreadCount || 0) + 1;
//     }

//     // Move chat to top
//     const [movedChat] = state.chats.splice(chatIndex, 1);
//     state.chats.unshift(movedChat);
//   } else {
//     // Chat does not exist → create new
//     state.chats.unshift({
//       user: {
//         _id: chatUserId,
//         fullName: msg.senderName || msg.sender?.fullName || "Unknown",
//         profilePic: msg.sender?.profilePic || null,
//       },
//       lastMessage: msg.text || "Media",
//       lastMessageAt: msg.createdAt || new Date(),
//       unreadCount: isSelectedUser || chatUserId === currentUserId ? 0 : 1,
//     });
//   }

//   // Add message to messages array only if selected chat AND sender is NOT current user
//   if (isSelectedUser && chatUserId !== currentUserId) {
//     state.messages.push(msg);
//   }
// },




//     resetSearchResults: (state) => {
//       state.searchResults = [];
//     },
//     updateUnread: (state, action) => {
//       const { chatId, unreadCount } = action.payload;
//       const chat = state.chats.find(c => c._id === chatId);
//       if (chat) chat.unreadCount = unreadCount;
//     },
//     incrementUnread: (state, action) => {
//   const senderId = action.payload;

//   const chat = state.chats.find(
//     c => (c.user?._id || c.user) === senderId
//   );

//   if (chat) {
//     chat.unreadCount = (chat.unreadCount || 0) + 1;
//   }
// },

//     addMessage: (state, action) => {
//       const msg = action.payload;
//       // Using a fallback for ID to ensure we can check for duplicates
//       const msgId = msg._id || msg.tempId || Date.now();

//       const exists = state.messages.find((m) => (m._id === msgId));
//       if (exists) return; 

//       state.messages.push(msg);
//     },
//     setSelectedUser: (state, action) => {
//       state.selectedUser = action.payload;
//     },
//    resetUnreadCountLocal: (state, action) => {
//   const userId = action.payload;

//   const chat = state.chats.find(
//     c => c.user._id === userId
//   );

//   if (chat) {
//     chat.unreadCount = 0; // 🔥 LIVE UI UPDATE
//   }
// },
//     markChatAsRead: (state, action) => {
//       const chat = state.chats.find((c) => (c.user?._id || c.user) === action.payload);
//       if (chat) chat.unreadCount = 0;
//     },
//    setChat: (state, action) => {
//   const chat = action.payload;

//   // Check if chat already exists
//   const exists = state.chats.find((c) => c._id === chat._id || c.user._id === chat._id);

//   if (!exists) {
//     // If chat doesn't exist, add it
//     state.chats.unshift(chat); // unshift to show on top
//   }

//   // Set as selected chat
//   state.selectedUser = chat.user;
// },


//   },
//   extraReducers: builder => {
//     builder
//     .addCase(fetchChats.pending,(state,action)=>{
//       state.chatloading = true;
//     })
//       .addCase(fetchChats.fulfilled, (state, action) => {
//         state.chats = action.payload;
//         state.chatloading = false;

//       }).addCase(fetchChats.rejected, (state, action) => {
//         state.chatloading = false;
//         // state.chats = [];
//       })
// .addCase(fetchMessages.pending, (state, action) => {
//        state.chatmsgloading = true;
//          state.messages = [];
//       })      
//       .addCase(fetchMessages.fulfilled, (state, action) => {
//         state.messages = action.payload.messages;
//        state.chatmsgloading = false;

//       }).addCase(fetchMessages.rejected, (state) => { state.chatmsgloading = false; })
//      .addCase(sendMessage.fulfilled, (state, action) => {
//       // console.log("SEND MESSAGE FULFILLED:", action.payload);
//   const msg = action.payload;

//   // 1. Check if the message is already in the list 
//   // (Prevents duplicates if your Socket.io also adds the same message)
//   // const exists = state.messages.find(m => m._id === msg._id);
  

//   state.messages.push(msg.data);

//   // 2. Update the sidebar "Last Message" instantly
//   const chatIndex = state.chats.findIndex(c => 
//     (c.user?._id || c.user) === msg.receiverId || (c.user?._id || c.user) === msg.senderId
//   );
  
//   // if (chatIndex !== -1) {
//   //   state.chats[chatIndex].lastMessage = msg;
//   //   // Optional: Move chat to the top of the sidebar
//   //   const [movedChat] = state.chats.splice(chatIndex, 1);
//   //   state.chats.unshift(movedChat);
//   // }
// })
//       .addCase(markChatAsReadDb.fulfilled, (state, action) => {
//         const chat = state.chats.find((c) => (c.user?._id || c.user) === action.payload);
//         if (chat) chat.unreadCount = 0;
//       })
//       .addCase(searchUsers.pending, (state) => {
//         state.loadingSearch = true;
//         state.error = null;
//       })
//       .addCase(searchUsers.fulfilled, (state, action) => {
//         state.searchResults = action.payload;
//         state.loadingSearch = false;
//       })
//       .addCase(searchUsers.rejected, (state, action) => {
//         state.error = action.payload;
//         state.loadingSearch = false;
//       });
//   },
// });

// export const { addMessage, setSelectedUser, resetUnreadCountLocal, markChatAsRead ,
//   incrementUnread ,updateUnread ,resetSearchResults ,setChat,addMessageInfo , setUserOffline,setUserOnline} = chatSlice.actions;
// export default chatSlice.reducer;





import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axios";
import axios from "axios";

/* ------------------ THUNKS ------------------ */

// Fetch chats
export const fetchChats = createAsyncThunk(
  "chat/fetchChats",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/message/previous-chats");
      return res.data.chats;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Fetch messages
// export const fetchMessages = createAsyncThunk(
//   "chat/fetchMessages",
//   async (userId, { rejectWithValue }) => {
//     try {
//       const res = await axiosInstance.get(`/message/${userId}`);
//       return { userId, messages: res.data };
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );


// -------------------- THUNKS --------------------
export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async ({ userId, signal }, { rejectWithValue }) => {
    try {
      console.log(userId)
      const res = await axiosInstance.get(`/message/${userId.toString()}`);
      console.log(res.data)
     return { userId, messages: res.data };

    } catch (err) {
      if (err.name === "CanceledError" || err.name === "AbortError") {
        throw err; // Allow abort to be caught in component
      }
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
// Send message
export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({ receiverId, text, media }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("receiverId", receiverId);
      formData.append("text", text || "");
      if (media?.length) media.forEach((file) => formData.append("media", file));

      const res = await axiosInstance.post("/message/send-message", formData);
      if (chat.messages.find(m => m._id === localId)) return null;
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Mark chat as read on DB
export const markChatAsReadDb = createAsyncThunk(
  "chat/markChatAsReadDb",
  async (chatUserId, { rejectWithValue }) => {
    try {
      await axiosInstance.put(`/message/mark-read/${chatUserId}`);
      return chatUserId;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Search users
export const searchUsers = createAsyncThunk(
  "chat/searchUsers",
  async (username, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/auth/user/search?username=${username}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

/* ------------------ SLICE ------------------ */
const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: [],
    selectedUser: null,
    messages: [],
    searchResults: [],
    chatloading: false,
    chatmsgloading: false,
    loadingSearch: false,
    error: null,
  },
  reducers: {
     setMessages: (state, action) => {
      state.messages = action.payload; // <-- this updates messages in Redux
    },
        setChat: (state, action) => {
      const chat = action.payload;
      const exists = state.chats.find(
        (c) => c._id === chat._id || c.user._id === chat._id
      );

      if (!exists) state.chats.unshift(chat);
      state.selectedUser = chat.user;
    },
    setSelectedUser: (state, action) => {
 state.selectedUser = action.payload;
  state.messages = []; // Clear old messages immediately
  state.chatmsgloading = true; // Start loader immediately
    },

    // Increment unread count for a chat
    incrementUnread: (state, action) => {
      const senderId = action.payload;
      const chat = state.chats.find((c) => (c.user?._id || c.user) === senderId);
      if (chat) chat.unreadCount = (chat.unreadCount || 0) + 1;
    },

    // Reset unread count locally
    resetUnreadCountLocal: (state, action) => {
      const userId = action.payload;
      const chat = state.chats.find((c) => (c.user?._id || c.user) === userId);
      if (chat) chat.unreadCount = 0;
    },

    // Add message info (used by socket)
    addMessageInfo: (state, action) => {
      const { message: msg, currentUserId, selectedUserId } = action.payload;
      const chatUserId = typeof msg.sender === "string" ? msg.sender : msg.sender._id;
      const isSelectedUser = selectedUserId === chatUserId;

      // Find existing chat
      const chatIndex = state.chats.findIndex(
        (c) => (c.user?._id || c.user) === chatUserId
      );

      if (chatIndex !== -1) {
        const chat = state.chats[chatIndex];
        chat.lastMessage = msg.text || "Media";
        chat.lastMessageAt = msg.createdAt || new Date();

        if (!isSelectedUser && chatUserId !== currentUserId) {
          chat.unreadCount = (chat.unreadCount || 0) + 1;
        }

        // Move chat to top
        const [movedChat] = state.chats.splice(chatIndex, 1);
        state.chats.unshift(movedChat);
      } else {
        state.chats.unshift({
          user: {
            _id: chatUserId,
            fullName: msg.senderName || msg.sender?.fullName || "Unknown",
            profilePic: msg.sender?.profilePic || null,
          },
          lastMessage: msg.text || "Media",
          lastMessageAt: msg.createdAt || new Date(),
          unreadCount: isSelectedUser || chatUserId === currentUserId ? 0 : 1,
        });
      }

      // Add message to messages array if currently selected chat AND sender is not current user
      if (isSelectedUser && chatUserId !== currentUserId) {
        state.messages.push(msg);
      }
    },

    // Reset search results
    resetSearchResults: (state) => {
      state.searchResults = [];
    },
    setChatmsgLoading: (state, action) => {
      state.chatmsgloading = action.payload;
    },

    // Add a message manually
addMessage: (state, action) => {
  const msg = action.payload;
  const exists = state.messages.find((m) => m._id === msg._id || m._id === msg.localId);
  if (!exists) state.messages.push(msg);
},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state) => { state.chatloading = true; })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.chats = action.payload;
        state.chatloading = false;
      })
      .addCase(fetchChats.rejected, (state) => { state.chatloading = false; })

       .addCase(fetchMessages.pending, (state) => {
        state.chatmsgloading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        const { userId, messages } = action.payload;
        // Only update if still selected
        if (state.selectedUser?._id === userId) {
          state.messages = messages;
        }
        state.chatmsgloading = false;
      })
      .addCase(fetchMessages.rejected, (state) => {
        state.chatmsgloading = false;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        const msg = action.payload;
        state.messages.push(msg.data);
      })

      .addCase(markChatAsReadDb.fulfilled, (state, action) => {
        const chat = state.chats.find((c) => (c.user?._id || c.user) === action.payload);
        if (chat) chat.unreadCount = 0;
      })

      .addCase(searchUsers.pending, (state) => { state.loadingSearch = true; state.error = null; })
      .addCase(searchUsers.fulfilled, (state, action) => { state.searchResults = action.payload; state.loadingSearch = false; })
      .addCase(searchUsers.rejected, (state, action) => { state.error = action.payload; state.loadingSearch = false; });
  },
});

export const {
  setSelectedUser,
  addMessageInfo,
  resetUnreadCountLocal,
  incrementUnread,
  resetSearchResults,
  addMessage,
  setMessages,
  setChat,
  setChatmsgLoading
} = chatSlice.actions;

export default chatSlice.reducer;

/* 🔥 EXPORT THUNKS */
// export { fetchChats, fetchMessages, sendMessage, markChatAsReadDb, searchUsers };
