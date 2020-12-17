const router = require('express').Router();
const nodemailer = require('nodemailer');

router.post("/send", (req, res, next) => {

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "uzochukwunwigwe@gmail.com",
            pass: "googlemail100"
        }
    });

    let mailOptions = {
        from: "uzochukwunwigwe@gmail.com",
        to: req.body.receivers,
        subject: `${req.body.details.emailSubject}`,
        text: `${req.body.details.emailMessage}`
    };

    transporter.sendMail(mailOptions, () => {
        if(err) {
            console.log("Error Occured")
        } else {
            console.log("Email sent")
        }
    })
}) 

module.exports = router;