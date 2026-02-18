// import React, { useState, useRef, useEffect } from "react";
// import { BsEmojiSmile } from "react-icons/bs";

// import {
//   LuBold,
//   LuCirclePlus,
//   LuCode,
//   LuItalic,
//   LuLink,
//   LuList,
//   LuSend,
// } from "react-icons/lu";
// import EmojiPicker from "emoji-picker-react";

// import { getSocket } from "../utils/socket.js";
// import { useDispatch, useSelector } from "react-redux";
// import { sendMessage } from "../features/chat/chatSlice";

// function MessageInput() {
//   const dispatch = useDispatch();
//   const { selectedUser } = useSelector((state) => state.chat);

//   const [text, setText] = useState("");
//   const [files, setFiles] = useState([]);
//   const [showEmoji, setShowEmoji] = useState(false);

//   const imageRef = useRef(null);
//   const fileRef = useRef(null);
//   const emojiRef = useRef(null);
//   const emojiBtnRef = useRef(null);

//   const socket = getSocket();

//   const handleSend = () => {
//     if (!text.trim() && files.length === 0) return;
//     if (!selectedUser?._id) return;

//     socket.emit("sendMessage", {
//       receiverId: selectedUser._id,
//       text,
//       media: files,
//     });

//     dispatch(
//       sendMessage({
//         receiverId: selectedUser._id,
//         text,
//         media: files,
//       })
//     );

//     setText("");
//     setFiles([]);
//     setShowEmoji(false);

//     if (imageRef.current) imageRef.current.value = null;
//     if (fileRef.current) fileRef.current.value = null;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     handleSend();
//   };

//   const handleFileChange = (e) => {
//     setFiles(Array.from(e.target.files));
//   };

//   // Close emoji picker when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (
//         showEmoji &&
//         emojiRef.current &&
//         !emojiRef.current.contains(e.target) &&
//         emojiBtnRef.current &&
//         !emojiBtnRef.current.contains(e.target)
//       ) {
//         setShowEmoji(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [showEmoji]);

//   return (
//     <>
//       <form
//         onSubmit={handleSubmit}
//         className="relative bottom-15 md:bottom-0 left-0 w-full p-4 bg-white/80 backdrop-blur-md border-t border-slate-100 md:border-t-0"
//       >
//         {/* Emoji picker positioned above the form */}
//         {showEmoji && (
//           <div
//             ref={emojiRef}
//             className="absolute bottom-full left-3 mb-2 z-50 shadow-lg rounded-xl"
//           >
//             <EmojiPicker
//               onEmojiClick={(emojiData) =>
//                 setText((prev) => prev + emojiData.emoji)
//               }
//             />
//           </div>
//         )}

//         <div className="max-w-screen-xl mx-auto border border-slate-200 rounded-xl bg-white shadow-lg md:shadow-sm focus-within:ring-2 focus-within:ring-indigo-100 focus-within:border-indigo-300 transition-all">

//           {/* Formatting Toolbar */}
//           <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-gray-50/50 border-b border-slate-200 rounded-t-xl">
//             <ToolbarBtn icon={<LuBold size={14} />} />
//             <ToolbarBtn icon={<LuItalic size={14} />} />
//             <ToolbarBtn icon={<LuCode size={14} />} />
//             <div className="w-px h-4 bg-slate-200 mx-1"></div>
//             <ToolbarBtn icon={<LuList size={14} />} />
//             <ToolbarBtn icon={<LuLink size={14} />} />
//           </div>

//           {/* Textarea */}
//           <div className="px-4 py-2">
//             <textarea
//               value={text}
//               onChange={(e) => setText(e.target.value)}
//               className="w-full bg-transparent border-none outline-none text-sm md:text-[15px] resize-none py-2 placeholder-slate-400"
//               placeholder={`Message ${selectedUser?.fullName || "User"}`}
//               rows="1"
//             />
//           </div>

//           {/* Action Buttons */}
//           <div className="flex items-center justify-between px-4 pb-2">
//             <div className="flex items-center gap-1">
//               <button
//                 type="button"
//                 className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"
//               >
//                 <LuCirclePlus size={20} />
//               </button>

