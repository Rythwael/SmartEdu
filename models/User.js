const mongoose = require('mongoose'); // mongoose module added.
const bcrypt = require('bcrypt'); // mongoose module added.
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

UserSchema.pre('save', function (next){
    const user = this;
    bcrypt.hash(user.password, 10, (error,hash) => {
        user.password = hash;
        next();
    })
})

const User = mongoose.model('User', UserSchema); // Course model created.
module.exports = User;