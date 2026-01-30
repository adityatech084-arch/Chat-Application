// import React, { useState } from 'react';
// import { 
//   LuRocket, LuPlus, LuHash, LuAtSign, LuBookmark, LuMessageSquare, 
//   LuCirclePlus, LuUserPlus, LuSettings, LuCircleHelp, LuSearch, 
//   LuPhone, LuVideo, LuInfo, LuDownload, LuBold, LuItalic, 
//   LuLink, LuList, LuCode, LuSmile, LuSend, LuX, LuBellOff, 
//   LuPencilLine, LuEllipsis, LuChevronRight, LuBan, LuFileText, LuMenu
// } from "react-icons/lu";
// import { useSelector } from 'react-redux';

// function ChatPage() {
//   const { authUser } = useSelector((state) => state.auth);
//   const [isSidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden bg-gray-50 font-sans text-slate-900">
      
//       {/* Primary Sidebar - Desktop: Left | Mobile: Bottom Bar */}
//       <nav className="fixed bottom-0 w-full h-16 bg-white border-t border-slate-200 flex md:relative md:bottom-auto md:w-[68px] md:h-full md:flex-col md:border-r md:border-t-0 items-center justify-around md:justify-start py-2 md:py-4 gap-4 z-50 shrink-0">
//         <div className="hidden md:flex relative group">
//           <div className="size-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white cursor-pointer transition-all hover:rounded-xl shadow-lg shadow-indigo-200">
//             <LuRocket size={24} />
//           </div>
//           <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-600 rounded-r-full -ml-4"></div>
//         </div>
        
//         <div className="size-10 md:size-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center cursor-pointer transition-all hover:rounded-xl">
//            <div className="size-8 md:size-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">A</div>
//         </div>

//         <button className="size-10 md:size-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-gray-400 hover:text-indigo-600 transition-all">
//           <LuPlus size={22} />
//         </button>

//         <div className="md:mt-auto size-10 md:size-12 rounded-full border-2 border-white overflow-hidden shadow-sm">
//           <img alt="User" className="w-full h-full object-cover" src={authUser.profilePic} />
//         </div>
//       </nav>

//       {/* Secondary Sidebar - Responsive Drawer */}
//       <aside className={`
//         fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 transition-transform duration-300 transform
//         md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
//       `}>
//         <div className="h-14 flex items-center justify-between px-4 border-b border-slate-200">
//           <div className="flex items-center gap-2">
//             <div className="size-6 bg-indigo-100 rounded flex items-center justify-center text-indigo-600">
//               <LuHash size={14} className="font-bold" />
//             </div>
//             <h1 className="font-semibold text-slate-900 text-sm">Acme Global</h1>
//           </div>
//           <button onClick={() => setSidebarOpen(false)} className="md:hidden p-1">
//             <LuX size={20} />
//           </button>
//         </div>

//         <div className="flex-1 overflow-y-auto py-4 space-y-7 h-[calc(100vh-120px)]">
//           <div className="px-3 space-y-1">
//             <NavItem icon={<LuMessageSquare size={18} />} label="Threads" />
//             <NavItem icon={<LuAtSign size={18} />} label="Mentions" />
//             <NavItem icon={<LuBookmark size={18} />} label="Saved" />
//           </div>

//           <div>
//             <div className="px-6 flex items-center justify-between mb-2">
//               <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Channels</span>
//               <LuCirclePlus size={16} className="cursor-pointer" />
//             </div>
//             <div className="px-3 space-y-0.5">
//               <ChannelItem label="product-roadmap" />
//               <ChannelItem label="engineering-sync" active />
//               <ChannelItem label="design-ops" />
//             </div>
//           </div>
//         </div>

//         <div className="absolute bottom-0 w-full p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
//           <LuSettings size={20} className="text-slate-400 cursor-pointer" />
//           <div className="flex items-center gap-1 bg-green-100 px-2 py-0.5 rounded-full">
//             <div className="size-1.5 bg-green-500 rounded-full"></div>
//             <span className="text-[10px] font-bold text-green-700">ONLINE</span>
//           </div>
//         </div>
//       </aside>