//               <button
//                 ref={emojiBtnRef}
//                 type="button"
//                 onClick={() => setShowEmoji((prev) => !prev)}
//                 className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"
//               >
//                 <BsEmojiSmile size={20} />
//               </button>
//             </div>

//             <button
//               type="submit"
//               className="bg-indigo-600 text-white p-2 md:px-5 md:py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 active:scale-95 transition-all shadow-md shadow-indigo-100"
//             >
//               <span className="hidden md:inline text-sm font-bold tracking-tight">
//                 Send
//               </span>
//               <LuSend size={18} />
//             </button>
//           </div>
//         </div>
//       </form>
//     </>
//   );
// }

// export default MessageInput;

// const ToolbarBtn = ({ icon }) => (
//   <button
//     type="button"
//     className="p-1.5 hover:bg-gray-200 rounded text-slate-500 transition-colors"
//   >
//     {icon}
//   </button>
// );


// import React, { useState, useRef, useEffect } from "react";
// import { BsEmojiSmile } from "react-icons/bs";
// import {
//   LuBold,
//   LuCirclePlus,
//   LuCode,
//   LuItalic,
//   LuLink,
//   LuList,
//   LuSend,
// } from "react-icons/lu";
// import EmojiPicker from "emoji-picker-react";
// import { getSocket } from "../utils/socket.js";
// import { useDispatch } from "react-redux";
// import { sendMessage } from "../features/chat/chatSlice";
// import { addGroupMessage } from "../features/group/groupSlice";

// function MessageInput({ isGroup = false, chatId }) {
//   const dispatch = useDispatch();
//   const socket = getSocket();

//   const [text, setText] = useState("");
//   const [files, setFiles] = useState([]);
//   const [showEmoji, setShowEmoji] = useState(false);

//   const imageRef = useRef(null);
//   const fileRef = useRef(null);
//   const emojiRef = useRef(null);
//   const emojiBtnRef = useRef(null);

//   const handleSend = () => {
//     if (!text.trim() && files.length === 0) return;
//     if (!chatId) return;

//     // 🔹 GROUP MESSAGE
//     if (isGroup) {
//       socket.emit("sendGroupMessage", {
//         groupId: chatId,
//         text,
//         media: files,
//       });

//       dispatch(
//         addGroupMessage({
//           groupId: chatId,
//           message: {
//             text,
//             createdAt: new Date(),
//           },
//           isActive: true,
//         })
//       );
//     }

//     // 🔹 USER MESSAGE
//     else {
//       socket.emit("sendMessage", {
//         receiverId: chatId,
//         text,
//         media: files,
//       });

//       dispatch(
//         sendMessage({
//           receiverId: chatId,
//           text,
//           media: files,
//         })
//       );
//     }

//     setText("");
//     setFiles([]);
//     setShowEmoji(false);

//     if (imageRef.current) imageRef.current.value = null;
//     if (fileRef.current) fileRef.current.value = null;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     handleSend();
//   };

//   const handleFileChange = (e) => {
//     setFiles(Array.from(e.target.files));
//   };

//   // Close emoji picker when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (
//         showEmoji &&
//         emojiRef.current &&
//         !emojiRef.current.contains(e.target) &&
//         emojiBtnRef.current &&
//         !emojiBtnRef.current.contains(e.target)
//       ) {
//         setShowEmoji(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [showEmoji]);

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="relative w-full p-4 bg-white border-t border-slate-100"
//     >
//       {/* Emoji Picker */}
//       {showEmoji && (
//         <div
//           ref={emojiRef}
//           className="absolute bottom-full left-3 mb-2 z-50 shadow-lg rounded-xl"
//         >
//           <EmojiPicker
//             onEmojiClick={(emojiData) =>
//               setText((prev) => prev + emojiData.emoji)
//             }
//           />
//         </div>
//       )}

