const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const messageSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
            
        },
        message:{
            type:String,
            required:true
        }
},{timestamps:true})

const Message = new mongoose.model("MESSAGE",messageSchema);
module.exports = Message;