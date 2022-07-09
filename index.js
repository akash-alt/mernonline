const express = require("express");
const app = express();
const mongodb = require("mongodb");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth.routes");
var cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// 
const cors = require("cors");
const Users = require("./model/User.model");
const Message = require("./model/Message.model");
const CrudOpr = require("./model/crud.model");
const crudRouter = require("./routes/crud.routes");

require("dotenv").config();
const uri = process.env.MERN_DB;

const PORT = process.env.PORT || 8080;

//* front-end connectivity
app.use(
  cors({
     //origin: ["http://localhost:3000"],
     optionsSuccessStatus: 200, // For legacy browser support
      methods: "GET,POST, PATCH,DELETE",
    origin: [`https://candid-crisp-0bfd48.netlify.app`],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


//* authrouter connectivity
app.use("/auth", authRouter);


//* crud operation
app.use("/api",crudRouter)

app.get("/", (req, res) => {
  res.send("checking server connectivity");
  console.log("Cookies: ", req.cookies);
});

//* registration
app.post("/register", async (req, res) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    console.log({
      username,
      email,
      password,
    });

    const createUser = new Users({
      username: username,
      email: email,
      password: password,
    });

    console.log(createUser);
    //* have save this value and will show all data here and have "saved"
    const created = await createUser.save();
    console.log(created);
    res.status(201).send("registerd");
  } catch (error) {
    console.log(error);
    res.status(201).json({ msg: "user already exist" });
  }
});

//** Login *//
app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await Users.findOne({ email: email });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      // have define this is in user schema
      if (isMatch) {
        const token = await user.generatedToken;

        //*
        res.cookie("jwt", token, {
          //*expires token in 24hrs
          expires: new Date(Date.now() + 86400000),
          httpOnly: true,
        });
        res
          .status(200)
          .json({ msg: "user has loggedIn,it is working properly!" });
      } else {
        res.status(400).json({ msg: "someting wrong! or Invalid credential" });
      }
    } else {
      res.status(400).json({ msg: "someting wrong! or Invalid credential" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
});


//* message
app.post("/message", async (req, res) => {
    try {
      const name = req.body.name;
      const email = req.body.email;
      const message = req.body.message;
  
      console.log({
        name,
        email,
        message,
      });
  
      const sendMessage = new Message({
        name: name,
        email: email,
        message: message,
      });
  
      console.log(sendMessage);
      //* have save this value and will show all data here and have "saved"
      const created = await sendMessage.save();
      console.log(created);
      res.status(201).send("msg has sent");
    } catch (error) {
      console.log(error);
     
    }
  });


  //* Logout  *//
  app.get("/logout",(req,res)=>{
        res.clearCookie("jwt",{path:"/"})
        res.status(200).json({msg:'user has logout successfully!'})
  })

  

app.listen(PORT, () => {
  console.log("server is running on:", PORT);
  //* connecting database
  mongoose.connect(
    "mongodb+srv://weenggs:weenggs@cluster0.kpitkrg.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    console.log("connection has established with mongoDB")
  );
});
