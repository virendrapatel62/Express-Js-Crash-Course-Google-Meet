const createConnection = () => {
  const mongoose = require("mongoose");

  return mongoose.connect("mongodb://localhost:27017/express-crash-course", {
    useNewUrlParser: true,
  });
};

module.exports = createConnection;
