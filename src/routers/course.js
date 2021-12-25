const express = require("express");
const courseRouter = express.Router();
const Course = require("../models/course");

const bodyValidator = (request, response, next) => {
  const body = request.body;
  const title = body.title;
  if (!title) {
    return response.status(400).json({
      message: "title is required.",
      location: "middleware",
    });
  }
  next();
};

courseRouter.param("id", (request, response, next) => {
  const id = request.params.id;
  Course.findById(id)
    .then((course) => {
      console.log({ course });
      if (course) {
        request.course = course;
        return next();
      }
      return response.status(404).json({ message: "Not Found" });
    })
    .catch((error) => {
      console.log(error);
      response.json(error);
    });
});

courseRouter.get("/", (request, response) => {
  // fetch data from Databasse
  Course.find().then((courses) => response.json(courses));
});
// api/course/id --> get
courseRouter.get("/:id", (request, response) => {
  const course = request.course;
  return response.json(course);
});

courseRouter.post("/", bodyValidator, (request, response) => {
  const title = request.body.title;
  const author = request.body.author;
  const newCourse = {
    author: author,
    title: title,
  };

  Course.create(newCourse)
    .then((course) => response.status(201).json(course))
    .catch((error) => response.status(400).json({ message: error.message }));
});

courseRouter.put("/:id", bodyValidator, (request, response) => {
  //   const { title, author } = request.body;
  const data = request.body;
  const course = request.course;
  Course.findByIdAndUpdate(
    course.id,
    {
      $set: {
        title: data.title,
        author: data.author,
      },
    },
    {
      new: true,
    }
  ).then((course) => response.status(201).json(course));
});

courseRouter.delete("/:id", (request, response) => {
  const course = request.course;
  Course.findByIdAndDelete(course.id).then(() => response.status(204).send());
});

module.exports = courseRouter;
