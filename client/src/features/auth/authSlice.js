
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axios";
import { fetchChats } from "../chat/chatSlice.js";
import {connectSocket, getSocket} from '../../utils/socket.js'
import { getgroups } from "../group/groupSlice.js";
import { toast } from "react-toastify";

// ------------------ THUNKS ------------------

// Check auth status
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const res = await axiosInstance.get("/auth/user/me");
      const user = res.data.user;
    //  console.log(res.data)
      connectSocket(user._id);

      // Fetch chats after auth
      dispatch(fetchChats());
      dispatch(getgroups());

      // Connect socket after auth
    //   connectSocket(user._id);
    // fetchChats();

      return user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Signup
export const signup = createAsyncThunk(
  "auth/signup",
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const res = await axiosInstance.post("/auth/user/register", userData);
      console.log(res)
      
      const user = res.data.user;
      connectSocket(user._id);
  dispatch(fetchChats());
      // Connect socket after signup
    //   connectSocket(user._id);

      return user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Login
export const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const res = await axiosInstance.post("/auth/user/login", userData);
      const user = res.data.user;
      connectSocket(user._id);
       dispatch(fetchChats());
      // Connect socket after login
    //   connectSocket(user._id);

      // Fetch chats
      dispatch(getgroups());

      return user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Logout
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/logout");

      // Disconnect socket
    //   disconnectSocket();

      return res.data; // message only
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ------------------ SLICE ------------------

export const toggleBlockUser = (targetUserId, isBlocked) => async (dispatch) => {
  const socket = getSocket();
  if (!socket) return;

  try {
    if (isBlocked) {
      // Unblock user
      socket.emit("unblock-user", { targetUserId }, (response) => {
        if (response.success) {
          dispatch(unblockUser(targetUserId));
          toast.info("User unblocked");
        } else {
          toast.error(response.message || "Failed to unblock user");
        }
      });
    } else {
      // Block user
      socket.emit("block-user", { targetUserId }, (response) => {
        if (response.success) {
          dispatch(blockUser(targetUserId));
          toast.success("User blocked");
        } else {
          toast.error(response.message || "Failed to block user");
        }
      });
    }
  } catch (err) {
    console.error(err);
    toast.error("Something went wrong");
  }
};

const initialState = {
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,
    blockedUsers: [],      // users I blocked
  blockedByUsers: [],   
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
        setBlockedUsers: (state, action) => {
      state.blockedUsers = action.payload; // set from backend on login
    },
    blockUser: (state, action) => {
      const userId = action.payload;
      if (!state.blockedUsers.includes(userId)) {
        state.blockedUsers.push(userId);
      }
    },
    unblockUser: (state, action) => {
      const userId = action.payload;
      state.blockedUsers = state.blockedUsers.filter((id) => id !== userId);
    },
    setBlockedByUser(state, action) {
  state.authUser.blockedByUsers.push(action.payload);
},
removeBlockedByUser(state, action) {
  state.authUser.blockedByUsers =
    state.authUser.blockedByUsers.filter(id => id !== action.payload);
}
  
  },
  extraReducers: (builder) => {
    builder
      // ---------------- Check Auth ----------------
      .addCase(checkAuth.pending, (state) => {
        state.isCheckingAuth = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isCheckingAuth = false;
         state.blockedUsers = action.payload.blockedUsers?.map(id => id.toString()) || [];
         state.blockedByUsers = action.payload.blockedByUsers?.map(id => id.toString()) || [];

      })
      .addCase(checkAuth.rejected, (state) => {
        state.authUser = null;
        state.isCheckingAuth = false;
      })

      // ---------------- Signup ----------------
      .addCase(signup.pending, (state) => {
        state.isSigningUp = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isSigningUp = false;
      state.blockedUsers = action.payload.blockedUsers?.map(id => id.toString()) || [];
         state.blockedByUsers = action.payload.blockedByUsers?.map(id => id.toString()) || [];
      })
      .addCase(signup.rejected, (state) => {
        state.isSigningUp = false;
        state.authUser = null;
      })

      // ---------------- Login ----------------
      .addCase(login.pending, (state) => {
        state.isLoggingIn = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isLoggingIn = false;
        state.blockedUsers = action.payload.blockedUsers?.map(id => id.toString()) || [];
         state.blockedByUsers = action.payload.blockedByUsers?.map(id => id.toString()) || [];
      })
      .addCase(login.rejected, (state) => {
        state.isLoggingIn = false;
        state.authUser = null;
      })

      // ---------------- Logout ----------------
      .addCase(logout.pending, (state) => {
        // Optional: could show loading
      })
      .addCase(logout.fulfilled, (state) => {
        state.authUser = null;
      })
      .addCase(logout.rejected, (state) => {
        state.authUser = null;
      });
  },
});
export const {blockUser,unblockUser,setBlockedUsers ,setBlockedByUser,removeBlockedByUser} = authSlice.actions;
export default authSlice.reducer;