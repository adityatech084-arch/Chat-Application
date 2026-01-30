import React from "react";

function TypingIndicator({ user ,isVisible}) {
  if (!user) return null;

  return (
  <div
      className={`
        flex items-center gap-3  py-3
        transition-all duration-300 ease-out
        ${isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-3 pointer-events-none"}
      `}
    >
      {/* <img
        src={user.profilePic}
        alt={user.fullName}
        className="w-8 h-8 rounded-full object-cover"
      /> */}

      <div className="bg-gray-100 dark:bg-gray-900 rounded-full px-4 py-1.5 flex items-center gap-2 shadow-sm">
        {/* <span className="text-xs text-gray-600">
          {user.fullName} is typing
        </span> */}


        <div className="flex gap-1 items-center">
          <div className="mr-2">

          <span className="text-gray-800 dark:text-gray-300 text-xs ">typing</span>
          </div>
          <span className="typing-dot delay-0" />
          <span className="typing-dot delay-150" />
          <span className="typing-dot delay-300" />
        </div>
      </div>
      </div>
  );
}

export default TypingIndicator;
