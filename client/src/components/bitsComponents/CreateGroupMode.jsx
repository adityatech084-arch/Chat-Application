// /* eslint-disable jsx-a11y/alt-text */
// import React from "react";
// import { FaUsers, FaSearch, FaCamera, FaEdit, FaTimes, FaPlus } from "react-icons/fa";

// export default function CreateGroupModal({ onClose }) {
//   return (
//     <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">

//       {/* Card */}
//       <div className="bg-white dark:bg-gray-900 w-full max-w-[950px] max-h-[90vh] rounded-2xl shadow-2xl border border-gray-300 dark:border-gray-700 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">

//         {/* Header */}
//         <div className="flex items-center justify-between px-5 py-4 border-b border-gray-300 dark:border-gray-700">
//           <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
//             Create New Group
//           </h2>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400 transition-colors"
//           >
//             <FaTimes className="text-xl" />
//           </button>
//         </div>

//         {/* Main */}
//         <div className="flex-1 overflow-hidden">
//           <div className="grid grid-cols-1 md:grid-cols-2 h-full">

//             {/* Left */}
//             <div className="p-6 border-b md:border-b-0 md:border-r border-gray-300 dark:border-gray-700 overflow-y-auto">
//               <div className="space-y-6">

//                 {/* Group Icon */}
//                 <div className="flex flex-col gap-3">
//                   <label className="text-sm font-medium tracking-wide text-gray-900 dark:text-white">
//                     Group Icon
//                   </label>

//                   <div className="relative w-28 h-28 group cursor-pointer mx-auto md:mx-0">
//                     <div
//                       className="rounded-full border border-primary/40 bg-primary/10 hover:bg-primary/20 transition bg-center bg-cover w-full h-full flex items-center justify-center text-primary shadow"
//                       style={{
//                         backgroundImage:
//                           "url('https://placehold.co/300x300/png')",
//                       }}
//                     >
//                       <FaCamera size={22} />
//                     </div>

//                     <div className="absolute bottom-1 right-1 bg-primary text-white p-1.5 rounded-full shadow-md border-2 border-white dark:border-gray-900">
//                       <FaEdit size={12} />
//                     </div>
//                   </div>

//                   <p className="text-xs text-gray-500 dark:text-gray-400">
//                     Upload or choose a group photo.
//                   </p>
//                 </div>

//                 {/* Group Name */}
//                 <div className="flex flex-col gap-1">
//                   <label className="text-sm font-medium text-gray-900 dark:text-white">
//                     Group Name
//                   </label>

//                   <div className="relative">
//                     <FaUsers className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
//                     <input
//                       type="text"
//                       placeholder="Enter group name..."
//                       className="h-11 pl-11 pr-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary outline-none placeholder:text-gray-500 w-full"
//                     />
//                   </div>
//                 </div>

//                 {/* Description */}
//                 <div className="flex flex-col gap-1">
//                   <label className="text-sm font-medium text-gray-900 dark:text-white">
//                     About This Group
//                   </label>
//                   <textarea
//                     placeholder="Describe the group..."
//                     className="min-h-[110px] rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 resize-none bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary outline-none placeholder:text-gray-500"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Right */}
//             <div className="flex flex-col bg-white dark:bg-gray-900">

//               {/* Search */}
//               <div className="p-4 border-b border-gray-300 dark:border-gray-700">
//                 <div className="relative">
//                   <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Search members..."
//                     className="w-full h-11 pl-11 pr-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>
//               </div>

//               {/* Members */}
//               <div className="flex-1 overflow-y-auto p-3 space-y-3">
//                 <p className="text-xs text-center text-gray-500 dark:text-gray-400 py-10">
//                   No contacts found.
//                 </p>
//               </div>
//             </div>

//           </div>
//         </div>

//         {/* Footer */}
//         <div className="flex items-center justify-between px-5 py-4 border-t border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
//           <p className="text-sm text-gray-700 dark:text-gray-400">
//             <span className="font-semibold text-primary">0</span> selected
//           </p>

//           <div className="flex gap-2">
//             <button
//               onClick={onClose}
//               className="px-5 h-10 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium transition-colors flex items-center gap-2"
//             >
//               <FaTimes className="text-sm" />
//               Cancel
//             </button>

