import {configureStore} from "@reduxjs/toolkit"
import chatReducer from "../features/chat/chatSlice.js";
import authReducer from "../features/auth/authSlice.js";
import toggleReducer from "../features/toggle/toggleSlice.js";
import groupReducer from "../features/group/groupSlice.js";
const store = configureStore({
    reducer: {
       auth: authReducer,
       chat:chatReducer,
       toggle: toggleReducer,
       group:groupReducer,
    },
});



export default store;