//       {/* Main Chat Area */}
//       <main className="flex-1 flex flex-col min-w-0 bg-white relative h-screen">
//         <header className="h-14 flex items-center justify-between px-4 md:px-6 border-b border-slate-200 shrink-0">
//           <div className="flex items-center gap-3">
//             <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 -ml-2 text-slate-600">
//               <LuMenu size={24} />
//             </button>
//             <div className="flex items-center gap-2 truncate">
//               <div className="size-8 rounded-md bg-slate-200 shrink-0 overflow-hidden">
//                 <img src="https://i.pravatar.cc/150?u=john" alt="" />
//               </div>
//               <h2 className="font-bold text-[15px] truncate">John Doe</h2>
//             </div>
//           </div>
          
//           <div className="flex items-center gap-1 md:gap-3">
//             <div className="hidden sm:flex items-center bg-gray-50 rounded-lg px-3 py-1.5 border border-slate-200">
//               <LuSearch size={16} className="text-slate-400" />
//               <input className="bg-transparent border-none text-sm focus:ring-0 w-24 lg:w-48" placeholder="Search" />
//             </div>
//             <HeaderBtn icon={<LuPhone size={18} />} />
//             <HeaderBtn icon={<LuVideo size={18} />} />
//             <HeaderBtn icon={<LuInfo size={18} className="hidden sm:block" />} />
//           </div>
//         </header>

//         {/* Messages Content */}
//         <div className="flex-1 overflow-y-auto px-4 md:px-6 pt-6 pb-32 md:pb-6 w-full">
//           <div className="w-full space-y-2">
            
//             {/* Message 1 */}
//             <div className="flex gap-4 group hover:bg-slate-50/50 -mx-6 px-6 py-3 transition-colors">
//               <div className="size-10 rounded-lg bg-cover bg-center shrink-0 mt-0.5" style={{ backgroundImage: 'url("https://i.pravatar.cc/150?u=john")' }}></div>
//               <div className="flex-1 space-y-1">
//                 <div className="flex items-center gap-2">
//                   <span className="font-bold text-[15px] text-slate-900 hover:underline cursor-pointer">John Doe</span>
//                   <span className="text-[11px] text-slate-400 font-medium">10:45 AM</span>
//                 </div>
//                 <div className="text-xs text-slate-700 leading-relaxed">
//                   Hi Alex, I've updated the product roadmap for Q4. Can you take a look at the feature prioritization?
//                 </div>
//               </div>
//             </div>

//             {/* Message 2 - File Share */}
//             <div className="flex gap-4 group hover:bg-slate-50/50 -mx-6 px-6 py-3 transition-colors">
//               <div className="size-10 rounded-lg bg-cover bg-center shrink-0 mt-0.5" style={{ backgroundImage: 'url("https://i.pravatar.cc/150?u=john")' }}></div>
//               <div className="flex-1 space-y-1">
//                 <div className="flex items-center gap-2">
//                   <span className="font-bold text-[15px] text-slate-900 hover:underline cursor-pointer">John Doe</span>
//                   <span className="text-[11px] text-slate-400 font-medium">10:46 AM</span>
//                 </div>
//                 <div className="text-xs text-slate-700 leading-relaxed">
//                   I've attached the draft below. 
//                   <div className="bg-white border border-slate-200 rounded-xl p-4 mt-3 flex items-center gap-4 w-fit max-w-sm hover:shadow-md transition-shadow cursor-pointer">
//                     <div className="size-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
//                       <LuFileText size={24} />
//                     </div>
//                     <div className="flex-1 truncate">
//                       <p className="text-sm font-bold text-slate-900 truncate">Q4_Prioritization_v2.pdf</p>
//                       <p className="text-[11px] text-slate-500 font-medium">2.4 MB • PDF Document</p>
//                     </div>
//                     <LuDownload size={18} className="text-slate-400" />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Message 3 - System/Separator */}
//             <div className="relative flex items-center py-4">
//               <div className="flex-grow border-t border-slate-100"></div>
//               <span className="mx-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 bg-white">New Messages</span>
//               <div className="flex-grow border-t border-slate-100"></div>
//             </div>

//             {/* Message 4 - Reply */}
//             <div className="flex gap-4 group hover:bg-slate-50/50 -mx-6 px-6 py-3 transition-colors">
//               <div className="size-10 rounded-lg bg-cover bg-center shrink-0 mt-0.5" style={{ backgroundImage: 'url("https://i.pravatar.cc/150?u=sarah")' }}></div>
//               <div className="flex-1 space-y-1">
//                 <div className="flex items-center gap-2">
//                   <span className="font-bold text-[15px] text-slate-900 hover:underline cursor-pointer">Sarah Chen</span>
//                   <span className="text-[11px] text-slate-400 font-medium">11:02 AM</span>
//                 </div>
//                 <div className="text-xs text-slate-700 leading-relaxed">
//                   Looks great, John! I think we should move the "Analytics Dashboard" up by two weeks if possible.
//                 </div>
//               </div>
//             </div>

