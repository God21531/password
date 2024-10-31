const mongoose = require("mongoose");
const DB = `mongodb://localhost:27017/password`;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connection success.");
  })
  .catch((error) => {
    console.log(error);
  });
