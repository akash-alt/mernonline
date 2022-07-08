
const mongoose = require('mongoose');

const crudSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
        },
    email:{
        type:String,
        required:true
    },
   
    mobile:{
        type:String,
        required:true
    },
    work:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    }

},{Timestamp:true})

const CrudOpr = new mongoose.model("CrudOpr",crudSchema); // it will not in object form
module.exports = CrudOpr;


//** Note ***//
// const CrudOpr = new mongoose.model("CrudOpr",crudSchema)
//**  what will define const value and also what will define in ...
//**  .. mongoose.model(" it will make file-name in mngoDb ") so here it has ("CrudOpr")
