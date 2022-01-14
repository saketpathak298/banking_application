const createAccountmodel =require('../modules/createaccount')
const nodemailer = require('nodemailer');



const forgetCntrl = {}

forgetCntrl.forgetPassword = async (req,res)=>{
    try{
        const id=req.query.id
        const name = req.body.name
       await createAccountmodel.findByIdAndUpdate(id,name).then((response)=>{
            // if(!response){
            //     res.status(404).send({
            //      lastname: "name not found with id " + req.query._id,
            //     })
            // }
            res.status(200).send({
                success:true,
                data:response
            })
        }).catch((err)=>{
            res.status(500).send({
                success:false,
                msg:"something went wrong",
                error:err
            })
        })
        //  send email verification  to the user email
    
        // const MailID = await ejs.renderFile(process.env.SENDGRID_EMAIL)
        // const mail = {
        // from:MailID,
        // to:email,
        // subject:'Password forget link',
        // html:`<h2>please click on link to reset your password<h2>`
        // }


    }catch(err){
    res.status(500).send({
    success:false,
    msg:"something went wrong"
    })
    }
}
// get all accounts
forgetCntrl.getAllAccounts=async (req,res)=>{
    try{
        await createAccountmodel.find().then((response)=>{
            res.status(200).send({
                success:true,
                data:response
            })
            }).catch((err)=>{
                res.status(500).send({
                    success:false,
                    msg:'something went wrong',
                    err:error
                })
            })
    }catch(err){
        res.status(500).send({
            success:false,
            msg:'something went wrong',
            err:error
        })
    }
  
}

module.exports=forgetCntrl