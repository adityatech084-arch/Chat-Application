import {createSlice} from "@reduxjs/toolkit";



const initialState = {
    isSidebarOpen: false,
    isSearchUserModelOpen: false,
    isCreateGroupModelOpen:false,
};



const toggleSlice = createSlice({
    name: "toggle",
    initialState,       
    reducers: {
     
        toggleSidebar: (state) => {
            state.isSidebarOpen = !state.isSidebarOpen;
        } ,
        toggleSearchUserModel: (state) => {
            state.isSearchUserModelOpen = !state.isSearchUserModelOpen;
        }  ,
        toggleCreateGroupModel :(state)=>{
        state.isCreateGroupModelOpen =  !state.isCreateGroupModelOpen;
        },
    },
});
export const {openSidebar, closeSidebar, toggleSidebar,toggleSearchUserModel ,toggleCreateGroupModel} = toggleSlice.actions;
export default toggleSlice.reducer;