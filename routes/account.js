const express = require('express');
const router = express.Router();
const accountCONTRL = require('../controllers/createaccount');
const forgetPassWordCntrl = require('../controllers/forgetpassword');
const amountModelCntrl = require('../controllers/amount')

// create account api route
router.post("/create",accountCONTRL.createAccount);
// forget password api route
router.put("/forget/:id",forgetPassWordCntrl.forgetPassword);
// getAll Account
router.get("/getaccount",forgetPassWordCntrl.getAllAccounts)
// change password route
router.put("/change/:id",forgetPassWordCntrl.AdminChangePassword)
// deposit amount route
router.post("/deposit",amountModelCntrl.depositAmount)
module.exports=router