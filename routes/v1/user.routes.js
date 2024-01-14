const express = require('express');
const { body } = require('express-validator');
const { createUser, login, adminResetPassword, logout } = require('../../controllers/v1/user.controller');
const authMiddleware = require('../../middleware/authMiddleware');

/**
 * User Routes
 * @module routes/user
 */

/**
 * Express router to mount user related functions.
 * @type {object}
 * @const
 * @namespace userRouter
 */
const userRouter = express.Router();

/**
 * Route to create a new user.
 * @name POST /user
 * @function
 * @memberof module:routes/user~userRouter
 * @param {string} path - Express route path
 * @param {callback} middleware - Express middleware.
 */
userRouter.post(
    '/user',
    [
        body('username', 'Username is required').notEmpty(),
        body('email', 'Valid email is required').isEmail(),
        body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    ],
    createUser
);

/**
 * Route for user login.
 * @name POST /user/login
 * @function
 * @memberof module:routes/user~userRouter
 * @param {string} path - Express route path
 * @param {callback} middleware - Express middleware.
 */
userRouter.post(
    '/user/login',
    [
        body('email', 'Valid email is required').isEmail(),
        body('password', 'Password is required').notEmpty(),
    ],
    login
);

/**
 * Route for admin to reset a user's password.
 * @name PUT /user/reset-password
 * @function
 * @memberof module:routes/user~userRouter
 * @param {string} path - Express route path
 * @param {callback} middleware - Express middleware.
 */
userRouter.put(
    '/user/reset-password',
    [
        authMiddleware, // Authentication middleware (admin)
        body('email', 'Valid email is required').isEmail(),
        body('newPassword', 'Password must be at least 6 characters').isLength({ min: 6 }),
    ],
    adminResetPassword
);

/**
 * Route to log out a user.
 * @name POST /user/logout
 * @function
 * @memberof module:routes/user~userRouter
 * @param {string} path - Express route path
 * @param {callback} middleware - Express middleware.
 */
userRouter.post('/user/logout', authMiddleware, logout);

module.exports = userRouter;
