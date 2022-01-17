const createAccountmodel =require('../modules/createaccount')
const nodemailer = require('nodemailer');



const forgetCntrl = {}

// admin change password
forgetCntrl.AdminChangePassword = async function(req, res) {
    try {
      const id = req.params.id;
      const newPassword = req.params.password;
      const user = await createAccountmodel.findById(id);
      if (user !== null) {
        user.password = newPassword;

        createAccountmodel.save();
        return res.send({success: true, msg: 'Password updated'});
      } else {
        return res.send({success: false, msg: 'User Not Found'});
      }
    } catch (err) {
      res.status(500).send({
        success: false, errors: err,
        msg: 'Something went wrong. Please try again',
      });
    }
  };
  // Send a mail to user and generate change password link
  forgetCntrl.AdminForgetPassword = async function(req, res) {
    try {
      const token = crypto.randomBytes(20).toString('hex');
      const user = await createAccountmodel.findOne({email: req.body.email.toLowerCase()});
      const link = process.env.WEB_URI + '/admin/forgetPassword?verifykey=' + token;
      user.passwordResetToken = token;
      user.passwordResetExpire = Date.now() + 86400000; // 24 hour
      user.save();
  
      // setup email data with unicode symbols
      const message = await ejs.renderFile(process.env.DIRECTORY_PATH +
        'views/email_templates/email_forgot_password.ejs', {
        name: createAccountmodel.name,
        url: link,
      });
      const mailOptions = {
        from: process.env.SENDGRID_EMAIL, // sender address
        to: req.body.email.toLowerCase(), // list of receivers
        subject: 'Password Reset.', // Subject line
        html: message,
        tracking_settings: {subscription_tracking: {enable: false}},
      };
      // send mail with sendgrid
      sgMail.send(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
      });
      res.status(200).send({
        success: true,
        msg: 'An email has been sent to ' + req.body.email.toLowerCase() +
          ', if this account exists. Please check your inbox for reset password.',
      });
    } catch (err) {
      res.send({
        success: false, errors: err,
        msg: 'An email has been sent to ' + req.body.email.toLowerCase() +
          ', if this account exists. Please check your inbox for reset password.',
      });
    }
  };
  // Verify token and expire time
  forgetCntrl.AdminVerifyPasswordToken = async function(req, res) {
    try {
      const user = await createAccountmodel.findOne({
        passwordResetToken: req.params.token,
        passwordResetExpire: {$gt: Date.now()},
      });
      if (!user) {
        res.status(500).send({
          success: false,
          msg: 'Password reset token is invalid or has expired',
        });
      }
      res.status(200).send({success: true, msg: 'Successful valid token.'});
    } catch (err) {
      res.status(500).send({
        success: false,
        errors: err,
        msg: 'Something went wrong. Please try again',
      });
    }
  };
  // Update password by verify token
  forgetCntrl.AdminUpdatePasswordByToken = async function(req, res) {
    try {
      const user = await createAccountmodel.findOne({
        passwordResetToken: req.params.token,
        passwordResetExpire: {$gt: Date.now()},
      });
      if (!user) {
        req.flash('error', 'Password reset token is invalid or has expired.');
        return res.redirect('back');
      }
      user.password = req.body.password;
      user.passwordResetToken = null;
      user.passwordResetExpire = null;
      user.save();
      // setup email data with unicode symbols
      const message = await ejs.renderFile(process.env.DIRECTORY_PATH
        + 'views/email_templates/email_change_password.ejs', {
        name: createAccountmodel.name,
        email: createAccountmodel.email,
        url: process.env.WEB_URI + 'admin/login',
      });
      const mailOptions = {
        from: process.env.SENDGRID_EMAIL, // sender address
        to: createAccountmodel.email, // list of receivers
        subject: 'Password Reset.', // Subject line
        html: message,
        tracking_settings: {subscription_tracking: {enable: false}},
      };
      // send mail with sendgrid
      sgMail.send(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent:', info);
      });
      res.status(200).send({success: true, msg: 'Successful change password.'});
    } catch (err) {
      res.status(500).send({
        success: false,
        errors: err,
        msg: 'Something went wrong. Please try again',
      });
    }
  };

forgetCntrl.forgetPassword = async (req,res)=>{
    try{ 
        const changePass = {
            password:req.body.oldPassword,
            password:req.body.newPassword,
            password:req.body.confirmNewPassword
        }
        const id=req.params.id
        const orgbody = {
            name:req.body.name
        }
        // const name = req.body.name
       await createAccountmodel.update({id},{$set:orgbody}).then((response)=>{
            if(!response){
                res.status(404).send({
                    name: "name not found with id " + req.params._id, 
                })
            }
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