const amountModel = require('../modules/amount');
const createAccountModel = require('../modules/createaccount');
const amountCntrl = {}
const sgMail = require('nodemailer');

amountCntrl.depositAmount =async (req,res)=>{
    try{
        const {accountno,amount}=req.body

        // check entered account number exits or not
        const isAccountExit = await createAccountModel.findOne({accountno})
         if(!isAccountExit){
                res.status(204).send("Account no does not exits")
         }
        
         // find total amount available
         const amountAvailable = await amountModel.find({amount})
         const amountvalue =[]
         amountAvailable.forEach((element)=>{
            amountvalue.push(element.amount)
         })
         
         totalAmount=Number(amountvalue)+Number(amount)
        // create amount
        const createAmount = new amountModel({
            accountno,
            amount:totalAmount
        })
        // save deposited amount
        createAmount.save().then((response)=>{
         res.status(200).send({
             success:true,
             msg:"amount deposited successfully",
             data:response
         })
        }).catch((err)=>{
            res.status(500).send({
                success:false,
                msg:"something went wrong",
                error:err
            })
        })
    //     const mailOptions = {
    //         from: process.env.SENDGRID_EMAIL, // sender address
    //         to: req.body.email.toLowerCase(), // list of receivers
    //         subject: 'amount deposited successfully', // Subject line
    //         html: "<b>deposit</b>",
            
    //       };
    //            // send mail with sendgrid
    //   sgMail.send(mailOptions, (error, info) => {
    //     if (error) {
    //       return console.log(error);
    //     }
    //   });

    }catch(err){
    res.status(500).send({
        success:false,
        msg:'something went wrong',
        error:err
    })
    }
   
}

// withdraw amount api
amountCntrl.withdraw = async (req,res)=>{
 const {amount}=req.body
 // check entered amount 
 const checkBalance = await amountModel.findOne({amount})
  if(checkBalance<amount){
   res.send("insufficient balance")
   }
}

module.exports=amountCntrl