const Course = require("../models/Course");

//Creating course
exports.createCourse = async (req, res) => {
  const course = await Course.create(req.body);
  try {
    res.status(201).json({
      status: "Success",
      course,
    });
  } catch {
    res.status(400).json({
      status: "Bad Request!",
      error,
    });
  }
};
