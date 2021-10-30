const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");



//Creating course
exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      user: req.session.userID
    });
    res.status(201).redirect('/courses');
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

//Course List
exports.getAllCourses = async (req, res) => {
  try {
    const categorySlug = req.query.categories;
    const category = await Category.findOne({slug: categorySlug});
    let filter = {};
    if(categorySlug) {
      filter = {category: category._id}
    }

    const courses = await Course.find(filter).sort('-createdAt');
    const categories = await Category.find();
    res.status(200).render('courses', {
      courses,
      categories,
      page_name: 'courses',
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

//Single Course
exports.getCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    const course = await Course.findOne({slug: req.params.slug}).populate('user');
    const categories = await Category.find();
    res.status(200).render('course', {
      course,
      page_name: 'courses',
      categories,
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

//Enroll Course
exports.enrollCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    await user.courses.push({_id:req.body.course_id});
    await user.save();
    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

//Release Course
exports.releaseCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    await user.courses.pull({_id:req.body.course_id});
    await user.save();
    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
