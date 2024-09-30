const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const router = express.Router();
const bcrypt  = require('bcrypt')
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'shhhhhh';
var fetchuser = require('../middleware/fetchuser');

// /api/auth/createuser
router.post('/createuser',[
    body('name').isLength({min:3}),
    body('email').isEmail(),
    body('password').isLength({min:4}),
    body('password').isInt()
],async (req,res)=>{
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Email with this user exits" });
        }

        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }
        const salt = 10;
        const psw  = await bcrypt.hash(req.body.password.toString(),salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: psw
        })
        const data = {
            user:{
                id : user.id 
            }
        }
        const jwtData = jwt.sign(data,JWT_SECRET);
        //console.log(jwtData);
        res.json({jwtData});
        //res.json({ user });
    } catch (error) {
        console.log(error.message);
    }
});

//login endpoint

router.post('/login',[
    body('email').isEmail(),
    //body('password').isLength({min:4}),
    //body('password').isInt()
],async(req,res)=>{
    try{
        const result = validationResult(req);
        if(!result.isEmpty())
            return res.status(500).json({errors:'Please fill details properly'});
        
        let {email,password} = req.body;
        //console.log(email+" "+password);

        let user = await User.findOne({email});
        //console.log(user);
        if(!user)
            return res.status(500).json({errors:'User doesnt exists'});

        let checkPsw = await bcrypt.compare(password.toString(),user.password);
 
        if(!checkPsw)
            return res.status(500).json({errors:'Invalid Password'});

        const data = {
            user:{
                id: user.id
            }
        }
    
        let authtoken = jwt.sign(data,JWT_SECRET);
        res.json({authtoken});
    }catch(error){
        console.log(error.message);
    }   

})

router.post('/getuser',fetchuser,async (req,res)=>{
    try{
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.json({user});
    }catch(error){
        console.log(error.message);
        res.status(401).send({error:'Internal server error'});
    }
})



module.exports = router;