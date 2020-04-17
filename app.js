require('dotenv').config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const app = express();

// Database connection code

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology : true,
  useCreateIndex: true
})
.then(() => {
  console.log(`DB IS CONNECTED!`)
})
.catch((e) => {
  console.log("NOT CONNECTED!")
})

const port = process.env.PORT || 8000;

// Using middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors())


app.listen(port, () => {
  console.log(`App is running at ${port}`);
});
