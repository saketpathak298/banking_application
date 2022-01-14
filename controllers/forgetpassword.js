const createAccountmodel =require('../modules/createaccount')
const nodemailer = require('nodemailer');



const forgetCntrl = {}

forgetCntrl.forgetPassword = async (req,res)=>{
    try{
  
      const {email}=req.body
      // check email exits
      const isEmailExit=await createAccountmodel.findOne({email})
      if(isEmailExit){
        return res.status(409).send("email already exits")
      }
        // const password=req.query.password
        // await (await createAccountmodel.updateOne({password:password})).then((res)=>{
        //  res.status(200).send("password updated successfully!")
        // }).catch((err)=>{
        //     res.status(500).send({
        //         success:false,
        //         msg:"something went wrong",
        //         error:err
        //         })
        // })
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