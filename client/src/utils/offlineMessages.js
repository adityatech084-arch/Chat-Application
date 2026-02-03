import { addMessage, sendMessage } from "../features/chat/chatSlice";
import { addGroupMessage } from "../features/group/groupSlice";
import { getSocket } from "./socket";

// ---------------- LOCAL STORAGE ----------------

export const saveOfflineMessage = (message) => {
  if (!message) return;

  const key = "offlineMessages";
  const existing = localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key))
    : [];

  localStorage.setItem(key, JSON.stringify([...existing, message]));
};

export const loadOfflineMessages = () => {
  return JSON.parse(localStorage.getItem("offlineMessages") || "[]");
};

export const clearOfflineMessages = () => {
  localStorage.removeItem("offlineMessages");
};

// ---------------- SEND OFFLINE ----------------

export const sendOfflineMessages = (authUser, socket, dispatch) => {
  const offlinemsgs = JSON.parse(localStorage.getItem("offlineMessages") || "[]");
  if (!offlinemsgs.length) return;

  offlinemsgs.forEach((msg) => {
    console.log(msg)
    if (!authUser || msg.sender._id !== authUser._id) return;

    const isGroup = !!msg.groupId;
    // console.log(isGroup)

    if (isGroup) {
      socket.emit("send-group-message", {
        ...msg,
        localId: msg._id,
      });
      dispatch(addGroupMessage({ groupId: msg.groupId, message: msg }));
    } else {
        console.log("cll send message")
      socket.emit("sendMessage", {
        receiverId: msg.receiverId,
        text: msg.text,
        media: msg.attachments || [],
        localId: msg._id,
      });
      dispatch(addMessage(msg));
      dispatch(
        sendMessage({
          receiverId: msg.receiverId,
          text: msg.text,
          media: msg.attachments || [],
        })
      );
    }
  });

  // Clear offline messages after sending
  localStorage.removeItem("offlineMessages");
};


