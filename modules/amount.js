const mongoose = require('mongoose')

const amountModel = mongoose.Schema({
    accountno:{type:Number},
    amount:{type:Number}
})
const createAmountModel = mongoose.model("amountModel",amountModel);

module.exports=createAmountModel