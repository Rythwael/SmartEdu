const bcrypt = require('bcrypt'); // mongoose module added.
const User = require("../models/User");
const Category = require("../models/Category");
const Course = require("../models/Course");
const { validationResult } = require('express-validator');

//Creating user
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).redirect('/login');
  } catch (error) {
    const errors = validationResult(req);
    for (let i=0; i < errors.array().length; i++) {
      req.flash("error", `${errors.array()[i].msg}`);
    }
    res.status(400).redirect('/register');
  }
};

//Login user
exports.loginUser = (req, res) => {
  try {
    const {email,password} = req.body; //take email and password from request's body
    User.findOne({email}, (err,user) => { //if req.email = database's email, it will callback user
      if(user){ //if user exists
        bcrypt.compare(password, user.password, (err,same) => { //compare req.password and encrypted password
            // USER SESSION
            req.session.userID = user._id;
            res.status(200).redirect('/users/dashboard');
        })
      }
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

//Log out
exports.logOutUser = (req,res) => {
  req.session.destroy(() => {
    res.redirect('/');
  })
};

// Dashboard Page
exports.getDashboardPage = async (req, res) => {
  const user = await User.findOne({_id: req.session.userID}).populate('courses');
  const categories = await Category.find();
  const courses = await Course.find({user:req.session.userID});
  res.status(200).render("dashboard", {
    page_name: "dashboard",
    user,
    categories,
    courses
  });
};
