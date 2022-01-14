const express = require('express');
const router = express.Router();
const accountCONTRL = require('../controllers/createaccount');
const forgetPassWordCntrl = require('../controllers/forgetpassword');


// create account api route
router.post("/create",accountCONTRL.createAccount);
// forget password api route
router.put("/forget",forgetPassWordCntrl.forgetPassword);
// getAll Account
router.get("/getaccount",forgetPassWordCntrl.getAllAccounts)

module.exports=router