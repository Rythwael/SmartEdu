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
    role: {
        type: String,
        enum:["Student", "Teacher", "Admin"],
        default: "Student",
    },
    courses:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    }]

});

UserSchema.pre('save', function (next){ //before creating in database
    const user = this;
    bcrypt.hash(user.password, 10, (error,hash) => {
        user.password = hash; //encrypt the password.
        next();
    })
})

const User = mongoose.model('User', UserSchema); // Course model created.
module.exports = User;