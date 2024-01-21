const JWT = require('jsonwebtoken')

module.exports = async(req,res,next) => {
    try {
        let sitterToken = req.headers['authorization'].split(" ")[1]
        JWT.verify(sitterToken,process.env.JWT_SECRET,(error,decode) => {
        if(error){
            console.log(error)
            return res.status(200).send({
                message: "Auth Failed",
                success:false
            })
        }
        else{
            req.body.sitterId = decode.id
            next()
        }
    })
    } catch (error) {
        console.log(error)
        res.status(401).send({
            message: 'Auth Failed',
            success:false
        })   
    }
}