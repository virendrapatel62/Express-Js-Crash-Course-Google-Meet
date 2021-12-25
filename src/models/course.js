const mongoose = require("mongoose");

// id , title , author
const courseSchema = new mongoose.Schema({
  title: String,
  author: String,
});

// table ->mongoose.Collection
// row -> document
const Course = mongoose.model("Course", courseSchema);

module.exports = Course;

// Course.create({
//   title: "Express Course",
//   author: "Virendra",
// })
//   .then((course) => {
//     console.log(course);
//   })
//   .catch((eror) => console.log(eror.message));
