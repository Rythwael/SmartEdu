const mongoose = require('mongoose'); // mongoose module added.
const slugify = require('slugify');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: { 
        type: String, // Gonna be string.
        unique: true, // Gonna be unique
        required: true, // Can't be empty.
    },
    slug: {
        type: String,
        unique: true,
    }
});

CategorySchema.pre('validate', function(next){ //Conver course name from Xyz HZE AHE to xyz-hze-ahe
    this.slug = slugify(this.name, {
        lower:true,
        strict:true,
    })
    next();
})

const Category = mongoose.model('Category', CategorySchema); // Course model created.
module.exports = Category;