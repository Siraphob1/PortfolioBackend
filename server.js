require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3600 
const cors = require('cors')
const corsOptions = require('./config/corsOptions');
const nodemailer = require("nodemailer");
const sendemail = require('./model/sendemail');
const helmet = require('helmet');



//Built-in middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.disable('x-powered-by');

//3-party middleware 
app.use(cors(corsOptions));
app.use(helmet());



//route 
app.post('/sendmail' , async (req , res)=>{
    const {namevisitor , emailvisitor , messagevisitor} = req.body;   

    if(!namevisitor || !emailvisitor || !messagevisitor) return res.sendStatus(400)

    const reciever_email = process.env.ERECIEVER;
    const sender_email = process.env.ESENDER;
    const sender_pwd = process.env.PSENDER;

        //Create tranpoter
        const transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
              user: sender_email,
              pass: sender_pwd
            }
          });
    
        //Setup message options
        const  mailOptions = {
            from: sender_email,
            to: reciever_email,
            subject: 'Portfolio Siraphob',
            html:sendemail(namevisitor , emailvisitor , messagevisitor)
        }
    
         //SendMail
         await transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
              res.status(503).json({'sendestatus': 'failed'});
            } else {
              console.log('Email sent: ' + info.response);    
              res.status(200).json({message:'success'})
            }
          });
    
    
})

app.listen(port , ()=>{
    console.log(`Run server at http://localhost:${port}/`)
})