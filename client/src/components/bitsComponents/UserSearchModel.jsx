import React from "react";
import { BsChatDots } from "react-icons/bs";
import SearchInputUser from "./SearchInputUser";
import { useSelector, useDispatch } from "react-redux";
import { setChat } from "../../features/chat/chatSlice";

export default function UserSearchModal({ onClose }) {
  const dispatch = useDispatch();
  const { searchResults = [], loadingSearch, chats } = useSelector((state) => state.chat);

  // Function to handle selecting a user
  const handleSelectUser = (user) => {
    // Check if chat already exists
    const exists = chats.find(
      (c) => c._id === user._id || c.user?._id === user._id
    );

    if (exists) {

      dispatch(setChat(exists));
    } else {
          const newChat = {
      _id: user._id, // temporary, could also generate a UUID
      lastMessage: "", // no message yet
      lastMessageAt: null,
      messages: [],
      unreadCount: 0,
      user: { ...user },
    };
      dispatch(setChat(newChat));
    }
//   setSidebarOpen(false);
    onClose();
    // Close dropdown and clear search
    // setSearchQuery("");
    // setShowDropdown(false);
  };


  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white dark:bg-[#1a2233] w-full max-w-md rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] sm:max-h-[85vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between mb-2 sm:mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
              Find People
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors text-2xl sm:text-3xl"
            >
              ×
            </button>
          </div>

          {/* Search Input */}
          <SearchInputUser />
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto results-scroll">
          <div className="sticky top-0 bg-white/95 dark:bg-[#1a2233]/95 backdrop-blur-sm z-10">
            <h3 className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider px-4 sm:px-6 py-3 sm:py-4">
              Search Results ({searchResults.length})
            </h3>
          </div>

          <div className="px-2 sm:px-3 pb-4 sm:pb-6 space-y-1">
            {loadingSearch ? (
              <p className="text-xs text-center text-gray-500 mt-2">Searching...</p>
            ) : searchResults.length > 0 ? (
              searchResults.map((user) => (
                <UserListItem key={user._id} user={user} onSelect={handleSelectUser} />
              ))
            ) : (
              <p className="text-xs text-center text-gray-500 mt-2">No users found</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-6 text-[11px] text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 font-sans">↵</kbd>
            <span>to select</span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 font-sans">↑↓</kbd>
            <span>to navigate</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Single user item component
function UserListItem({ user, onSelect }) {
  return (
    <div className="group flex items-center gap-3 sm:gap-4 hover:bg-gray-50 dark:hover:bg-white/5 px-3 sm:px-4 rounded-xl min-h-[40px] sm:min-h-[80px] py-2 sm:py-3 justify-between cursor-pointer transition-all duration-200">
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="relative">
          {user.profilePic ? (
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-10 sm:h-12 w-10 sm:w-12"
              style={{ backgroundImage: `url(${user.profilePic})` }}
            />
          ) : (
            <div className="bg-primary/10 text-primary flex items-center justify-center font-bold h-10 sm:h-12 w-10 sm:w-12 rounded-full text-sm sm:text-lg">
              {user.initials}
            </div>
          )}

          <div
            className={`absolute bottom-0 right-0 h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-full border-2 border-white dark:border-[#1a2233] ${
              user.online === "green"
                ? "bg-green-500"
                : user.online === "yellow"
                ? "bg-yellow-400"
                : "bg-gray-300 dark:bg-gray-600"
            }`}
          ></div>
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-gray-900 dark:text-white text-sm sm:text-base font-bold leading-normal line-clamp-1">
            {user.fullName}
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm font-medium leading-normal line-clamp-1">
            {/* {user.role || ""} */}
          </p>
        </div>
      </div>

      <button
        onClick={() => onSelect(user)}
        className="flex items-center gap-1 sm:gap-2 cursor-pointer overflow-hidden rounded-lg h-8 sm:h-10 px-3 sm:px-5 bg-primary text-white text-xs sm:text-sm font-bold leading-normal w-fit hover:bg-blue-700 hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95"
      >
        <BsChatDots className="text-sm sm:text-base" />
        <span className="truncate max-sm:hidden">Start Chat</span>
      </button>
    </div>
  );
}
