const express = require("express");
const app = express();

app.use(express.json());

function onSuccess() {
  console.log("Server is running on 3000 port");
}

app.listen(3000, onSuccess);

const courses = [
  { id: 1, title: "Express JS", author: "Virendra" },
  { id: 2, title: "Next", author: "Sandeep" },
  { id: 3, title: "Angular", author: "Harsh" },
  { id: 4, title: "Node Js", author: "justin" },
];

app.get("/api/courses", (request, response) => {
  response.json(courses);
});

app.post("/api/courses", (request, response) => {
  const title = request.body.title;

  if (!title) {
    return response.status(400).json({
      message: "title is required",
    });
  }
  const newCourse = {
    id: courses.length + 1,
    title: title,
  };
  courses.push(newCourse);
  response.status(201).json(newCourse);
});

app.put("/api/courses/:id", (request, response) => {
  //   const { title, author } = request.body;
  const data = request.body;
  const courseId = +request.params.id;
  const course = courses.find((course) => {
    return course.id === courseId;
  });
  if (course) {
    Object.assign(course, data);
    // course.title = title;
    // course.author = author;
    return response.status(201).json(course);
  }

  return response.status(404).json({
    message: "course not found",
    courseId: courseId,
  });
});

// app.get("/api", (request, response) => {
//   const message = {
//     message: "Internal server error",
//   };
//   response.status(500).json(message);
// });

// app.get("/api/students", (request, response) => {
//   response.json({
//     message: "Students Api",
//     status: "sucess",
//   });
// });

// app.all("/not-found", (request, response) => {
//   response.status(404).json({
//     message: "url not found",
//     status: 404,
//   });
// });
