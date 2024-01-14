const express = require('express');
const { body } = require('express-validator');
const authMiddleware = require('../../middleware/authMiddleware');
const { fetchMessages, sendMessage, setMessageSeen, fetchMessageHistory } = require('../../controllers/v1/message.controller');

const messageRouter = express.Router();

/**
 * Route to fetch messages.
 * @name GET /messages
 * @function
 * @memberof module:routes/message~messageRouter
 * @param {string} path - Express route path
 * @param {callback} middleware - Express middleware.
 */
messageRouter.get(
    '/messages',
    authMiddleware,
    fetchMessages
);

/**
 * Route to send a message.
 * @name POST /messages/send
 * @function
 * @memberof module:routes/message~messageRouter
 * @param {string} path - Express route path
 * @param {callback} middleware - Express middleware.
 */
messageRouter.post(
    '/messages/send',
    [
        authMiddleware, // Authentication middleware
        body('recipientId', 'Recipient user ID is required').notEmpty(),
        body('content', 'Message content is required').notEmpty(),
    ],
    sendMessage
);

/**
 * Route to set a message as seen.
 * @name PUT /messages/:messageId/seen
 * @function
 * @memberof module:routes/message~messageRouter
 * @param {string} path - Express route path
 * @param {callback} middleware - Express middleware.
 */
messageRouter.put(
    '/messages/:messageId/seen', 
    authMiddleware, 
    setMessageSeen
);

/**
 * Route to set a message as seen.
 * @name GET /messages/:messageId/seen
 * @function
 * @memberof module:routes/message~messageRouter
 * @param {string} path - Express route path
 * @param {callback} middleware - Express middleware.
 */
messageRouter.get(
    '/messages/:messageId', 
    authMiddleware, 
    fetchMessageHistory
);


module.exports = messageRouter;
