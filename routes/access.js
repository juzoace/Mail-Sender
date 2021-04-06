const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');
const utils = require('../lib/utils');
const nodemailer = require('nodemailer');
const { CLIENT_ORIGIN } = require('../config')

router.post('/login', (req, res, next ) => {
    
    User.findOne({ username: req.body.username})
        .then((user) => {
            if(!user) {
                res.status(401).json({ success: false, msg: "Could not find user" })
            }

            if (user.status != "Active") {
                  
                return res.status(401).send({
                    msg: "Kindly verify your account. Click the activation link that was sent to your email  !",
                  });

            } else {

            console.log(req.body.password);
            const isValid = utils.validPassword(req.body.password, user.hash, user.salt)

            if(isValid) { 
                const tokenObject = utils.issueJWT(user);
                
                res.status(200).json({ success: true, msg: "Login Successful", user: user, token: tokenObject.token, expiresIn: "3600"})
            
            } else {
            
                res.status(401).json({ success: false, msg: "You entered the wrong password"})
            
            }
            }
        })
        .catch((err) => {
            next(err);
        });
})

router.post('/register', async (req, res, next ) => {
    // req.body.email
    console.log(req.body.email)
    console.log("Got here")
        // Name database check
        const nameRetrieved = await User.findOne({ name: req.body.name });
        // Send the response here 
        
        // Username database check
        const usernameRetrieved = await User.findOne({ username: req.body.username })
        console.log(usernameRetrieved)
        // Send the response here

        // Email database check
        const emailRetrieved = await User.findOne({ email: req.body.email }) 
        // Send the response here 

        if (nameRetrieved) {
           // Send a response to the user to use a different name
           console.log(nameRetrieved)
           res.status(491).json({
            type: "Error",
            msg: "Name taken, try a diffferent name"
        })
        if (nameRetrieved) return
        } 
        if (usernameRetrieved) {
            console.log("Username Block")
             res.status(491).json({
                type: "Error", 
                msg: "Username taken, try a different username "
            })
        } 
        if (usernameRetrieved) return

        if (emailRetrieved) {
             res.status(491).json({
                type: "Error", 
                msg: " Email taken, try a different email"
            })
        } if (emailRetrieved) return 

        if (nameRetrieved && usernameRetrieved) {
            // Tell the user to check the name and username input fields
             res.status(491).json({
                type: "Error",
                msg: "Change your name and username`"
            })
        }


        
        if (nameRetrieved && usernameRetrieved) return

        if (nameRetrieved && emailRetrieved) {
            // Tell the user to check the name and email input fields
            res.status(491).json({
                type: "Error",
                msg: "Change your Name and Email"
            })
        }
        if (nameRetrieved && emailRetrieved) return

        if (usernameRetrieved && emailRetrieved) {
            // Tell the user to check the username and email input fields
            res.status(491).json({
                type: "Error",
                msg: "Change your Username and Email"
            })
        }
        if (usernameRetrieved && emailRetrieved) return

        if (nameRetrieved && usernameRetrieved && emailRetrieved) {
            // Tell the user to check the name, username and email input fields
            res.status(491).json({
                type: "Error",
                msg: "Change your Name, Username and Email" 
            })
        };
        if (nameRetrieved && usernameRetrieved && emailRetrieved) return

        if (!nameRetrieved && !usernameRetrieved && !emailRetrieved) {
            // Everything is unique proceed to create new user

            //   Generate hash and salt from the password
            const saltHash = utils.genPassword(req.body.password);

            const salt = saltHash.salt;

            const hash = saltHash.hash;
        
            const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            let token = '';
            for (let i = 0; i < 25; i++) {
            token += characters[Math.floor(Math.random() * characters.length )];
            }

            const newUser = new User({
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                hash: hash,
                salt: salt,
                confirmationCode: token
            });

            newUser.save()
            .then((user) => {
           
            })
            
        const sendMail = () => {

        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: `${process.env.EmailSender}`,
                pass: `${process.env.EmailPassword}`
            }
        });
   
        let mailOptions = {

            
            from: `${process.env.EmailSender}`,
            to: `${req.body.email}`,
            subject: `Please confirm your account`,
            
            html: `<h1>Email Confirmation</h1>
            <h2>Hello "${req.body.name}"</h2>
            <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
            <a href='${CLIENT_ORIGIN}/access/confirm/${token}'> Click here</a>
            </div>`
        };

        transporter.sendMail(mailOptions);

      return res.status(200).json({ success: true, msg: "User was registered successfully! Please check your email", user: {
          registeredName: req.body.name, registeredEmail: req.body.email, registeredUserName: req.body.username
      }})
    }


    try {
        sendMail();
        console.log('Got to the try block')
    } catch (err) {
        console.log("Failed")
        res.status(401).json({ success: false, msg: "Couldn't send your message, kindly check your input details"})
    }   
        }

})
router.post('/confirm/:token', (req, res, next ) => {
    const  token  = req.params.token;
    console.log(token);
    console.log("Worked here now");
    User.findOne({
        confirmationCode: req.params.token
    })

    .then((user) => {
        console.log(user)
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        user.status = "Active";
        user.save((err) => {
            if (err) {
            //   res.status(500).send({ message: err });
            res.status(500).json({ message: err })
              return;
            }
            res.status(200).json({message: "Confirmed Successfully"})
            // Redirect to the front end welcome page

          });
    })
    .catch((e) => console.log("error", e))
})

module.exports = router;