//           </div>
//         </div>

//         {/* Input Footer */}
//         <div className="absolute bottom-16 md:bottom-0 left-0 w-full p-4 bg-white/80 backdrop-blur-md">
//           <div className="max-w-screen-lg mx-auto border border-slate-200 rounded-xl bg-white shadow-lg md:shadow-sm">
//             <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-gray-50/50 border-b border-slate-200">
//               <ToolbarBtn icon={<LuBold size={14} />} />
//               <ToolbarBtn icon={<LuItalic size={14} />} />
//               <ToolbarBtn icon={<LuCode size={14} />} />
//               <div className="w-px h-4 bg-slate-200 mx-1"></div>
//               <ToolbarBtn icon={<LuList size={14} />} />
//               <ToolbarBtn icon={<LuLink size={14} />} />
//             </div>
//             <div className="px-4 py-2">
//               <textarea className="w-full bg-transparent border-none  outline-none text-sm md:text-[15px] resize-none" placeholder="Message John Doe" rows="1"></textarea>
//             </div>
//             <div className="flex items-center justify-between px-4 pb-2">
//               <div className="flex items-center gap-1">
//                 <button className="p-2 text-slate-400 hover:text-indigo-600"><LuCirclePlus size={20} /></button>
//                 <button className="p-2 text-slate-400 hover:text-yellow-500"><LuSmile size={20} /></button>
//               </div>
//               <button className="bg-indigo-600 text-white p-2 md:px-4 md:py-1.5 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors">
//                 <span className="hidden md:inline text-sm font-semibold">Send</span>
//                 <LuSend size={18} />
//               </button>
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* Right Sidebar - Profile */}
//       <aside className="hidden lg:flex w-72 border-l border-slate-200 flex-col bg-white overflow-y-auto shrink-0">
//         <div className="h-14 flex items-center justify-between px-6 border-b border-slate-200 bg-gray-50/50">
//           <h3 className="font-bold text-[11px] text-slate-400 uppercase tracking-widest">Profile</h3>
//           <button className="p-1.5 hover:bg-gray-200 rounded-lg text-slate-500"><LuX size={20} /></button>
//         </div>
//         <div className="p-8 border-b border-slate-200 flex flex-col items-center text-center">
//           <div className="size-32 rounded-3xl bg-cover bg-center mb-5 shadow-xl ring-4 ring-white" style={{ backgroundImage: 'url("https://i.pravatar.cc/150?u=john")' }}></div>
//           <h4 className="font-bold text-xl text-slate-900">John Doe</h4>
//           <p className="text-sm font-medium text-indigo-600">Senior Product Manager</p>
//           <div className="flex gap-4 mt-8">
//             <ProfileAction icon={<LuBellOff size={20} />} label="Mute" />
//             <ProfileAction icon={<LuPencilLine size={20} />} label="Edit" />
//             <ProfileAction icon={<LuEllipsis size={20} />} label="More" />
//           </div>
//         </div>
//         <div className="flex-1 bg-slate-50/30">
//           <SidebarDisclosure label="Shared Files" icon={<LuChevronRight />} />
//           <SidebarDisclosure label="Pinned Messages" icon={<LuChevronRight />} />
//           <button className="w-full flex items-center justify-between p-5 hover:bg-red-50 transition-all text-red-600 border-b border-slate-200">
//             <span className="text-sm font-bold">Block John Doe</span>
//             <LuBan size={18} className="opacity-50" />
//           </button>
//         </div>
//       </aside>

//       {/* Overlay for mobile menu */}
//       {isSidebarOpen && (
//         <div className="fixed inset-0 bg-black/20 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
//       )}
//     </div>
//   );
// }

// /* Helper Components */
// const NavItem = ({ icon, label }) => (
//   <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-50 text-slate-600 cursor-pointer transition-all text-sm font-medium">
//     {icon} <span className="truncate">{label}</span>
//   </div>
// );