//             <button className="px-6 h-10 rounded-lg bg-primary text-white hover:bg-primary/90 font-semibold shadow-md transition flex items-center gap-2">
//               <FaPlus className="text-sm" />
//               Create
//             </button>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { FaUsers, FaSearch, FaCamera, FaEdit, FaTimes, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { searchUsers } from "../../features/chat/chatSlice.js"; // your thunk
import useDebounce from "../../hook/useDebounce.jsx"; // your debounce hook
import { getSocket } from "../../utils/socket";

export default function CreateGroupModal({ onClose, authUser }) {
  const dispatch = useDispatch();
  const { searchResults, loadingSearch } = useSelector(state => state.chat);
const socket = getSocket();
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Debounced search
  const debouncedSearch = useDebounce((value) => {
    if (value.trim()) dispatch(searchUsers(value));
  }, 400);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const toggleMember = (id) => {
    setSelectedMembers(prev =>
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const handleCreateGroup = () => {
    if (!groupName) return alert("Enter a group name");

    socket.emit("createGroup", {
      name: groupName,
      memberIds: selectedMembers,
    });

    setGroupName("");
    setDescription("");
    setSelectedMembers([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 w-full max-w-[950px] max-h-[90vh] rounded-2xl shadow-2xl border border-gray-300 dark:border-gray-700 flex flex-col overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-300 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Create New Group</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400 transition-colors">
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-2">

          {/* Left: Group Details */}
          <div className="p-6 border-b md:border-b-0 md:border-r border-gray-300 dark:border-gray-700 overflow-y-auto space-y-6">
            {/* Group Icon */}
            <div className="flex flex-col gap-3 items-center md:items-start">
              <label className="text-sm font-medium text-gray-900 dark:text-white">Group Icon</label>
              <div className="relative w-28 h-28 cursor-pointer">
                <div
                  className="rounded-full border border-primary/40 bg-primary/10 hover:bg-primary/20 flex items-center justify-center w-full h-full bg-center bg-cover shadow"
                  style={{ backgroundImage: `url('https://placehold.co/300x300/png')` }}
                >
                  <FaCamera size={22} />
                </div>
                <div className="absolute bottom-1 right-1 bg-primary text-white p-1.5 rounded-full shadow-md border-2 border-white dark:border-gray-900">
                  <FaEdit size={12} />
                </div>
              </div>
            </div>

            {/* Group Name */}
            <div className="flex flex-col gap-1 w-full">
              <label className="text-sm font-medium text-gray-900 dark:text-white">Group Name</label>
              <div className="relative">
                <FaUsers className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter group name..."
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="h-11 pl-11 pr-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary outline-none placeholder:text-gray-500 w-full"
                />
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1 w-full">
              <label className="text-sm font-medium text-gray-900 dark:text-white">About This Group</label>
              <textarea
                placeholder="Describe the group..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[110px] rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 resize-none bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary outline-none placeholder:text-gray-500 w-full"
              />
            </div>
          </div>

          {/* Right: Search & Members */}
          <div className="flex flex-col bg-white dark:bg-gray-900">
            {/* Search */}
            <div className="p-4 border-b border-gray-300 dark:border-gray-700">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                <input
                  type="text"
                  placeholder="Search members..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full h-11 pl-11 pr-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Members List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {loadingSearch ? (
                <p className="text-xs text-center text-gray-500 dark:text-gray-400 py-10">Searching...</p>
              ) : searchResults.length > 0 ? (
                searchResults.map((user) => (
                  <div
                    key={user._id}
                    onClick={() => toggleMember(user._id)}
                    className={`p-2 rounded-lg cursor-pointer flex items-center justify-between border ${
                      selectedMembers.includes(user._id)
                        ? "border-primary bg-primary/10"
                        : "border-gray-300 dark:border-gray-700"
                    }`}
                  >
                    <span>{user.fullName}</span>
                    {selectedMembers.includes(user._id) && <FaPlus className="text-primary" />}
                  </div>
                ))
              ) : (
                <p className="text-xs text-center text-gray-500 dark:text-gray-400 py-10">
                  No users found
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
          <p className="text-sm text-gray-700 dark:text-gray-400">
            <span className="font-semibold text-primary">{selectedMembers.length}</span> selected
          </p>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-5 h-10 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium transition-colors flex items-center gap-2"
            >
              <FaTimes className="text-sm" />
              Cancel
            </button>

            <button
              onClick={handleCreateGroup}
              className="px-6 h-10 rounded-lg bg-primary text-white hover:bg-primary/90 font-semibold shadow-md transition flex items-center gap-2"
            >
              <FaPlus className="text-sm" />
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
