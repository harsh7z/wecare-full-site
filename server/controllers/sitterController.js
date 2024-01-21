const Sitter = require('../model/sitterModel')
const bcrypt = require('bcrypt')
const sitterModel = require('../model/sitterModel')
const JWT = require('jsonwebtoken')
const sitterRegister = async(req,res) =>{
    const email = req.body.email

    try{
        const existingSitter = await sitterModel.findOne({email})
        if(existingSitter){
            return res
            .status(200)
            .send({message:"Sitter already registerd" ,success: false})
        }
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        req.body.password = hashedPassword
        const newSitter = Sitter(req.body)
        await newSitter.save()
        res.status(201).send({message:'Registerd successfully' ,success:true})
    
    }catch(error){
        console.log(error)
    }
}

const sitterLogin = async(req,res) => {
    try{
        const sitter = await sitterModel.findOne({email:req.body.email})
        if(!sitter){
            return res.status(200).send({message: 'sitter not found', success:false})
        }
        const isMatch = await bcrypt.compare(req.body.password,sitter.password)
        if(!isMatch){
            return res.status(200).send({message: 'Invalid password',success:false})
        }

        const sitterToken = JWT.sign({id:sitter._id},process.env.JWT_SECRET,{expiresIn: '1d'})
        return res.status(200).send({message: 'Logged in successfully',success:true,sitterToken})
    }catch(error){
        console.log(error)
    }
}

const getAllSitter = async(req,res) => {
    let sitters 
    try {
        sitters = await Sitter.find() ;
    } catch (err) {
        console. log(err);
    }
        
    if (!sitters) {
        return res.status(404).json ({ message: "No sitters found" }) ;
    }
    return res.status(200).json ({ sitters }) ;
}

const getSitter = async (req,res) => {

    const id = req.params.id
    let sitter
    try{
        sitter = await Sitter.findById(id)
    }catch(err){
        console.log(err)
    }

    if (!sitter) {
        return res.status(404).json ({ message: "No sitter found" }) ;
    }
    return res.status(200).json ({ sitter }) ;

}
const authSitterController = async(req,res) => {
    try {
        const sitter = await sitterModel.findById({_id:req.body.sitterId})
        sitter.password = undefined
        if(!sitter){
            return res.status(200).send({
                message:'sitter not found',
                success:false
            })
        }
        else{
            res.status(200).send({
                success:true,
                data:sitter
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

exports.sitterRegister = sitterRegister
exports.sitterLogin = sitterLogin
exports.authSitterController = authSitterController
exports.getAllSitter = getAllSitter
exports.getSitter = getSitter