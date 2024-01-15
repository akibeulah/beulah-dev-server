const Message = require('../../models/message');

// Controller function to fetch messages
const fetchMessages = async (req, res) => {
    try {
        const messages = await Message.aggregate([
            {
                $match: {
                    $or: [{ sender: req.user._id }, { recipient: req.user._id }]
                }
            },
            {
                $sort: {
                    createdAt: -1 // Sort by createdAt in descending order
                }
            },
            {
                $group: {
                    _id: {
                        sender: "$sender",
                        recipient: "$recipient"
                    },
                    latestMessage: { $first: "$$ROOT" }
                }
            },
            {
                $replaceRoot: { newRoot: "$latestMessage" }
            },
            {
                $lookup: {
                    from: "users", // Assuming you have a "users" collection
                    localField: "sender",
                    foreignField: "_id",
                    as: "senderDetails"
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "recipient",
                    foreignField: "_id",
                    as: "recipientDetails"
                }
            },
            {
                $unwind: "$senderDetails"
            },
            {
                $unwind: "$recipientDetails"
            },
            {
                $project: {
                    sender: {
                        _id: "$senderDetails._id",
                        username: "$senderDetails.username",
                        email: "$senderDetails.email"
                    },
                    recipient: {
                        _id: "$recipientDetails._id",
                        username: "$recipientDetails.username",
                        email: "$recipientDetails.email"
                    },
                    content: 1,
                    seen: 1,
                    createdAt: 1,
                    updatedAt: 1
                }
            }
        ]);

        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller function to send a message
const sendMessage = async (req, res) => {
    try {
        // Extract necessary information from the request
        const { recipientId, content } = req.body;

        // Implement your logic to send a message
        // For example, create a new Message document and save it to the database
        const newMessage = new Message({
            sender: req.user._id,
            recipient: recipientId,
            content,
        });
        await newMessage.save();

        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const setMessageSeen = async (req, res) => {
    try {
        // Extract necessary information from the request
        const messageId = req.params.messageId; // Assuming messageId is part of the route path

        // Find the message by ID
        const message = await Message.findById(messageId);

        // Check if the message exists
        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }

        // Check if the authenticated user is the recipient of the message
        if (message.recipient.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Unauthorized: Only the recipient can mark the message as seen' });
        }

        // Update the seen property
        message.seen = true;
        await message.save();

        res.status(200).json({ message: 'Message marked as seen successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const fetchMessageHistory = async (req, res) => {
    try {
        const recipientId = req.params.recipientId;
        console.log(recipientId)
        console.log(req.user._id)

        const messages = await Message.find({
            $or: [
                { sender: req.user._id, recipient: recipientId },
                { sender: recipientId, recipient: req.user._id }
            ]
        })
            .populate('sender', 'username email')
            .populate('recipient', 'username email')
            .exec();

        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    fetchMessages,
    sendMessage,
    setMessageSeen,
    fetchMessageHistory
}
