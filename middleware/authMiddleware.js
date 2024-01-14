const jwt = require('jsonwebtoken');
const User = require('../models/user');

/**
 * Middleware to authenticate and authorize users.
 * @function
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 * @throws {Error} If authentication fails or the user is not authorized
 */
const authMiddleware = async (req, res, next) => {
    try {
        // Get the token from the request header
        const token = req.header('Authorization');

        if (!token) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        let extractedToken = token.split(" ")[1]
        const decoded = jwt.verify(extractedToken, process.env.JWT_SECRET);

        // Find the user by ID from the token
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        // Attach the user object to the request for further use
        req.user = user;

        // Continue to the next middleware
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = authMiddleware;
