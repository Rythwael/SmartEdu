const mongoose = require('mongoose'); // mongoose module added.
const slugify = require('slugify');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    name: { 
        type: String, // Gonna be string.
        unique: true, // Gonna be unique(Courses can't have same name)
        required: true, // Can't be empty.
    },
    description: { 
        type: String, // Gonna be string.
        required: true, // Can't be empty.
        trim: true, // Delete spaces at the beginning and end.
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    slug: {
        type: String,
        unique: true,
    }
});

CourseSchema.pre('validate', function(next){ //Conver course name from Xyz HZE AHE to xyz-hze-ahe
    this.slug = slugify(this.name, {
        lower:true,
        strict:true,
    })
    next();
})

const Course = mongoose.model('Course', CourseSchema); // Course model created.
module.exports = Course;