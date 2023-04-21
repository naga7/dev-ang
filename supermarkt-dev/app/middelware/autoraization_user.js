const userModel = require("../../database/models/user.model")
const helper = require("../helpr")
const { verify } = require("jsonwebtoken")
const auth = async (req, res, next) => {
        try {
                const token = req.header("Authorization").replace("Bearer ", "")
                const decodedToken = verify(token, process.env.JWTKEY)
                const userData = await userModel.findOne({ _id: decodedToken._id, "tokens.token": token })
               if(!userData) throw new Error ("unautho")
               req.user=userData
               req.token = token
               next()
               
         
        }
        catch (e) {
                helper.resHandler(res, 500, false, e.message, "unauthorize")
        }
        
}
module.exports = auth