import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

const sendMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    console.log(req.body);
    const { message } = req.body;
    const senderId = req.user._id;

    if (!message) {
      return res.status(400).json({ error: "Message content is required" });
    }
    // Check if the conversation exists
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = new Conversation({
        participants: [senderId, receiverId],
        message: [],
      });
    }
    // Create a new message
    const newMessage = new Message({
      senderId,
      receiverId,
      content: message,
    });

    // Update the conversation with the new message
    if (!conversation.message.includes(newMessage._id)) {
      conversation.message.push(newMessage._id);
    }
    await conversation.save();
    await newMessage.save();

    return res.status(201).json({
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export { sendMessage };

export const getMessges = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;

    const senderId = req.user._id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("message");

    if (!conversation) {
      return res
        .status(200)
        .json({ message: "Conversation not found", data: [] });
    }

    res.status(200).json({
      message: "Messages retrieved successfully",
      data: conversation.message,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getConversationLists = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
