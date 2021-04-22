const router = require('express').Router();
const nodemailer = require('nodemailer');

router.post("/send", (req, res, next) => {

    const sendMail = () => {

        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: `${req.body.details.emailSender}`,
                pass: `${req.body.details.emailPassword}`
            }
        });
    
        let mailOptions = {
            // from: "uzochukwunwigwe@gmail.com",
            from: `${req.body.details.emailSender}`,
            to: req.body.receivers,
            subject: `${req.body.details.emailSusbject}`,
            text: `${req.body.details.emailMessage}`
        };

        transporter.sendMail(mailOptions);

      return res.status(200).json({ success: true, msg: "Message sent successfully"})
    }

    try {
        sendMail();
    } catch (err) {
        console.log("Failed")
        res.status(401).json({ success: false, msg: "Couldn't send your message, kindly check your input details"})
    }
    // console.log(req.body)
    

    // transporter.sendMail(mailOptions, () => {
    //     if(err) {
    //         console.log("Error Occured")
    //         console.log("Got to this point")
    //         // Send Error response to the user
    //         
    //     } else {
    //         console.log("Email sent")
    //         // Send success message to the user 
    //         
    //     }
    // })


}) 

module.exports = router;