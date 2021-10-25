const bcrypt = require('bcrypt'); // mongoose module added.
const User = require("../models/User");
const Category = require("../models/Category");


//Creating user
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).redirect('/login');
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

//Login user
exports.loginUser = (req, res) => {
  try {
    const {email,password} = req.body; //take email and password from request's body
    User.findOne({email}, (err,user) => { //if req.email = database's email, it will callback user
      if(user){ //if user exists
        bcrypt.compare(password, user.password, (err,same) => { //compare req.password and encrypted password
          if(same){ //if passwords are same
            // USER SESSION
            req.session.userID = user._id;
            res.status(200).redirect('/users/dashboard');
          }
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
  const user = await User.findOne({_id: req.session.userID});
  const categories = await Category.find();
  res.status(200).render("dashboard", {
    page_name: "dashboard",
    user,
    categories
  });
};