//       <div className="max-w-screen-xl mx-auto border border-slate-200 rounded-xl bg-white shadow-sm">
//         {/* Toolbar */}
//         <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-gray-50 border-b border-slate-200 rounded-t-xl">
//           <ToolbarBtn icon={<LuBold size={14} />} />
//           <ToolbarBtn icon={<LuItalic size={14} />} />
//           <ToolbarBtn icon={<LuCode size={14} />} />
//           <div className="w-px h-4 bg-slate-200 mx-1"></div>
//           <ToolbarBtn icon={<LuList size={14} />} />
//           <ToolbarBtn icon={<LuLink size={14} />} />
//         </div>

//         {/* Textarea */}
//         <div className="px-4 py-2">
//           <textarea
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             className="w-full bg-transparent border-none outline-none text-sm resize-none py-2"
//             placeholder={isGroup ? "Message group" : "Message user"}
//             rows="1"
//           />
//         </div>

//         {/* Actions */}
//         <div className="flex items-center justify-between px-4 pb-2">
//           <div className="flex items-center gap-1">
//             <button type="button" className="p-2 text-slate-400 hover:text-indigo-600">
//               <LuCirclePlus size={20} />
//             </button>

//             <button
//               ref={emojiBtnRef}
//               type="button"
//               onClick={() => setShowEmoji((prev) => !prev)}
//               className="p-2 text-slate-400 hover:text-indigo-600"
//             >
//               <BsEmojiSmile size={20} />
//             </button>
//           </div>

//           <button
//             type="submit"
//             className="bg-indigo-600 text-white p-2 md:px-5 md:py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700"
//           >
//             <span className="hidden md:inline text-sm font-bold">Send</span>
//             <LuSend size={18} />
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// }

// export default MessageInput;

// const ToolbarBtn = ({ icon }) => (
//   <button
//     type="button"
//     className="p-1.5 hover:bg-gray-200 rounded text-slate-500"
//   >
//     {icon}
//   </button>
// );






















import React, { useState, useRef, useEffect } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { LuBold, LuCirclePlus, LuCode, LuItalic, LuLink, LuList, LuSend } from "react-icons/lu";
import EmojiPicker from "emoji-picker-react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, sendMessage } from "../features/chat/chatSlice";
import { addGroupMessage } from "../features/group/groupSlice";
import { getSocket } from "../utils/socket.js";
import { saveOfflineMessage } from "../utils/offlineMessages.js";
import useOnlineStatus from "../hook/useOnlineStatus.jsx";

function MessageInput({ isGroup = false, chatId }) {
  const dispatch = useDispatch();
  const {selectedUser}=useSelector(state=>state.chat)
  const {selectedGroup}=useSelector(state=>state.group)

  const { authUser } = useSelector((state) => state.auth);
  const socket = getSocket();
  // console.log(isGroup)
// console.log("isGroup:", isGroup, "chatId:", chatId);

  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);
  const [showEmoji, setShowEmoji] = useState(false);

  const imageRef = useRef(null);
  const fileRef = useRef(null);
  const emojiRef = useRef(null);
  const emojiBtnRef = useRef(null);
  const typingTimeoutRef = useRef(null);