// const ChannelItem = ({ label, active = false }) => (
//   <div className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-sm ${active ? 'bg-indigo-50 text-indigo-700 font-bold' : 'hover:bg-slate-100 text-slate-600'}`}>
//     <span className={active ? 'text-indigo-600' : 'text-slate-400'}>#</span>
//     <span className="truncate">{label}</span>
//   </div>
// );

// const HeaderBtn = ({ icon }) => (
//   <button className="p-2 hover:bg-gray-100 rounded-lg text-slate-500 transition-colors">{icon}</button>
// );

// const ToolbarBtn = ({ icon }) => (
//   <button className="p-1.5 hover:bg-gray-200 rounded text-slate-600 transition-colors">{icon}</button>
// );

// const ProfileAction = ({ icon, label }) => (
//   <button className="flex flex-col items-center gap-1 group">
//     <div className="size-10 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center group-hover:bg-white transition-all text-slate-500 group-hover:text-indigo-600 group-hover:shadow-sm">
//       {icon}
//     </div>
//     <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">{label}</span>
//   </button>
// );

// const SidebarDisclosure = ({ label, icon }) => (
//   <button className="w-full flex items-center justify-between p-5 hover:bg-white transition-all border-b border-slate-200">
//     <span className="text-sm font-bold text-slate-700">{label}</span>
//     <span className="text-slate-300">{icon}</span>
//   </button>
// );

// export default ChatPage;

// 1
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LuX, LuBellOff, LuPencilLine, LuEllipsis, LuChevronRight, LuBan, LuMenu, LuSearch, LuPhone, LuVideo, LuInfo } from "react-icons/lu";
import { getSocket } from '../utils/socket.js';
import LeftSidebar from '../components/LeftSidebar';
import ChatArea from '../components/ChatArea';
import EmptyProjects from '../components/bitsComponents/EmptyChat.jsx';
import { use } from 'react';
import UserSearchModal from '../components/bitsComponents/UserSearchModel.jsx';
import { toggleSearchUserModel ,toggleCreateGroupModel} from '../features/toggle/toggleSlice.js';
import CreateGroupModal from '../components/bitsComponents/CreateGroupMode.jsx';

