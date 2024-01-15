const User = require('../../models/user');
const BlacklistedToken = require('../../models/blacklist');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const createUser = async (req, res) => {
    try {
        // Validate user input (e.g., username, email, password)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        const newUser = new User({ username, email, password: password });
        await newUser.save();

        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const login = async (req, res) => {
    try {
        // Validate user input (e.g., email, password)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'User does not exist!' });
        }

        // Compare the entered password with the stored hashed password
        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });
        user.password = "SERVER_SECRET"
        return res.status(200).json({ token, user, secret: "jndwfjn209329e032nd230nf02f-m3oiv2-2vn429ng4nf4u9fn2" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const resetPassword = async (req, res) => {
    // Implement reset password logic here
};

const adminResetPassword = async (req, res) => {
    try {
        // Ensure that the authenticated user is an admin (You should have a way to check this)
        const isAdmin = req.user.isAdmin; // Assuming you have an isAdmin property in your user model

        if (!isAdmin) {
            return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
        }

        // Validate user input (e.g., new password)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Check if the email matches "akibeulah@gmail.com"
        const userEmail = req.body.email;
        if (userEmail !== 'akibeulah@gmail.com') {
            return res.status(400).json({ message: 'Email does not match "akibeulah@gmail.com"' });
        }

        // Find the user by email
        const user = await User.findOne({ email: userEmail });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user's password
        const newPassword = req.body.newPassword;
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        // Save the updated user
        await user.save();

        return res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const logout = async (req, res) => {
    try {
        // Get the token from the request header
        const token = req.headers.authorization;

        // Blacklist the token
        const expiresAt = jwt.decode(token).exp;
        const blacklistedToken = new BlacklistedToken({ token, expiresAt });
        await blacklistedToken.save();

        return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const fetchUsers = async (req, res) => {
    try {
        User.find()
            .then((response) => {
                return res.status(200).json({ message: 'OK', data: response });
            })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    createUser,
    login,
    resetPassword,
    logout,
    adminResetPassword,
    fetchUsers
}