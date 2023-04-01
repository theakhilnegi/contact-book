const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

app.use(cors());

const PORT = 5000;
mongoose.set("strictQuery", true);
mongoose.connect(process.env.REACT_APP_API_KEY, (err) => {
  if (!err) {
    console.log("Connected to database");
  } else {
    console.log(err);
  }
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const UserSchema = new mongoose.Schema({
  username: String,
  name: String,
  email: String,
  phone: String,
  website: String,
  address: {
    street: String,
    suite: String,
    city: String,
    zipcode: String,
    geo: {
      lat: String,
      lng: String,
    },
  },
  company: {
    name: String,
    catchPhrase: String,
    bs: String,
  },
});

const user = mongoose.model("User", UserSchema);

//Create User
app.post("/api/user", (req, res) => {
  const { name, email, phone, website } = req.body;
  let username = name.split(" ").join("");
  var userAdd = new user({
    name: name,
    email: email,
    phone: phone,
    website: website,
    username: username,
  });

  userAdd.save((err, userpost) => {
    if (err) {
      res.status(500).json({
        err,
      });
    } else {
      res.status(201).json({
        message: "User has been created",
        userpost,
      });
    }
  });
});

//View Users
app.get("/api/user", (req, res) => {
  user.find({}, (err, getuser) => {
    if (err) {
      res.status(500).json({
        err,
      });
    } else {
      res.status(200).json({
        getuser,
      });
    }
  });
});

//Update Single User
app.patch("/api/user/:user_id", (req, res) => {
  const { user_id } = req.params;

  const { name, email, phone, website } = req.body;

  user.findByIdAndUpdate(
    user_id,
    {
      name: name,
      email: email,
      phone: phone,
      website: website,
    },
    (err, patchuser) => {
      if (err) {
        res.status(500).json({
          err,
        });
      } else {
        res.status(200).json({
          message: "user updated",
          patchuser,
        });
      }
    }
  );
});

//Remove Single User
app.delete("/api/user/:user_id", (req, res) => {
  const { user_id } = req.params;

  user.findByIdAndDelete(user_id, (err, deleteuser) => {
    if (err) {
      res.status(500).json({
        err,
      });
    } else {
      res.status(200).json({
        message: "user has been removed",
        deleteuser,
      });
    }
  });
});

app.listen(PORT, () => {
  console.log("Server listening on " + PORT);
});