function ChatPage() {
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.auth);
  const { selectedUser } = useSelector((state) => state.chat);
  const {selectedGroup} = useSelector(state=>state.group)
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { isSearchUserModelOpen ,isCreateGroupModelOpen} = useSelector((state) => state.toggle);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const socket = getSocket(); // Ensure this returns the active socket instance
    if (!socket || !selectedUser) {
      setIsTyping(false);
      return;
    }

    const handleTyping = ({ typingId }) => {
      // Show typing indicator only if it matches the current chat
      if (typingId === selectedUser._id) {
        setIsTyping(true);
      }
    };

    const handleStopTyping = ({ typingId }) => {
      if (typingId === selectedUser._id) {
        setIsTyping(false);
      }
    };

    socket.on("userTyping", handleTyping);
    socket.on("userStoppedTyping", handleStopTyping);

    // Clean up and reset when user switches or component unmounts
    return () => {
      socket.off("userTyping", handleTyping);
      socket.off("userStoppedTyping", handleStopTyping);
      setIsTyping(false); 
    };
  }, [selectedUser]); // Dependency on selectedUser is key

  return (
    <>
    {
      isSearchUserModelOpen && <div className="fixed inset-0 bg-black/20 z-50" >
        <UserSearchModal onClose={() => dispatch(toggleSearchUserModel())} />
      </div>
    }
      {
      isCreateGroupModelOpen && <div className="fixed inset-0 bg-black/20 z-50" >
        <CreateGroupModal onClose={() => dispatch(toggleCreateGroupModel())} />
      </div>
    }
    <div className="flex flex-col md:flex-row h-screen w-full   font-sans text-slate-900">
      
      {/* 1. LEFT SIDEBAR */}
      <LeftSidebar 
        authUser={authUser} 
        isSidebarOpen={isSidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
      />

      {/* 2. CENTER CONTAINER (Header + Content) */}
      <div className="flex-1 flex flex-col min-w-0  relative">
        
        {/* SHARED HEADER */}
  {/* <header className="h-18 z-10 absolute top-0 w-full bg-white dark:bg-[#0e0d0d]  md:relative flex items-center justify-between px-4 md:px-6 border-b border-slate-200 dark:border-white/10 shrink-0">
  <div className="flex items-center gap-3">
   
    <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 -ml-2 text-slate-600">
      <LuMenu size={24} />
    </button>

  
    <div className="flex items-center gap-2 truncate">
      <div className="w-8 h-8 md:w-10 md:h-10 rounded-md bg-slate-200 shrink-0 overflow-hidden">
        <img
        // selectedUser?.profilePic
          src={  "https://api.dicebear.com/7.x/avataaars/svg?seed=${chat.user._id}"}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col flex-1 truncate">
        <h2 className="font-bold text-xl dark:text-gray-500 leading-tight truncate">
          {selectedUser ? selectedUser.fullName : "Select a Chat"}
        </h2>
        {selectedUser && (
          <span className={`text-[11px] transition-all duration-300 ${isTyping ? "text-indigo-600 font-medium animate-pulse" : "text-slate-400"}`}>
            {isTyping ? "typing..." : (selectedUser.online ? "Online" : "Offline")}
          </span>
        )}
      </div>
    </div>
  </div>

  {selectedUser && (
    <div className="flex items-center gap-1 md:gap-3">
      <HeaderBtn icon={<LuPhone size={18} />} />
      <HeaderBtn icon={<LuVideo size={18} />} />
      <HeaderBtn icon={<LuInfo size={18} className="hidden sm:block" />} />
    </div>
  )}
</header> */}



        {/* CONTENT AREA */}
        <div className="flex-1 overflow-hidden">
          {/* {selectedUser ? <ChatArea /> : <EmptyProjects />} */}
            {selectedGroup ? (
    <ChatArea type="group" group={selectedGroup} />
  ) : selectedUser ? (
    <ChatArea type="user" user={selectedUser} />
  ) : (
    <EmptyProjects /> // nothing selected
  )}
        </div>
      </div>

      {/* 3. RIGHT SIDEBAR */}
{/*       
      <aside className="hidden xl:flex w-72 border-l border-slate-200 flex-col bg-white overflow-y-auto shrink-0">
        <div className="h-14 flex items-center justify-between px-6 border-b border-slate-200 bg-gray-50/50">
          <h3 className="font-bold text-[11px] text-slate-400 uppercase tracking-widest">Profile</h3>
          <button className="p-1.5 hover:bg-gray-200 rounded-lg text-slate-500"><LuX size={20} /></button>
        </div>
        <div className="p-8 border-b border-slate-200 flex flex-col items-center text-center">
          <div 
            className="size-32 rounded-3xl bg-cover bg-center mb-5 shadow-xl ring-4 ring-white" 
            style={{ backgroundImage: `url(${selectedUser?.profilePic || authUser?.profilePic})` }}
          ></div>
          <h4 className="font-bold text-xl text-slate-900">{ authUser.fullName}</h4>
          <p className="text-sm font-medium text-indigo-600">User Profile</p>
          <div className="flex gap-4 mt-8">
            <ProfileAction icon={<LuBellOff size={20} />} label="Mute" />
            <ProfileAction icon={<LuPencilLine size={20} />} label="Edit" />
            <ProfileAction icon={<LuEllipsis size={20} />} label="More" />
          </div>
        </div>
        <div className="flex-1 bg-slate-50/30">
          <SidebarDisclosure label="Shared Files" icon={<LuChevronRight />} />
          <SidebarDisclosure label="Pinned Messages" icon={<LuChevronRight />} />
          <button className="w-full flex items-center justify-between p-5 hover:bg-red-50 transition-all text-red-600 border-b border-slate-200">
            <span className="text-sm font-bold">Block {selectedUser?.fullName || "User"}</span>
            <LuBan size={18} className="opacity-50" />
          </button>
        </div>
      </aside> */}

      {/* Overlay for mobile menu */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/20 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
    </>
  );
}

const HeaderBtn = ({ icon }) => (
  <button className="p-2 hover:bg-gray-100 rounded-lg text-slate-500 transition-colors">{icon}</button>
);

const ProfileAction = ({ icon, label }) => (
  <button className="flex flex-col items-center gap-1 group">
    <div className="size-10 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center group-hover:bg-white transition-all text-slate-500 group-hover:text-indigo-600 group-hover:shadow-sm">
      {icon}
    </div>
    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">{label}</span>
  </button>
);

const SidebarDisclosure = ({ label, icon }) => (
  <button className="w-full flex items-center justify-between p-5 hover:bg-white transition-all border-b border-slate-200">
    <span className="text-sm font-bold text-slate-700">{label}</span>
    <span className="text-slate-300">{icon}</span>
  </button>
);

export default ChatPage;



