const isTypingRef = useRef(false);
const isOnline = useOnlineStatus();

  const handleSend = () => {
    if (!text.trim() && files.length === 0) return;
    if (!chatId) return;
  const tempId = Date.now().toString();
  const newMessage = {
    _id: tempId,
    receiverId:chatId,
    sender: {
      _id: authUser._id,
      fullName: authUser.fullName,
      profilePic: authUser.profilePic,
    },
    text,
    attachments: files || [],
    readBy: [],
    isDeleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: navigator.onLine ? "sent" : "sending", // ✅ online = sent, offline = sending
  };

     if (isOnline) {
      // Online: send to socket + add to redux
      if (isGroup) {
        socket.emit("send-group-message", {
          groupId: chatId,
          senderId: authUser._id,
          text,
          media: files,
          localId: newMessage._id,
        });
        dispatch(addGroupMessage({ groupId: chatId, message: newMessage }));
      } else {
        socket.emit("sendMessage", {
          receiverId: chatId,
          text,
          media: files,
          localId: newMessage._id,
        });
        dispatch(addMessage(newMessage));
      dispatch( sendMessage({ receiverId: chatId, text, media: files, }) );
      }
    } else {
      // Offline: only save locally
      if (isGroup){

       dispatch(addGroupMessage({ groupId: chatId, message: newMessage }));
      }
      else dispatch(addMessage({ receiverId: chatId, message: newMessage }));

      saveOfflineMessage(newMessage);
    }


    setText("");
    setFiles([]);
    setShowEmoji(false);

    if (imageRef.current) imageRef.current.value = null;
    if (fileRef.current) fileRef.current.value = null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSend();
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };


  const handleTyping = () => {
  if (!chatId) return;

  // emit only once when typing starts
  if (!isTypingRef.current) {
    isTypingRef.current = true;

    socket.emit(isGroup ? "groupTyping" : "typing", {
      receiverId: chatId,
    });
    
  }

  // reset stop-typing timer
  if (typingTimeoutRef.current) {
    clearTimeout(typingTimeoutRef.current);
  }

  typingTimeoutRef.current = setTimeout(() => {
    socket.emit(isGroup ? "groupStopTyping" : "stopTyping", {
      receiverId: chatId,
    });
    isTypingRef.current = false;
  }, 1500);
};


  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        showEmoji &&
        emojiRef.current &&
        !emojiRef.current.contains(e.target) &&
        emojiBtnRef.current &&
        !emojiBtnRef.current.contains(e.target)
      ) {
        setShowEmoji(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showEmoji]);

  return (
    <form onSubmit={handleSubmit} className="relative w-full p-4   border-slate-200 dark:border-white/10 ">
      {/* Emoji Picker */}
      {showEmoji && (
        <div ref={emojiRef} className="absolute bottom-full left-3 mb-2 z-50 shadow-lg rounded-xl">
          <EmojiPicker onEmojiClick={(emojiData) => setText((prev) => prev + emojiData.emoji)} />
        </div>
      )}

      <div className="max-w-screen-xl mx-auto border border-slate-200 dark:border-white/10  rounded-xl  shadow-sm">
        {/* Toolbar */}
        <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 dark:bg-gray-700 border-b border-slate-200 dark:border-white/10 rounded-t-xl">
          <ToolbarBtn icon={<LuBold size={14} />} />
          <ToolbarBtn icon={<LuItalic size={14} />} />
          <ToolbarBtn icon={<LuCode size={14} />} />
          <div className="w-px h-4 bg-slate-200 mx-1"></div>
          <ToolbarBtn icon={<LuList size={14} />} />
          <ToolbarBtn icon={<LuLink size={14} />} />
        </div>

        {/* Textarea */}
        <div className="px-4 py-2">
          <textarea
            value={text}
            onChange={(e) => {
    setText(e.target.value);
    handleTyping();
  }}
            className="w-full bg-transparent border-none outline-none text-sm resize-none py-2 dark:text-gray-100"
            placeholder={isGroup ? "Message group" : "Message user"}
            rows="1"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between px-4 pb-2">
          <div className="flex items-center gap-1">
            <button type="button" className="p-2 text-slate-400 hover:text-indigo-600">
              <LuCirclePlus size={20} />
            </button>

            <button
              ref={emojiBtnRef}
              type="button"
              onClick={() => setShowEmoji((prev) => !prev)}
              className="p-2 text-slate-400 hover:text-indigo-600"
            >
              <BsEmojiSmile size={20} />
            </button>
          </div>

          <button
            type="submit"
            className="bg-green-500  transition-all duration-150 ease-in-out
      active:scale-95 text-white p-2 md:px-5 md:py-2 rounded-lg flex items-center gap-2 hover:bg-green-600"
          >
            <span className="hidden md:inline text-sm font-bold">Send</span>
            <LuSend size={18} />
          </button>
        </div>
      </div>
    </form>
  );
}

export default MessageInput;

const ToolbarBtn = ({ icon }) => (
  <button type="button" className="p-1.5 hover:bg-gray-200 rounded text-slate-500">{icon}</button>
);








