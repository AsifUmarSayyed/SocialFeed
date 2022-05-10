const router = require("express").Router();
const bcrypt=require('bcryptjs')
const User = require('../model/user.js');
const {userValidation,loginValidation,passValidation}=require('../validation');
const jwt=require("jsonwebtoken")
const verify=require("./verify")


const imgUpload=require("../imgUpload")

router.post('/googleuser',async (req, res) => {
    // const {error}=userValidation(req.body);
    // if(error) 

    // return  res.json({
    //     success:false,
    //     message: error.details[0].message,
       
    // })

    const salt= await bcrypt.genSalt(10)
const hashedPassword= await bcrypt.hash(req.body.password,salt)
    
        const user = new User({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            password:hashedPassword,
           
            
        });
    
        try {
    
            await user.save();
            // res.json({success:true,
            //     message:"user Inserted successfully", user:req.user,
            //     users})
            return res.send({success:true,
                message:"Users Inserted successfully", user:req.user,
                user})
            
    
    
        } catch (err) {
    
            return res.status(400).send(err)
    
        }
 
    
    })

router.post('/',async (req, res) => {
    const {error}=userValidation(req.body);
    if(error) 

    return  res.json({
        success:false,
        message: error.details[0].message,
       
    })

 
    const userExist= await User.findOne({email:req.body.email})
    if(userExist) return     res.json({
        success:false,
        message: "User Already Exist",
       
    })
  

    const salt= await bcrypt.genSalt(10)
const hashedPassword= await bcrypt.hash(req.body.password,salt)
    
        const user = new User({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            password:hashedPassword,
           
            
        });
    
        try {
    
            await user.save();
            // res.json({success:true,
            //     message:"user Inserted successfully", user:req.user,
            //     users})
            return res.send({success:true,
                message:"Users Inserted successfully", user:req.user,
                user})
            
    
    
        } catch (err) {
    
            return res.status(400).send(err)
    
        }
 
    
    })

    router.post('/login',async (req, res) => {
        const {error}=loginValidation(req.body);
        if(error)  return  res.json({
            success:false,
            message: error.details[0].message,
           
        })
    
        const user= await User.findOne({email:req.body.email})
        if(!user) return  res.status(400).send("user not Found") 

        const passwordExist= await bcrypt.compare(req.body.password, user.password)
        if(!passwordExist) return  res.status(400).send("Password not Exist!!!")
     
                    
        
   //const token= jwt.sign({exp: Math.floor(Date.now() / 1000) + (60*60),_id:user._id},process.env.TOKEN_SECRET)
const token= jwt.sign({_id:user._id},process.env.TOKEN_SECRET,{ expiresIn:"24hr"})
res.setHeader("auth-token", token)
        
               
                return res.send({success:true,
                    message:"Users Login successfully", user:req.user,
                    user,
                    token})
                
        
        
          
     
        
        })

router.get('/',verify,async (req, res) => {

let {page,size}=req.query
if(!page){
    page=1
}
if(!size){
    size=10
}
const limit=parseInt(size)
const skip=(page-1)*size



   await User.find().limit(limit).skip(skip)
    
    .then(users=> {return res.json({success:true,
        message:"Users retrived successfully",
        users})}).catch(error=>res.status(400).json(error))
    
  
        })
router.get('/:id',verify,async (req, res) => {
            await User.findOne({_id : req.params.id})
             
             .then(users=> {return res.json({success:true,
                 message:"Users retrived successfully",
                 users})}).catch(error=>res.status(400).json(error))
             
           
                 })



 router.post('/upload',async (req, res) => {
    
                    if(req.file)
                    return  res.status(200).send({
                        success:true,
                        message:req.file}) 
                        else{
                            return  res.status(400).send({
                                success:false,
                                message:"something went wrong "}) 
                            
                        }
                
                });
                

    
router.put('/:id',verify,imgUpload, async (req, res,next) => { 
    console.log(req.params.id);
      
            // const {error}=userValidation(req.body);
            // if(error) 
            //     return  res.json({
            //     success:false,
            //     message: error.details[0].message,
               
            // })

          

            User.findOneAndUpdate({_id : req.params.id},
                
                {
                    $set:{
                        firstName:req.body.firstName,
                        lastName:req.body.lastName,
                        photo:req.file.path,
                        name:req.body.name,
                        bio:req.body.bio,
                        gender:req.body.gender,
                        dob:req.body.dob,
                        email:req.body.email,
                        mobile:req.body.mobile
                       

             
                    }
                }
                ,{new:true})
                .then(user=> {
                   return res.json({success:true,
                        message:"Updated successfully", user:req.user,
                        user})
                }).catch(error=>{
                   return  res.json({
                        success:false,
                        message: "fail to update",
                       
                    })
                   })
            //res.send("PUT Request Called")
})

router.put('/noPic/:id',verify, async (req, res,next) => { 
    console.log(req.params.id);
      
            // const {error}=userValidation(req.body);
            // if(error) 
            //     return  res.json({
            //     success:false,
            //     message: error.details[0].message,
               
            // })

          

            User.findOneAndUpdate({_id : req.params.id},
                
                {
                    $set:{
                        firstName:req.body.firstName,
                        lastName:req.body.lastName,
                        name:req.body.name,
                        bio:req.body.bio,
                        gender:req.body.gender,
                        dob:req.body.dob,
                        email:req.body.email,
                        mobile:req.body.mobile
                       

             
                    }
                }
                ,{new:true})
                .then(user=> {
                   return res.json({success:true,
                        message:"Updated successfully", user:req.user,
                        user})
                }).catch(error=>{
                   return  res.json({
                        success:false,
                        message: "fail to update",
                       
                    })
                   })
            //res.send("PUT Request Called")
})





router.put('/change/:id',verify, async (req, res,next) => { 
    console.log(req.params.id);

    const {error}=passValidation(req.body);
            if(error) 
                return  res.json({
                success:false,
                message: error.details[0].message,
               
            })

    const user= await User.findOne({_id:req.params.id})
    if(!user) return  res.status(400).send("user not Found") 

    const passwordExist= await bcrypt.compare(req.body.password, user.password)
    if(!passwordExist) return  res.status(400).send("Password not Exist!!!")

    const salt= await bcrypt.genSalt(10)
    const hashedPassword= await bcrypt.hash(req.body.newPassword,salt)
      
            // const {error}=userValidation(req.body);
            // if(error) 
            //     return  res.json({
            //     success:false,
            //     message: error.details[0].message,
               
            // })


            User.findOneAndUpdate({_id : req.params.id},
                
                {
                    $set:{
                        
                        password:hashedPassword
                       

             
                    }
                }
                ,{new:true})
                .then(user=> {
                   return res.json({success:true,
                        message:"Updated successfully", user:req.user,
                        user})
                }).catch(error=>{
                   return  res.json({
                        success:false,
                        message: "fail to update",
                       
                    })
                   })
            //res.send("PUT Request Called")
})


router.delete('/:id',verify,async (req, res) => {

    const user=await User.findOne({_id: req.params.id});
    if(!user)   return  res.json({
        success:false,
        message:"User Not Exist!!!",
       
    })


            await User.remove({_id:req.params.id}).then(users=> res.json({success:true,
                message:"Users deleted successfully", user:req.user,
                users})).catch(error=>res.json({success:false,
                    message:"Users deleted successfully", user:req.user,
                    users}))
                
                })
    
module.exports = router;