
const authRouter = require('express').Router();


authRouter.post("/register", (req,res) =>{
    res.send("this is register")
})

authRouter.post("/signin", (req,res) =>{
    res.send("this is signin")
})

module.exports = authRouter;