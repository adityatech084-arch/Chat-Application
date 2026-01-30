import { LuSearch, LuX } from "react-icons/lu";

const SearchInput = () => {
  return (
    <div className="px-3 py-2">
      <div
        className="flex items-center w-full rounded-full px-3
          bg-slate-200 text-gray-900 dark:bg-gray-800 dark:text-white
          transition-all duration-200
          focus-within:bg-slate-50 dark:focus-within:bg-gray-700
          focus-within:ring-2 focus-within:ring-green-500"
      >
        {/* Search Icon */}
        <LuSearch className="text-gray-500 dark:text-gray-400 mx-2" size={20} />

        {/* Input */}
        <input
          type="text"
          placeholder="Search for users"
          className="flex-1 bg-transparent outline-none placeholder-gray-500 dark:placeholder-gray-400 py-2.5"
        />

        {/* Clear Icon */}
        <LuX className="text-gray-500 dark:text-gray-400 cursor-pointer ml-2 hover:text-gray-700 dark:hover:text-white" size={18} />
      </div>
    </div>
  );
};

export default SearchInput;
