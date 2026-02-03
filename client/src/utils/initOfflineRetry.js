// utils/initOfflineRetry.js

import { loadOfflineMessages, clearOfflineMessages } from "./offlineMessages.js";

export const initOfflineRetry = (socket, authUser) => {
  const handleOnline = () => {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("offlineMessages_")) {
        const chatId = key.split("_")[1];
        const messages = loadOfflineMessages(chatId);

        messages.forEach((msg) => {
          if (!authUser || msg.sender._id !== authUser._id) return;

          if (msg.isGroup) {
            socket.emit("send-group-message", { ...msg, localId: msg._id });
          } else {
            socket.emit("sendMessage", { receiverId: chatId, ...msg, localId: msg._id });
          }
        });

        clearOfflineMessages(chatId);
      }
    });
  };

  window.addEventListener("online", handleOnline);
  return () => window.removeEventListener("online", handleOnline);
};
