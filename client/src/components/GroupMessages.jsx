import React from "react";
import { useSelector } from "react-redux";

function GroupMessages() {
  const { groupmessages, selectedGroup } = useSelector((state) => state.group);
  const { authUser } = useSelector((state) => state.auth);

  if (!selectedGroup) return null;

  // Get messages for the selected group
  const messages = groupmessages[selectedGroup.id] || [];

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      {messages.map((element, idx) => {
        const isSender =
          element.sender?._id === authUser?._id || element.sender === authUser?._id;

        return (
          <div
            key={element._id || idx}
            className={`flex w-full ${isSender ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`flex gap-3 max-w-[80%] md:max-w-[70%] ${
                isSender ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className="size-8 rounded-lg bg-cover bg-center shrink-0 shadow-sm mt-auto"
                style={{
                  backgroundImage: `url(${
                    isSender
                      ? authUser.profilePic
                      : element.sender?.profilePic ||
                        "https://i.pravatar.cc/150"
                  })`,
                }}
              />

              <div className={`flex flex-col ${isSender ? "items-end" : "items-start"}`}>
                <div
                  className={`rounded-2xl px-4 py-2 text-sm leading-relaxed ${
                    isSender
                      ? "bg-indigo-600 text-white rounded-br-none"
                      : "bg-slate-100 text-slate-900 rounded-bl-none"
                  }`}
                >
                  {element.text}
                </div>
                <span className="mt-1 text-[10px] text-slate-400 font-medium px-1">
                  {formatTime(element.createdAt || new Date())}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default GroupMessages;
