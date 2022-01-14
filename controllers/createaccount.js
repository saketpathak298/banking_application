const createSchemaModel = require('../modules/createaccount')
const bcrpt = require('bcrypt')
const crypto=require('crypto')
const createCntrl ={}
createCntrl.createAccount = async(req,res)=>{
  try{
      // request body
      const {name,city,gender,email,phonenumber,password}=req.body
      
      // Validate user input
      if(!(name && city && gender && email && phonenumber && password)){
       res.status(400).send("All input is required");
     } 
      // check email exits
      const isEmailExit=await createSchemaModel.findOne({email})
      if(isEmailExit){
        return res.status(409).send("email already exits")
      }
      // check phone number
      const isPhoneNumberExit=await createSchemaModel.findOne({phonenumber})
      if(isPhoneNumberExit){
         return res.status(409).send("phone number already exits");
      }
     // password bcrypt
      encrypt = await bcrpt.hash(password,10)
    
     //save created account
    const createaccountmodule = new createSchemaModel({
         name,
         city,
         gender,
         email:email.toLowerCase(),
         phonenumber,
         password:encrypt,
         
     })
     // genrate unique account number
      accountNo = await crypto.randomInt(1234567890)
        createaccountmodule.accountno=accountNo
  await createaccountmodule.save().then((response)=>{
      res.status(200).send({
          success:true,
          msg:'account created successfully',
      
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
            msg:"something went wrong!",
            error:err
        })
   }
}

module.exports=createCntrl;