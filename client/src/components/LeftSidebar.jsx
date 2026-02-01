import React from 'react';
import { HiUserGroup } from "react-icons/hi2";

import { 
  LuRocket, LuPlus, LuMessageSquare, LuAtSign, 
  LuBookmark, LuCirclePlus, LuHash, LuSettings, LuX 
} from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import { addMessageInfo, incrementUnread, resetUnreadCountLocal, setSelectedUser } from '../features/chat/chatSlice';
import { getSocket } from '../utils/socket.js';
import { useEffect } from 'react';
import { toggleSearchUserModel ,toggleCreateGroupModel, toggleSidebar } from '../features/toggle/toggleSlice.js';
import { addGroup, getGroupMessages, getgroups, resetGroupUnread, setSelectedGroup, updateGroupLastMessage } from '../features/group/groupSlice.js';
import { notfication } from '../utils/notification.js';
import { formatChatTime } from '../utils/formateChatTime.js';
import SearchInput from './SearchInput.jsx';
import ChatItemSkeleton from './bitsComponents/ChatSkeleton.jsx';
const LeftSidebar = ({ authUser, setSidebarOpen }) => {
  const dispatch = useDispatch();
  const socket = getSocket();
  const { chats, selectedUser } = useSelector((state) => state.chat);
  const {groups ,selectedGroup ,grouploading} = useSelector((state)=>state.group);
  const {isSidebarOpen} = useSelector((state)=>state.toggle);
   const {chatloading}=useSelector(state=>state.chat)

  // 🔥 SOCKET LOGIC FOR LIVE UNREAD COUNT

// console.log(groups)

useEffect(() => {
  if (!socket) return;

  const handleGroupUpdate = ({ groupId, lastMessage, lastMessageAt }) => {
    // If the user is **not the sender** or has group closed, increment unread
    const isOpen = selectedGroup?._id === groupId;
    dispatch(updateGroupLastMessage({
      groupId,
      lastMessage,
      lastMessageAt,
      incrementUnread: !isOpen,
    }));
  };




  socket.on("group-message-update", handleGroupUpdate);

  return () => socket.off("group-message-update", handleGroupUpdate);
}, [socket, selectedGroup, dispatch]);



  useEffect(() => {
  const socket = getSocket();

  const handleNewGroup = (group) => {
    console.log(group)
    dispatch(addGroup(group)); // Redux action to update sidebar
    dispatch(setSelectedGroup(group))
  };

  socket.on("newGroup", handleNewGroup);

  return () => socket.off("newGroup", handleNewGroup);
}, [dispatch]);






 useEffect(() => {
  if (!socket) return;

 
  // socket.on("receive-message", (msg) => {
  //   // Add message and update sidebar
  //   console.log("Message received in sidebar via socket:", msg);
  //   dispatch(addMessageInfo(msg));
  // });

socket.on("newMessage", (message) => {
    // console.log("New message received via socket in sidebar:", message);
    // notfication.play();
 const currentUserId = authUser?._id; // from auth slice
    dispatch(addMessageInfo({ message, currentUserId, selectedUserId: selectedUser?._id }));
        // socket.emit("mark-as-read", { senderId: selectedUser._id });
       

    // If the message is not from the currently selected user, increment unread

});

  // socket.on("unread-reset", ({ senderId }) => {
  //   dispatch(resetUnreadCount(senderId)); // 1:1
  // });


  // Optional: backend can emit unread reset
  socket.on("unread-reset", ({ senderId }) => {
    // Update Redux store locally
    dispatch(resetUnreadCountLocal(senderId));
  });

  return () => {
    socket.off("receive-message");
    socket.off("unread-reset");
    socket.off("newMessage");

  };
}, [socket, selectedUser, dispatch]);

  const handleUserClick = (user) => {
    // Mark messages as read on backend
    socket.emit("mark-as-read", { senderId: user._id });
    dispatch(setSelectedGroup(null)); // deselect group

    dispatch(setSelectedUser(user));

    // Close sidebar on mobile
    if (window.innerWidth < 768) setSidebarOpen(false);
  };
   
  useEffect(() => {
    dispatch(getgroups());
  }, [dispatch]);

  const handleGroupClick = (group) => {
    // console.log(group)
    dispatch(setSelectedGroup(group));
    dispatch(setSelectedUser(null)); // deselect user
     dispatch(getGroupMessages(group._id));

  // Emit socket event to mark group as read
  socket.emit("mark-group-read", { groupId: group._id });
    dispatch(getGroupMessages(group._id)); // reset unread count
    
    dispatch(resetGroupUnread(group._id)); // reset unread count
  };

  return (
    <>
      {/* Primary Icon Rail */}
      <nav className="  fixed bottom-0 w-full h-16 dark:bg-[#1A1A1A] border-t border-slate-200  dark:border-white/10 flex md:relative md:bottom-auto md:w-[68px] md:h-full md:flex-col md:border-r md:border-t-0 items-center justify-around md:justify-start py-2 md:py-4 gap-4 z-0 shrink-0">
        <div className="hidden md:flex relative group ">
          <div className="size-12 rounded bg-indigo-600  flex items-center justify-center text-white cursor-pointer transition-all hover:rounded-xl shadow-lg">
            <LuRocket size={20} />
          </div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-600 rounded-r-full -ml-4"></div>
        </div>
        
        <div className="size-10 md:size-12 rounded bg-white border border-slate-200 flex items-center justify-center cursor-pointer transition-all hover:rounded-xl">
           <div className="size-8 md:size-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">A</div>
        </div>

        <button className="size-10 md:size-12 rounded-lg  border  flex items-center justify-center text-gray-400 hover:text-indigo-600 transition-all"
        onClick={()=>dispatch(toggleCreateGroupModel())}>
          <HiUserGroup size={20} />
        </button>

        <div className="md:mt-auto size-10 md:size-12 rounded-full border-2 border-white overflow-hidden shadow-sm">
          <img alt="User" className="w-full h-full object-cover" src={authUser?.profilePic} />
        </div>
      </nav>

      {/* Secondary Drawer */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 max-sm:w-full w-lg bg-white  dark:bg-[#0e0d0d] border-r border-slate-200 dark:border-white/10 transition-transform duration-300 transform
        md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-18 flex items-center justify-between px-4 border-b border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-2">
            <div className="size-6 bg-indigo-100 rounded flex items-center justify-center text-indigo-600">
              {/* <LuHash size={14} className="font-bold" /> */}
            </div>
            <h1 className="font-semibold dark:text-slate-200 text-gray-900  text-sm">Chatify</h1>
          </div>
          <button onClick={() => dispatch(toggleSidebar())} className="md:hidden p-1">
            <LuX size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-7 h-[calc(100vh-120px)]">
          {/* <div className="px-3 space-y-1">
            <NavItem icon={<LuMessageSquare size={18} />} label="Threads" />
            <NavItem icon={<LuAtSign size={18} />} label="Mentions" />
            <NavItem icon={<LuBookmark size={18} />} label="Saved" />
          </div> */}
<SearchInput/>
          <div>
            <div className="px-6 flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Direct Messages</span>
              <LuCirclePlus size={20} className="cursor-pointer" onClick={() => dispatch(toggleSearchUserModel())} />
            </div>
            <div className="px-3 space-y-0.5">
               
               {
                chatloading ? (
                  <ChatItemSkeleton/>
                ) :(
  chats && chats.map((chat) => {
                // console.log(chat)
                const isActive = selectedUser?._id === chat.user._id;
                return (
                  // <div 
                  //   key={chat.user._id}
                  //   onClick={() => handleUserClick(chat.user)} 
                  //   className={`flex justify-between items-center gap-3 px-3 py-3 rounded-lg cursor-pointer text-sm transition-colors ${
                  //     isActive ? 'bg-indigo-50 text-indigo-700 font-bold' : 'hover:bg-slate-100 text-slate-600'
                  //   }`}
                  // >
                  //   <div className=" "  >

                  //   <span className={isActive ? 'text-indigo-600' : 'text-slate-400'}>#</span>
                  //   <span className="truncate">{chat.user.fullName}</span>
                  //   </div>
                  //   {chat.unreadCount > 0 && (
                  //   <div className='bg-green-400 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs'>{chat?.unreadCount}</div>
                  //   )}
                  // </div>

<div
  key={chat.user._id}
  onClick={() => handleUserClick(chat.user)}
  className={`
    flex items-center gap-3 p-3.5 rounded cursor-pointer transition-colors
 ${isActive
  ? "bg-indigo-50 dark:bg-slate-800 text-indigo-700 dark:text-white"
  : "hover:bg-green-900/10 dark:hover:bg-[#343434] text-slate-600 dark:text-white"}
 }`
 }
>
  {/* Avatar */}
  <img
    src={
      // chat.user.profilePic ||
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${chat.user._id}`
    }
    alt={chat.user.fullName}
    className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0"
  />

  {/* Content */}
  <div className="flex-1 min-w-0">
    <div className="flex justify-between font-spaceGrotesk items-center text-lg font-medium">
      <span className="truncate">
        {chat.user.fullName}
      </span>

      {/* Time (optional) */}
     {chat.lastMessageAt && (
  <span className="text-xs text-green-400 ml-2 whitespace-nowrap">
    {formatChatTime(chat.lastMessageAt)}
  </span>
)}

    </div>

    <div className="flex justify-between items-center mt-0.5">
      {/* Last message */}
      <p className="text-xs text-black  dark:text-white truncate">
        {chat.lastMessage || "Start chatting"}
      </p>

      {/* Unread badge */}
      {chat.unreadCount > 0 && (
        <span className="ml-2 bg-green-500 text-white dark:text-black rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center text-xs font-semibold">
          {chat.unreadCount}
        </span>
      )}
    </div>
  </div>
</div>


                );
              })
                )

               }



            
            </div>
          </div>
        






 <div>
      {/* Header */}
      <div className="px-6 flex items-center justify-between mb-2">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
          Groups 
        </span>
        <LuCirclePlus
          size={20}
          className="cursor-pointer"
          onClick={() => dispatch(toggleCreateGroupModel())}
        />
      </div>

      {/* Groups list */}
     {/* Groups list */}
{/* */}
<div className="px-3 space-y-0.5">
  {grouploading ? (
    // Show skeletons while groups are loading
    <>
   <ChatItemSkeleton length={2}/>
    </>
  ) : groups && groups.length > 0 ? (
    groups.map((group) => {
      const isActive = selectedGroup?._id === group._id;
      return (
        <div
          key={group._id}
          onClick={() => handleGroupClick(group)}
          className={`flex items-center gap-3 p-3.5 rounded-lg cursor-pointer transition-colors
            ${
              isActive
                ? "bg-indigo-50 dark:bg-slate-800 text-indigo-700 dark:text-white"
                : "bg-white dark:bg-[#0e0d0d] hover:bg-green-900/10 dark:hover:bg-[#343434] text-slate-600 dark:text-white"
            }`}
        >
          {/* Avatar */}
          <img
            src={
              group.profilePic ||
              `https://api.dicebear.com/7.x/avataaars/svg?seed=${group._id}`
            }
            alt={group.name}
            className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0"
          />

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center font-spaceGrotesk text-lg font-medium">
              <span className="truncate">{group.name}</span>
              {group.lastMessageAt && (
                <span className="text-xs text-green-400 ml-2 whitespace-nowrap">
                  {formatChatTime(group.lastMessageAt)}
                </span>
              )}
            </div>

            <div className="flex justify-between items-center mt-0.5">
              <p className="text-xs text-black dark:text-white truncate">
                {group.lastMessage?.text || group.lastMessage || "Start chatting"}
              </p>
              {group.unreadCount > 0 && (
                <span className="ml-2 bg-green-500 text-white dark:text-black rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center text-xs font-semibold">
                  {group.unreadCount}
                </span>
              )}
            </div>
          </div>
        </div>
      );
    })
  ) : (
    <p className="text-xs text-center text-slate-400 py-4">No groups found</p>
  )}
</div>


    </div>









        </div>

        <div className="absolute bottom-0 w-full p-4 border-t bg-white border-slate-200 dark:border-white/10  flex items-center justify-between">
          <LuSettings size={20} className="text-slate-400 cursor-pointer" />
          <div className="flex items-center gap-1 bg-green-100 px-2 py-0.5 rounded-full">
            <div className="size-1.5 bg-green-500 rounded-full"></div>
            <span className="text-[10px] font-bold text-green-700"> {authUser.fullName}ONLINE</span>
          </div>
        </div>
      </aside>
    </>
  );
};

const NavItem = ({ icon, label }) => (
  <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-50 text-slate-600 cursor-pointer transition-all text-sm font-medium">
    {icon} <span className="truncate">{label}</span>
  </div>
);

export default LeftSidebar;