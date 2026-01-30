import mongoose from "mongoose";
import Message from "../models/Message.js";
import User from "../models/User.js";

export const handleChatEvents = async(socket, io) => {
  const userId = socket.userId;

  // 1. Join a private room based on their own User ID
  socket.join(userId);

  // --- SEND MESSAGE ---
  // socket.on("sendMessage", (data) => {
  //   const { receiverId, text, image } = data;
  //   // console.log(`Received message from ${userId} to ${receiverId}: ${text}`);
  //       if (sender.blockedUsers.includes(toUserId) || receiver.blockedUsers.includes(userId)) {
  //     socket.emit("message-blocked", { toUserId });
  //     return;
  //   }
  //   const messagePayload = {
  //     _id: Date.now().toString(), // Backend usually generates this via DB
  //     sender: userId,
  //     receiverId,
  //     text,
  //     image,
  //     createdAt: new Date(),
  //   };

  //   // Emit ONLY to the receiver's private room
  //   io.to(receiverId).emit("newMessage", messagePayload);
  // });


  socket.on("sendMessage", async (data) => {
  const { receiverId, text, image } = data;

  // Fetch sender and receiver from DB to check block status
  const sender = await User.findById(socket.userId);
  const receiver = await User.findById(receiverId);

  if (!sender || !receiver) {
    return socket.emit("error", { message: "User not found" });
  }




  // Build message payload
  const messagePayload = {
    _id: Date.now().toString(), // temp ID, ideally save to DB and use DB ID
  
    sender:{
_id:socket.userId,
profilePic:sender.profilePic,
fullName:sender.fullName,
    } ,
    reciver:receiverId,
    text: text || null,
    image: image || null,
    createdAt: new Date(),
  };




  


  // Emit message to receiver's r
    io.to(receiverId).emit("newMessage", messagePayload);

    // --- Optionally, emit back to sender as confirmation ---
    // socket.emit("newMessage", messagePayload); // ensures sender UI updates instantly
});



// socket.on("mark-as-read", async ({ senderId }) => {
// console.log(senderId)
//   await User.updateOne(
//     { _id: socket.userId, "chats.user": senderId },
//     { $set: { "chats.$.unreadCount": 0 } }
//   );
  
//   // console.log(u)
//     socket.emit("unread-reset", {
//     senderId
//   });
// });
socket.on("mark-as-read", async ({ senderId }) => {
  await User.updateOne(
    {
      _id: socket.userId,
      "chats.user": new mongoose.Types.ObjectId(senderId),
    },
    {
      $set: { "chats.$.unreadCount": 0 },
    }
  );

  socket.emit("unread-reset", { senderId });
});
  // --- TYPING INDICATORS ---
 socket.on("typing", ({ receiverId }) => {
  io.to(receiverId).emit("userTyping", {
    typingId: socket.userId,
  });
});

socket.on("stopTyping", ({ receiverId }) => {
  io.to(receiverId).emit("userStoppedTyping", {
    typingId: socket.userId,
  });
});





















  socket.on("disconnect", () => {
    socket.leave(userId);
  });
};