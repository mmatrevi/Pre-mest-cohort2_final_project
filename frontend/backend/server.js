const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4000;

//server listening for connections
app.listen(PORT, () => console.log(`server is running on port:${PORT}`));

mongoose.connect(
  process.env.MONGODB_ACCESS,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDB connection established");
  }
);

//set up routes
app.use("/users", require("./routes/userRouter"));
