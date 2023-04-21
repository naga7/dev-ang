const user_model = require("../../database/models/user.model")
const helper =require("../helpr")


class user{/////////////////////all user///////////////////////////////
        static all = async(req,res)=>{
                try{
                    const userData = await user_model.find()
                    helper.resHandler(res, 200, true, userData, "users featched")
                }
                catch(e){
                    helper.resHandler(res, 500, false, e.message, "Error featch data")
                }
            }
   //==========================single user=============================
        static single = async(req,res)=>{
            try{
                const userData = await user_model.findById(req.params.id)
                console.log(userData)
                helper.resHandler(res, 200, true, userData, "users featched")
            }
            catch(e){
                helper.resHandler(res, 500, false, e.message, "Error featch data")
            }
        }
        //================================register===============================
static register = async (req,res)=>{
        try {
                const user_data = new user_model(req.body)
                await user_data.save()
            //    res.status(404).send({ apiStatus: true, data:user_data, message:"successfull url" })
               helper.resHandler(res, 200, true, user_data, "register is successfull")
        }catch(e){
               helper.resHandler(res,500,false,e,"register is fail")
         //   res.status(404).send({ apiStatus: false, data:null, message:"invalid url" })
        }

}
//================================delete account=====================
static delete_account = async (req,res)=>{
        try {
                const user_data = await user_model.findByIdAndDelete(req.params.id)
               
               helper.resHandler(res, 200, true, user_data, "delete account is successfull")
        }catch(e){
               helper.resHandler(res,500,false,e.massage,"delete account is fail")
        }

}
//===================================edite account ======================
static edit_account = async (req,res)=>{
        try {
                const user_data = await user_model.findById(req.params.id)
                console.log(user_data)
                for(let key in req.body){
                        user_data[key]=req.body[key]
                }
                await user_data.save()
               
               helper.resHandler(res, 200, true, user_data, "edit account is successfull")
        }catch(e){
               helper.resHandler(res,500,false,e.massage,"edit account is fail")
        }

}
//================================= login user account==================
static login_user = async(req, res)=>{
        try{
           const userData = await user_model.loginMe(req.body.email, req.body.password)
           const token = await userData.generateToken()
           helper.resHandler(res,200, true, {userData,token}, "done")
        }
        catch(e){
            helper.resHandler(res, 500, false, e, e.message)
        }
    }
    //===========================================img=============
    static updatePimg = async(req,res)=>{
        try{
            
            const ext = helper.fileHandler(req)
            req.user.image = `${process.env.APPUrl}${req.file.filename}.${ext}`
            await req.user.save()
            helper.resHandler(res, 200, true, req.user, "done")
        }
        catch(e){
            helper.resHandler(res, 500, false, e.message, "Error featch data")
        }
    }
    //=====================profile======================
    static userprofile= async (req,res)=>{
        try{ helper.resHandler(res,200,true,req.user,"fdxd")}
        catch(e){
            helper.resHandler(res,500,false,e,"errer on profile")

        }
    }
    /////////////////////log out ////////////////////////////
    static logOut = async(req,res)=>{
        try{
            req.user.tokens = req.user.tokens.filter(t => t.token != req.token )
            await req.user.save()
            helper.resHandler(res, 200, true, {}, "logged out")
        }
        catch(e){
            helper.resHandler(res, 500, false, e.message, "Error featch data")
        }
    }
    ///////////////////// log out all ////////////////////////////////////
    static logOutAll = async(req,res)=>{
        try{
            req.user.tokens = []
            await req.user.save()
            helper.resHandler(res, 200, true, req.user, "logged out all devices")
        }
        catch(e){
            helper.resHandler(res, 500, false, e.message, "Error featch data")
        }
    }
    ///////////////////////// update img////////////////////////
    static updatePimg = async(req,res)=>{
        try{
            // const fs = require("fs")
            // const ext = req.file.originalname.split(".").pop()
            // const newName = req.file.path+"."+ext
            // fs.renameSync(req.file.path, newName)
            const ext = helper.fileHandler(req)
            req.user.image = `${process.env.APPUrl}${req.file.filename}.${ext}`
            console.log(req.user.image)
            await req.user.save()
            helper.resHandler(res, 200, true, req.user, "done")
        }
        catch(e){
            helper.resHandler(res, 500, false, e.message, "Error featch data")
        }
    }
}
module.exports=user