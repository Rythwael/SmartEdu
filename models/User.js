const mongoose = require('mongoose'); // mongoose module added.
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { 
        type: String, // Gonna be string.
        required: true, // Can't be empty.
    },
    email: { 
        type: String, // Gonna be string.
        required: true, // Can't be empty.
        unique:true,
    },
    password: {
        type: String,
        required:true,
    },
});

const User = mongoose.model('User', UserSchema); // Course model created.
module.exports = User;