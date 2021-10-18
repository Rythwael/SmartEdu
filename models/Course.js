const mongoose = require('mongoose'); // mongoose module added.
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    name: { 
        type: String, // Gonna be string.
        unique: true, // Gonna be unique(Courses can't have same name)
        required: true // Can't be empty.
    },
    description: { 
        type: String, // Gonna be string.
        required: true, // Can't be empty.
        trim: true // Delete spaces at the beginning and end.
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Course = mongoose.model('Course', CourseSchema); // Course model created.
module.exports = Course;