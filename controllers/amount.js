const amountModel = require('../modules/amount');
const createAccountModel = require('../modules/createaccount');
const amountCntrl ={}

amountCntrl.depositAmount =async (req,res)=>{
    try{
        const {accountno,amount}=req.body

        // check entered account number exits or not
        const isAccountExit = await createAccountModel.findOne({accountno})
         if(!isAccountExit){
                res.status(204).send("Account no does not exits")
         }
        // create amount
        const createAmount = new amountModel({
            accountno,
            amount
        })
        // save deposited amount
        createAmount.save().then((response)=>{
         res.status(200).send({
             success:true,
             msg:"amount deposited successfully"
         })
        }).catch((err)=>{
            res.status(500).send({
                success:false,
                msg:"something went wrong",
                error:err
            })
        })
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