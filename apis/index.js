const express=require('express');
const router=express.Router();
const userModel=require('../modules/commenters');
const { check, validationResult } = require('express-validator');


router.get('/',(req,res)=>{
    res.status(200).render('home',{title:'Manoj-Portfolio',msg:'Welcome to Home Page',value:'',err:''});
});

router.post('/',[check('email','Invalid Email id').isEmail(),check('phone','Invalid Phone number').isMobilePhone(),check('phone','Phone number should atleast 10 digits').isLength({min:10})],(req,res)=>{
    const errors = validationResult(req);
    let name=req.body.name;
    let email=req.body.email;
    let phone=req.body.phone;
    let subject=req.body.subject;
    let massage=req.body.massage;
    if(!errors.isEmpty()){
        res.render('home',{title:'Manoj-Portfolio-ErrorFound',msg:"Message couldn't sent",value:'run(10),',err:errors.mapped()});
    }else{
        var userDetails=new userModel({
            Name:name,
            Email:email,
            PhoneNo:'+91'+phone,
            Subject:subject,
            Massage:massage,
        });
        userDetails.save((err,data)=>{
        if(err) throw err;
        res.render('home',{title:"Manoj-Portfolio",msg:'Your Massage has Successfully sent',value:'run(10),',err:10});
        });
    }
});

module.exports=router;