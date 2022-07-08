
const crudRouter = require('express').Router();
const CrudOpr = require('../model/crud.model');

//* POST method (add data)
crudRouter.post("/add",async(req,res)=>{
    //console.log(req.body)
    // res.send("this is crud")
    const {name,email,mobile,work,address,desc}  = req.body;

    if(!name,!email,!mobile,!work,!address,!desc){
        res.status(422).json("Please fill all details!")
    }

    try{
        const preUser = await CrudOpr.findOne({email:email})
        console.log(preUser)

        if(preUser){
            res.status(400).json({msg:'user already exist!'})
        }else{
            const addData = new CrudOpr({
                name,email,mobile,work,address,desc
            })
            await addData.save()
            res.status(201).json(addData)
            console.log(addData)
        }

    }catch(error){
        console.log(error)
        res.status(422).json({msg:'something went wrong!'})
    }
})

//* GET method
crudRouter.get("/get",async(req,res) =>{

    try{
        const userData = await CrudOpr.find()
        res.status(200).json(userData)
        console.log(userData)

    }catch(error){
        console.log(error)
        res.status(422).json({msg:'something wrong!'})
    }
})

//* GET Preview method or GET individual data
crudRouter.get("/getuser/:id", async(req,res) =>{

    try{
    // console.log(req.params)
    const {id} = req.params;
    const singldata = await CrudOpr.findById({_id:id})
    console.log(singldata)
    // res.status(201).json({msg: "data got successfully individually"}) // it will show msg in postman
    res.status(201).send(singldata) // it will return data in postman
    }catch(error){
        console.log(error)
        res.status(422).json({msg:'something wrong!'})
    }
})

//* Update method
crudRouter.patch("/updateuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const updateduser = await CrudOpr.findByIdAndUpdate(id,req.body,{
            new:true
        });

        console.log(updateduser);
        res.status(201).json(updateduser);

    } catch (error) {
        res.status(422).json(error);
    }
})

//* DELETE Method
crudRouter.delete("/deleteuser/:id", async(req,res) =>{

    try {
        const {id} = req.params;
        const deleteduser = await CrudOpr.findByIdAndDelete({_id:id});

        console.log(deleteduser);
        res.status(201).send(deleteduser);

    } catch (error) {
        res.status(422).send(error);
    }
})


module.exports = crudRouter;