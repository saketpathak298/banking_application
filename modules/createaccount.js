const mongoose=require('mongoose')

const bankSchemamodule=mongoose.Schema({
    name:{type:String,default: null},
    city:{type:String,default: null},
    gender:{type:String,default: null},
    email:{type:String,unique:true},
    phonenumber:{type:Number,unique:true},
    password:{type:String},
    accountno:{type:Number}
})

const bankSchema=mongoose.model("bankSchema",bankSchemamodule);
module.exports=bankSchema;