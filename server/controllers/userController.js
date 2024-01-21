const User = require('../model/userModel')
const Sitter = require('../model/sitterModel')
const Booking = require('../model/bookingModel')
const Otp = require('../model/otpModel')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const Razorpay = require("razorpay");
const crypto = require("crypto");

const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');

const userRegister = async(req,res) =>{
    const email = req.body.email

    try{
        const existingUser = await User.findOne({email})
        if(existingUser){   
            return res
            .status(200)
            .send({message:"User already registerd" ,success: false})
        }
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        req.body.password = hashedPassword
        const data = await Otp.find({email:req.body.email,code:req.body.otp})
        if(data.length === 0){
            res.status(201).send({message:'Invalid Otp' ,success:false})
        }
        else{
            let currentTime = new Date().getTime()
                let diff = data.expireIn - currentTime
                if(diff < 0){
                    res.status(201).send({message:'Otp expired' ,success:false})
                }
                else{
            const newUser = User(req.body)
            await newUser.save()
            res.status(201).send({message:'Registerd successfully' ,success:true})
                }
        }
    
    }catch(error){
        console.log(error)
    }
}

const userLogin = async(req,res) => {
    try{
        const user = await User.findOne({email:req.body.email})
        if(!user){
            return res.status(200).send({message: 'User not found', success:false})
        }
        const isMatch = await bcrypt.compare(req.body.password,user.password)
        if(!isMatch){
            return res.status(200).send({message: 'Invalid password',success:false})
        }

        const token = JWT.sign({id:user._id},process.env.JWT_SECRET,{expiresIn: '2d'})
        return res.status(200).send({message: 'Logged in successfully',success:true,token})
    }catch(error){
        console.log(error)
    }
}

const authController = async(req,res) => {
    try {
        const user = await User.findById({_id:req.body.userId})
        user.password = undefined
        if(!user){ 
            return res.status(200).send({
                message:'User not found',
                success:false
            })
        }
        else{
            res.status(200).send({
                success:true,
                data:user
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message:'Auth error',
            success:false,
            error
        })
    }
}

const sendEmail = async(req,res) => {
    const email = req.body.email
    try{
        const existingUser = await User.findOne({email})
        if(existingUser){   
            return res
            .status(200)
            .send({message:"User already registerd" ,success: false})
        }
        else{
            const otp = Math.floor((Math.random() * 10000 + 1))
            const otpCode = new Otp({
                email:email,
                code:otp,
                expireIn:new Date().getTime() + 300*1000 
            })
            await otpCode.save() 
            if(otpMailer (email,otp)){
                res.status(201).send({message:'Otp sent successfully on your E-mail Address' ,success:true})
            }
            else{
                res.status(201).send({message:'Something Went Wrong' ,success:false})
            }
        }
    }catch(error){
        console.log(error)
    }
}

const chnagePassword = async(req,res) => {
    const email = req.body.email

    try{
        const existingUser = await User.findOne({email})
        if(existingUser){   
            const password = req.body.password
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password,salt)
            req.body.password = hashedPassword
            const data = await Otp.find({email:req.body.email,code:req.body.otp})
            if(data.length === 0){
                res.status(201).send({message:'Invalid Otp' ,success:false})
            }
            else{
                let currentTime = new Date().getTime()
                    let diff = data.expireIn - currentTime
                    if(diff < 0){
                        res.status(201).send({message:'Otp expired' ,success:false})
                    }
                    else{
                        const user = await User.findOne({email})
                        user.password = req.body.password
                        user.save()
                
                res.status(201).send({message:'Password changed successfully' ,success:true})
                    }
            }
        }
        else{
            return res
            .status(200)
            .send({message:"Something went wrong!!" ,success: false})
        }
    
    }catch(error){
        console.log(error)
    }
}
const chnagePasswordEmail = async(req,res) => {
    const email = req.body.email
    try{
        const existingUser = await User.findOne({email})
        if(existingUser){   
            const otp = Math.floor((Math.random() * 10000 + 1))
            const otpCode = new Otp({
                email:email,
                code:otp,
                expireIn:new Date().getTime() + 300*1000 
            })
            await otpCode.save() 
            if(otpMailer (email,otp)){
                res.status(201).send({message:'Otp sent successfully on your E-mail Address' ,success:true})
            }
            else{
                res.status(201).send({message:'Something Went Wrong' ,success:false})
            }
        }
        else{
            return res
            .status(200)
            .send({message:"User Not found" ,success: false})
        }
    }catch(error){
        console.log(error)
    }
}
const bookSitter = async(req,res) => {
    try{
        const newBooking = new Booking(req.body);
        await newBooking.save();
        const user = await User.findOne({ _id: req.body.userId });
        const sitter = await Sitter.findOne({ _id: req.body.sitterId });
        user.bookings.push({
            type: `Your sitter booking is confirmed on ${req.body.date}`,
            message: `Name : ${sitter.name},E-mail : ${sitter.email}, Address : ${sitter.address},City : ${sitter.city},Phone:  ${sitter.phone}`,
        });
        await user.save();
        sitter.bookings.push({
            type: `New booking request from ${user.name} on ${req.body.date}`,
            message: `Name : ${user.name}, 
            E-mail : ${user.email},
            Address : ${user.address},
            City : ${user.city},
            Phone : ${user.phone}`,
          });
        await sitter.save();
        orderMailer(user.email,sitter.name,sitter.email,sitter.address,sitter.phone,req.body.date)
          res.status(200).send({
            success: true,
            message: "Booked succesfully",
          });
    }catch(error){
        res.status(500).send({
            success: false,
            error,
            message: "Error While Booking Appointment",
          });
    }
}

const otpMailer = async(email,otp) => {
    var transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    }));

    let mailOptions = {
        from: process.env.EMAIL,
        to: `${email}`,
        subject: 'Otp for WeCare',
        text: `${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return false;
        }
        return true
    });

}

const payment = async(req,res) => {
    const id = req.params.id
    const sitter = await Sitter.findById(id)
    try {
		const instance = new Razorpay({
			key_id: process.env.KEY_ID,
			key_secret: process.env.KEY_SECRET,
		});

		const options = {
			amount: parseInt(sitter.prices) * 100 ,
			currency: "INR",
			receipt: crypto.randomBytes(10).toString("hex"),
		};

		instance.orders.create(options, (error, order) => {
			if (error) {
				return res.status(500).json({ message: "Something Went Wrong!" });
			}
			res.status(200).json({ data: order });
		});
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
	}
}

const orderMailer = (useremail,name,email,address,phone,date) =>{
    var transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    }));

    let mailOptions = {
        from: process.env.EMAIL,
        to: `${useremail}`,
        subject: `WeCare : Sitter booking confirmed on ${date}`,
        text: `\nName : ${name}\n, 
                E-mail : ${email}\n,
                Address : ${address}\n,
                Phone : ${phone}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return false;
        }
        return true
    });
}

exports.userRegister = userRegister
exports.userLogin = userLogin
exports.authController = authController
exports.sendEmail = sendEmail
exports.bookSitter = bookSitter
exports.payment = payment
exports.chnagePasswordEmail = chnagePasswordEmail
exports.chnagePassword = chnagePassword