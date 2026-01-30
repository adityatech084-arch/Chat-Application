import React from 'react'
import { useState } from 'react';
import { BsSearch } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux';
import useDebounce from '../../hook/useDebounce';
import { searchUsers } from '../../features/chat/chatSlice';

function SearchInputUser() {
      const dispatch = useDispatch();
  const { searchResults, loadingSearch, chats ,selectedUser} = useSelector((state) => state.chat);
  const [searchQuery, setSearchQuery] = useState("");
console.log(selectedUser)


 const debouncedSearch = useDebounce((query) => {
    if (!query.trim()) return ;
    dispatch(searchUsers(query));
    // setShowDropdown(true);
  }, 400);

    const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  return (
        <div className="relative w-full">
               <input
                 type="text"
                 autoFocus
                 value={searchQuery}
              onChange={handleInputChange}
                 placeholder="Search by name, email, or department..."
                 className="w-full h-10 sm:h-12 pl-10 pr-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm sm:text-base"
               />
               <BsSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 text-base sm:text-lg" />
             </div>
  )
}

export default SearchInputUser
