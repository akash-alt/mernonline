const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

// module.exports = mongoose.model("User",userSchema);

//* hashing password to secure
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  next();
});

//* generate token

userSchema.method.generateToken = async function (req, res) {
  try {
    let generatedtToken = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    this.tokens = this.tokens.concat({ token: generatedtToken });
    await this.save();
    res.status(201).json({ msg: "have done!" });
    return generatedtToken;
  } catch (error) {
    console.log(error);
    req.status(201).json({ msg: "user already exist!" });
  }
};

const Users = new mongoose.model("USER", userSchema);
module.exports = Users;
