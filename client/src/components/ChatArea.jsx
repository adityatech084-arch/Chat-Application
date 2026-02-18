
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages, addMessage, incrementUnread, resetUnreadCountLocal } from '../features/chat/chatSlice';
import { getGroupMessages, addGroupMessage, resetGroupUnread } from '../features/group/groupSlice';
import MessageInput from './MessageInput';
import { getSocket } from '../utils/socket.js';
import useTypingIndicator from '../hook/useTypingIndicator.jsx';
import TypingIndicator from './bitsComponents/TypingIndecator.jsx';
import { LuInfo, LuMenu, LuPhone, LuVideo } from 'react-icons/lu';
import { toggleSidebar } from '../features/toggle/toggleSlice.js';
import IncomingMessageSkeleton from './bitsComponents/IncommingMessageSkeleton.jsx';
import MessagesSkeleton from './bitsComponents/IncommingMessageSkeleton.jsx';

const ChatArea = () => {
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const { authUser } = useSelector((state) => state.auth);
    
  const { selectedUser, messages ,chatmsgloading  } = useSelector((state) => state.chat);
  const { selectedGroup, groupmessages,groupmsgloading } = useSelector((state) => state.group);
  // const [isTyping, setIsTyping] = useState(false);
  const socket = getSocket();
  const isTyping = useTypingIndicator(socket, selectedUser?._id);
  // const loading = chatmsgloading || groupmsgloading; // ✅ global loading
  const loading = selectedGroup ? groupmsgloading : chatmsgloading;

  // const isTyping = useTypingIndicator(socket, selectedGroup || selectedUser, !!selectedGroup);
  // const isTyping = useTypingIndicator(socket, selectedGroup || selectedUser, !!selectedGroup);
// const activeChat = selectedGroup || selectedUser;



  // Determine active chat & messages
  const activeChat = selectedGroup || selectedUser;
  const chatMessages = selectedGroup ? groupmessages : messages;

  // Fetch messages when selection changes
  // console.log(selectedGroup.groupId._id)
useEffect(() => {
  if (!socket) return;

  // If a user is selected (1:1 chat)
  if (selectedUser?._id) {
    // console.log("iam chage iam running",selectedUser)
    dispatch(fetchMessages({ userId: selectedUser._id })).then(() => {
      // ✅ Reset unread count locally
      dispatch(resetUnreadCountLocal(selectedUser._id));

      socket.emit("mark-as-read", { senderId: selectedUser?._id });
    });
  }

  // If a group is selected
  if (selectedGroup?._id) {
    dispatch(getGroupMessages(selectedGroup._id)).then(() => {
      dispatch(resetGroupUnread(selectedGroup._id));
      socket.emit("mark-group-read", { groupId: selectedGroup._id });
    });
  }
}, [selectedUser?._id, selectedGroup?._id, dispatch, socket]);


  // Join selected group & leave on unmount
  useEffect(() => {
    if (!selectedGroup?._id) return;

    socket.emit("join-group", selectedGroup._id);
    // console.log("Joined group:", selectedGroup._id);

    return () => {
      socket.emit("leave-group", selectedGroup._id);
      // console.log("Left group:", selectedGroup._id);
    };
  }, [socket, selectedGroup?._id]);

  // Socket listener for incoming messages
// useEffect(() => {
//   if (!socket) return;

//   const handleIncomingMessage = (msg) => {
//     console.log(msg)
//     const selectedUserId = selectedUser?._id;
//     // const msgSenderId = msg.sender; // sender of the message
//     const msgGroupId = msg.group || msg.groupId;
//     if (msgGroupId) {
//       // Group message
//       const isCurrentGroupOpen = selectedGroup?._id === msgGroupId;
//       dispatch(addGroupMessage({ groupId: msgGroupId, message: msg, isActive: isCurrentGroupOpen }));

//       if (isCurrentGroupOpen) {
//         socket.emit("mark-group-read", { groupId: msgGroupId });
//         dispatch(resetGroupUnread(msgGroupId));
//       }
//     } else {
//   const msgSenderId = msg.sender?._id || msg.sender; // ensures string ID

//     const isCurrentChatOpen = selectedUserId && msgSenderId === selectedUserId;

//     if (isCurrentChatOpen) {
//       // Chat is open → add message, reset unread locally, tell backend
//       // dispatch(addMessage(msg));
//       dispatch(resetUnreadCountLocal(msgSenderId));
//       socket.emit("mark-as-read", { senderId: msg.sender });
//     } else {
//       // Chat not open → increment unread, still add to store for preview
//       dispatch(addMessage(msg));
//       dispatch(incrementUnread(msgSenderId));
//     }
  

//     }
//   };

//   socket.on("newMessage", handleIncomingMessage);
//   socket.on("group-message-received", handleIncomingMessage);

//   return () => {
//     socket.off("newMessage", handleIncomingMessage);
//     socket.off("group-message-received", handleIncomingMessage);
//   };
// }, [socket, selectedUser, selectedGroup, dispatch]);



// Socket listener for incoming messages
// useEffect(() => {
//   if (!socket) return;

//   const handleIncomingMessage = (msg) => {
//     const selectedUserId = selectedUser?._id;
//     const msgSenderId = msg.sender?._id || msg.sender;
//     const msgGroupId = msg.group || msg.groupId;

//     if (msgGroupId) {
//       // Group message
//       const isCurrentGroupOpen = selectedGroup?._id === msgGroupId;
//       dispatch(addGroupMessage({ groupId: msgGroupId, message: msg, isActive: isCurrentGroupOpen }));

//       if (isCurrentGroupOpen) {
//         socket.emit("mark-group-read", { groupId: msgGroupId });
//         dispatch(resetGroupUnread(msgGroupId));
//       }
//     } else {
//   const msgSenderId = msg.sender?._id || msg.sender;
//   const isCurrentChatOpen = selectedUser?._id === msgSenderId;

//   dispatch(addMessage(msg)); // always add message

//   if (isCurrentChatOpen) {
//     // ✅ Chat is open → reset unread locally + tell backend
//     dispatch(resetUnreadCountLocal(msgSenderId));
//     socket.emit("mark-as-read", { senderId: msgSenderId });
//   } else {
//     // Chat not open → increment unread
//     dispatch(incrementUnread(msgSenderId));
//   }
//   }
// }

//   socket.on("newMessage", handleIncomingMessage);
//   socket.on("group-message-received", handleIncomingMessage);

//   return () => {
//     socket.off("newMessage", handleIncomingMessage);
//     socket.off("group-message-received", handleIncomingMessage);
//   };
// }, [socket, selectedUser, selectedGroup, dispatch]);


useEffect(() => {
  if (!socket) return;

  const handleIncomingMessage = (msg) => {
    const selectedUserId = selectedUser?._id;
    const msgSenderId = msg.sender?._id || msg.sender;
    const msgGroupId = msg.group || msg.groupId;

    if (msgGroupId) {
      // Group message
      const isCurrentGroupOpen = selectedGroup?._id === msgGroupId;
      dispatch(addGroupMessage({ groupId: msgGroupId, message: msg, isActive: isCurrentGroupOpen }));

      if (isCurrentGroupOpen) {
        socket.emit("mark-group-read", { groupId: msgGroupId });
        dispatch(resetGroupUnread(msgGroupId));
      }
    } else {
      // 1:1 chat
      console.log(msg)
      const isCurrentChatOpen = selectedUserId === msgSenderId;
      dispatch(addMessage(msg)); // always add message

      if (isCurrentChatOpen) {
        // Chat is open → tell backend to mark as read
        socket.emit("mark-as-read", { senderId: selectedUserId });
      } else {
        // Chat not open → increment unread
        dispatch(incrementUnread(msgSenderId));
      }
    }
  };


  socket.on("newMessage", handleIncomingMessage);
  socket.on("group-message-received", handleIncomingMessage);

  return () => {
    socket.off("newMessage", handleIncomingMessage);
    socket.off("group-message-received", handleIncomingMessage);
  };
}, [socket, selectedUser, selectedGroup, dispatch]);


  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollIntoView({ behavior: "auto" });
  }, [chatMessages, isTyping]);

  // const formatTime = (dateString) =>
  //   new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formatTime = (dateString) =>
  new Date(dateString).toLocaleString([], {
    // day: "2-digit",
    // month: "short",
    // year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  

  return (
    <>


   <div className="flex flex-col h-full">

<header className="h-18 z-10  top-0 w-full bg-white dark:bg-[#0e0d0d] md:relative flex items-center justify-between px-4 md:px-6 border-b border-slate-200 dark:border-white/10 shrink-0">
  <div className="flex items-center gap-3">
    {/* Sidebar toggle on mobile */}
    <button onClick={() => dispatch(toggleSidebar())} className="md:hidden p-2 -ml-2 text-slate-600">
      <LuMenu size={24} />
    </button>

    {/* User / Group info */}
    <div className="flex items-center gap-2 truncate">
      <div className="w-8 h-8 md:w-10 md:h-10 rounded-md bg-slate-200 shrink-0 overflow-hidden">
        <img
          src={
            selectedUser
              ?   `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedUser._id}`
              : selectedGroup
              ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedGroup._id}`
              : ""
          }
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col flex-1 truncate">
        <h2 className="font-bold text-md dark:text-gray-500 leading-tight truncate">
          {selectedUser
            ? selectedUser.fullName
            : selectedGroup
            ? selectedGroup.name
            : "Select a Chat"}
        </h2>

        {selectedUser && (
          <span
            className={`text-[11px] transition-all duration-300 ${
              isTyping ? "text-indigo-600 font-medium animate-pulse" : "text-slate-400"
            }`}
          >
            {isTyping ? "typing..." : selectedUser.online ? "Online" : "Offline"}
          </span>
        )}

        {/* Optional: show group members count */}
        {selectedGroup && (
          <span className="text-[11px] text-slate-400">
            {selectedGroup.members?.length || 0} members
          </span>
        )}
      </div>
    </div>
  </div>

  {/* {selectedUser && ( */}
    <div className="flex items-center gap-1 md:gap-3">
      <HeaderBtn icon={<LuPhone size={18} />} />
      <HeaderBtn icon={<LuVideo size={18} />} />
      <HeaderBtn icon={<LuInfo size={18} className="hidden sm:block" />} />
    </div>
  {/* )} */}
</header>







    <main className="flex-1 flex flex-col min-w-0  h-full max-h-screen overflow-hidden">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6 scrollbar-thin scrollbar-thumb-slate-200    relative flex-1 overflow-y-auto px-4 md:px-6 py-6
          bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('')" }}
          >
        <div className="space-y-4">
          {
            loading ?  (
              <>
              <MessagesSkeleton count={5}/>
              </>
            ) : chatMessages.length === 0 ? (
              <div className="flex flex-col items-center gap-3 mt-10">
                {/* <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse" /> */}
                <p className="text-gray-500 text-sm">No messages yet. Start the conversation!</p>
              </div>
            ) : (
 chatMessages?.map((msg, idx) => {
            const isSender = msg.sender?._id === authUser._id || msg.sender === authUser._id;

            return (
              <div key={msg._id || idx} className={`flex w-full ${isSender ? "justify-end" : "justify-start"}` }>
                <div className={`flex gap-4 max-w-[80%] md:max-w-[70%] ${isSender ? "flex-row-reverse" : ""}` }>
                  {/* Avatar */}
                  {/* <div
                    className="size-8 rounded-lg bg-cover bg-center shrink-0 shadow-sm mt-auto"
                    style={{ backgroundImage: `url(${isSender ? authUser.profilePic : msg.sender?.profilePic })` }}
                  /> */}

                  {/* Bubble */}
                  <div className={`flex  flex-col ${isSender ? "items-end" : "items-start"}`}>
                    <div className={`rounded-lg px-3.5 py-1.5 text-sm leading-relaxed ${isSender ? "bg-green-500 text-white rounded-br-none" : "bg-slate-100 dark:bg-gray-900 dark:text-white  text-slate-900 rounded-bl-none"}`}>
                      
                      {/* Show sender name for group messages */}
                      {selectedGroup && !isSender && msg.sender?.fullName && (
                        <span className="block text-[10px] font-semibold text-indigo-200 mb-1">
                          {msg.sender.fullName}
                        </span>
                      )}
                      
                 <div className="flex flex-col">
  <span className="text-[13px]">{msg.text || msg.message?.text}</span>
  <div className={`flex mt-0.2 text-[10px] font-medium text-white`}>
    {isSender ? (
      // Sent message: time on left
      <span className="mr-auto text-[9px] text-white">{formatTime(msg.createdAt || new Date())}</span>
    ) : (
      // Received message: time on right
      <span className="ml-auto text-[9px] text-slate-600">{formatTime(msg.createdAt || new Date())}</span>
    )}
      {isSender && (
              <span className="ml-1 text-[10px]">
                {msg.status === "sending" && "⏳ Sending"}
                {msg.status === "sent" && "✓✓"}
              </span>
      )
 }
  </div>
</div>

                    </div>


                    
                    
                  </div>
                </div>
              </div>
            );
          })
            )
          }
         

          {/* Typing indicator */}
          {/* {isTyping && activeChat && (
            <div className="flex justify-start">
              <div className="bg-slate-100 text-slate-500 text-xs px-4 py-2 rounded-2xl rounded-bl-none">
                {activeChat?.fullName || "Someone"} is typing...
              </div>
            </div>
          )} */}

{activeChat && (
  <TypingIndicator
    user={activeChat}
    isVisible={isTyping}
  />
)}


          <div ref={scrollRef} />
        </div>
      </div>

      {/* Message input */}
      <div className="shrink-0  border-t border-slate-200 dark:border-white/10  p-4">
        <div className="max-w-4xl mx-auto">
          <MessageInput
            isGroup={!!selectedGroup}
            chatId={selectedGroup?._id || selectedUser?._id} // ✅ always use _id
          />
        </div>
      </div>
    </main>
    </div>
    </>
  );
};

export default ChatArea;


const HeaderBtn = ({ icon }) => (
  <button className="p-2 hover:bg-gray-100 rounded-lg text-slate-500 transition-colors">{icon}</button>
);



// import React, { useEffect, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchMessages, addMessage, incrementUnread, resetUnreadCountLocal } from '../features/chat/chatSlice';
// import { getGroupMessages, addGroupMessage, resetGroupUnread } from '../features/group/groupSlice';
// import MessageInput from './MessageInput';
// import { getSocket } from '../utils/socket.js';
// import useTypingIndicator from '../hook/useTypingIndicator.jsx';
// import TypingIndicator from './bitsComponents/TypingIndecator.jsx';
// import { LuInfo, LuMenu, LuPhone, LuVideo } from 'react-icons/lu';

// const ChatArea = () => {
//   const dispatch = useDispatch();
//   const scrollRef = useRef(null);
//   const { authUser } = useSelector((state) => state.auth);
//   const { selectedUser, messages } = useSelector((state) => state.chat);
//   const { selectedGroup, groupmessages } = useSelector((state) => state.group);
//   const socket = getSocket();
//   const isTyping = useTypingIndicator(socket, selectedUser?._id);

//   const activeChat = selectedGroup || selectedUser;
//   const chatMessages = selectedGroup ? groupmessages : messages;

//   // Fetch messages when selection changes
//   useEffect(() => {
//     if (!socket) return;

//     if (selectedUser?._id) {
//       dispatch(fetchMessages(selectedUser._id)).then(() => {
//         socket.emit("mark-as-read", { senderId: selectedUser._id });
//       });
//     }

//     if (selectedGroup?._id) {
//       dispatch(getGroupMessages(selectedGroup._id)).then(() => {
//         socket.emit("mark-group-read", { groupId: selectedGroup._id });
//       });
//     }
//   }, [selectedUser?._id, selectedGroup?._id, dispatch, socket]);

//   // Join selected group & leave on unmount
//   useEffect(() => {
//     if (!selectedGroup?._id) return;

//     socket.emit("join-group", selectedGroup._id);
//     console.log("Joined group:", selectedGroup._id);

//     return () => {
//       socket.emit("leave-group", selectedGroup._id);
//       console.log("Left group:", selectedGroup._id);
//     };
//   }, [socket, selectedGroup?._id]);

//   // Socket listener for incoming messages
//   useEffect(() => {
//     if (!socket) return;

//     const handleIncomingMessage = (msg) => {
//       const selectedUserId = selectedUser?._id;
//       const msgSenderId = msg.sender?._id || msg.sender;
//       const msgGroupId = msg.group || msg.groupId;

//       if (msgGroupId) {
//         const isCurrentGroupOpen = selectedGroup?._id === msgGroupId;
//         dispatch(addGroupMessage({ groupId: msgGroupId, message: msg, isActive: isCurrentGroupOpen }));

//         if (isCurrentGroupOpen) {
//           socket.emit("mark-group-read", { groupId: msgGroupId });
//           dispatch(resetGroupUnread(msgGroupId));
//         }
//       } else {
//         const isCurrentChatOpen = selectedUserId === msgSenderId;
//         dispatch(addMessage(msg));

//         if (isCurrentChatOpen) {
//           socket.emit("mark-as-read", { senderId: selectedUserId });
//         } else {
//           dispatch(incrementUnread(msgSenderId));
//         }
//       }
//     };

//     socket.on("newMessage", handleIncomingMessage);
//     socket.on("group-message-received", handleIncomingMessage);

//     return () => {
//       socket.off("newMessage", handleIncomingMessage);
//       socket.off("group-message-received", handleIncomingMessage);
//     };
//   }, [socket, selectedUser, selectedGroup, dispatch]);

//   // Auto-scroll to bottom
//   useEffect(() => {
//     if (scrollRef.current) scrollRef.current.scrollIntoView({ behavior: "auto" });
//   }, [chatMessages, isTyping]);

//   const formatTime = (dateString) =>
//     new Date(dateString).toLocaleString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     });

//   return (
//     <div className="flex flex-col h-full">
//       {/* Header */}
//       <header className="h-18 z-10 w-full bg-white dark:bg-[#0e0d0d] flex items-center justify-between px-4 md:px-6 border-b border-slate-200 dark:border-white/10 shrink-0">
//         <div className="flex items-center gap-3">
//           {/* Sidebar toggle on mobile */}
//           <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 -ml-2 text-slate-600">
//             <LuMenu size={24} />
//           </button>

//           {/* User / Group info */}
//           <div className="flex items-center gap-2 truncate">
//             <div className="w-8 h-8 md:w-10 md:h-10 rounded-md bg-slate-200 shrink-0 overflow-hidden">
//               <img
//                 src={
//                   selectedUser
//                     ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedUser._id}`
//                     : selectedGroup
//                     ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedGroup._id}`
//                     : ""
//                 }
//                 alt=""
//                 className="w-full h-full object-cover"
//               />
//             </div>

//             <div className="flex flex-col flex-1 truncate">
//               <h2 className="font-bold text-md dark:text-gray-500 leading-tight truncate">
//                 {selectedUser ? selectedUser.fullName : selectedGroup ? selectedGroup.name : "Select a Chat"}
//               </h2>

//               {selectedUser && (
//                 <span
//                   className={`text-[11px] transition-all duration-300 ${
//                     isTyping ? "text-indigo-600 font-medium animate-pulse" : "text-slate-400"
//                   }`}
//                 >
//                   {isTyping ? "typing..." : selectedUser.online ? "Online" : "Offline"}
//                 </span>
//               )}

//               {selectedGroup && (
//                 <span className="text-[11px] text-slate-400">
//                   {selectedGroup.members?.length || 0} members
//                 </span>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="flex items-center gap-1 md:gap-3">
//           <HeaderBtn icon={<LuPhone size={18} />} />
//           <HeaderBtn icon={<LuVideo size={18} />} />
//           <HeaderBtn icon={<LuInfo size={18} className="hidden sm:block" />} />
//         </div>
//       </header>

//       {/* Chat content */}
//       <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
//         <div
//           className="flex-1 overflow-y-auto px-4 md:px-6 py-6 scrollbar-thin scrollbar-thumb-slate-200 relative bg-cover bg-center bg-no-repeat"
//           style={{ backgroundImage: "url('')" }}
//         >
//           <div className="space-y-4">
//             {chatMessages?.map((msg, idx) => {
//               const isSender = msg.sender?._id === authUser._id || msg.sender === authUser._id;

//               return (
//                 <div key={msg._id || idx} className={`flex w-full ${isSender ? "justify-end" : "justify-start"}`}>
//                   <div className={`flex gap-4 max-w-[80%] md:max-w-[70%] ${isSender ? "flex-row-reverse" : ""}`}>
//                     <div className={`flex flex-col ${isSender ? "items-end" : "items-start"}`}>
//                       <div
//                         className={`rounded-lg px-3.5 py-1.5 text-sm leading-relaxed ${
//                           isSender
//                             ? "bg-green-500 text-white rounded-br-none"
//                             : "bg-slate-100 dark:bg-gray-900 dark:text-white text-slate-900 rounded-bl-none"
//                         }`}
//                       >
//                         {selectedGroup && !isSender && msg.sender?.fullName && (
//                           <span className="block text-[10px] font-semibold text-indigo-200 mb-1">
//                             {msg.sender.fullName}
//                           </span>
//                         )}

//                         <div className="flex flex-col">
//                           <span className="text-[13px]">{msg.text}</span>
//                           <div className="flex mt-0.2 text-[10px] font-medium text-white">
//                             {isSender ? (
//                               <span className="mr-auto text-[9px] text-white">{formatTime(msg.createdAt || new Date())}</span>
//                             ) : (
//                               <span className="ml-auto text-[9px] text-slate-600">{formatTime(msg.createdAt || new Date())}</span>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}

//             {activeChat && <TypingIndicator user={activeChat} isVisible={isTyping} />}

//             <div ref={scrollRef} />
//           </div>
//         </div>

//         {/* Message input */}
//         <div className="shrink-0 border-t border-slate-200 dark:border-white/10 p-4">
//           <div className="max-w-4xl mx-auto">
//             <MessageInput isGroup={!!selectedGroup} chatId={selectedGroup?._id || selectedUser?._id} />
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default ChatArea;

// const HeaderBtn = ({ icon }) => (
//   <button className="p-2 hover:bg-gray-100 rounded-lg text-slate-500 transition-colors">{icon}</button>
// );
