const mongoose = require('mongoose');

const contactsSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
    },
    message: {
        type: String,
        required: true,
    },
});

const Contact = mongoose.model('Contacts', contactsSchema);

module.exports = Contact;
