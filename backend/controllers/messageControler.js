import Message from "../models/Message.js";
import User from "../models/User.js";
import { io } from "../utils/socket.js";
import { uploadToCloudinary } from "../config/cloudinary.js";

// export const sendMessage = async (req, res) => {
//   try {
//     const { text, receiverId } = req.body;
//     if (!receiverId) return res.status(400).json({ message: "ReceiverId required" });

//     const receiver = await User.findById(receiverId);
//     if (!receiver) return res.status(404).json({ message: "Receiver not found" });

//     // Upload media
//     let mediaUrls = [];
//     if (req.files?.length) {
//       mediaUrls = await Promise.all(req.files.map(file => uploadToCloudinary(file.buffer)));
//     }

//     // Create message
//     let message = await Message.create({
//       sender: req.user._id,
//       receiver: receiverId,
//       text: text || "",
//       media: mediaUrls,
//     });

//     message = await message.populate("sender", "fullName profilePic"); // populate sender info

//     // Update receiver's chats
//     const chatIndex = receiver.chats.findIndex(c => c.user.toString() === req.user._id.toString());
//     if (chatIndex > -1) {
//       receiver.chats[chatIndex].lastMessage = text || (mediaUrls.length ? "Media" : "");
//       receiver.chats[chatIndex].lastMessageAt = new Date();
//       receiver.chats[chatIndex].unreadCount += 1;
//     } else {
//       receiver.chats.push({
//         user: req.user._id,
//         lastMessage: text || (mediaUrls.length ? "Media" : ""),
//         lastMessageAt: new Date(),
//         unreadCount: 1,
//       });
//     }
//     await receiver.save();

//     // 🔥 Emit message to both sender and receiver
//     if (io) {
//       let socketId = io;
//       console.log(socketId)
//       io.to(receiverId).emit("receive-message", message);
//       io.to(req.user._id.toString()).emit("receive-message", message);
//     }

//     res.status(201).json(message);
//   } catch (err) {
//     console.error("SendMessage Error:", err);
//     res.status(500).json({ message: err.message });
//   }
// };


export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { receiverId, text } = req.body;

    if (!receiverId || !text) {
      return res.status(400).json({ success: false, message: "Invalid data" });
    }

    // 1️⃣ Save message
    const message = await Message.create({
      sender: senderId,
      receiver: receiverId,
      text,
    });

    // 2️⃣ Update sender chat
    await User.updateOne(
      { _id: senderId, "chats.user": receiverId },
      {
        $set: {
          "chats.$.lastMessage": text,
          "chats.$.lastMessageAt": message.createdAt,
        },
      }
    );

    await User.updateOne(
      { _id: senderId, "chats.user": { $ne: receiverId } },
      {
        $push: {
          chats: {
            user: receiverId,
            lastMessage: text,
            lastMessageAt: message.createdAt,
            unreadCount: 0,
          },
        },
      }
    );

    // 3️⃣ Update receiver chat
    await User.updateOne(
      { _id: receiverId, "chats.user": senderId },
      {
        $set: {
          "chats.$.lastMessage": text,
          "chats.$.lastMessageAt": message.createdAt,
        },
        $inc: { "chats.$.unreadCount": 0 },
      }
    );

    await User.updateOne(
      { _id: receiverId, "chats.user": { $ne: senderId } },
      {
        $push: {
          chats: {
            user: senderId,
            lastMessage: text,
            lastMessageAt: message.createdAt,
            unreadCount: 1,
          },
        },
      }
    );

    return res.status(201).json({
      success: true,
      message: "Message sent",
      data: message,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};














export const getMessages = async (req, res) => {
  try {
    const { userId } = req.params;
    const myId = req.user._id;
        await User.updateOne(
      { _id: myId, "chats.user": userId },
      {
        $set: { "chats.$.unreadCount": 0 }
      }
    );

    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: userId },
        { sender: userId, receiver: req.user._id },
      ],
    }).sort({ createdAt: 1 }).populate("sender", "_id fullName profilePic");

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




export const getMyChats = async (req, res) => {
  try {
    const myId = req.user._id;
    // console.log(myId)

    const user = await User.findById(myId)
      .select("chats")
      .populate("chats.user", "fullName email profilePic online lastSeen")
      .lean();
    //  console.log(user)  

    const chats = user.chats
      .sort((a, b) => new Date(b.lastMessageAt) - new Date(a.lastMessageAt))
      .map(chat => ({
        user: chat.user,
        lastMessage: chat.lastMessage,
        lastMessageAt: chat.lastMessageAt,
        unreadCount: chat.unreadCount,
        online: chat.user.online,
        lastSeen: chat.user.lastSeen,
      }));

    res.status(200).json({ success: true, chats });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
