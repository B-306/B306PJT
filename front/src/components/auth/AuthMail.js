// import React, { useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { withRouter } from 'react-router-dom'
// import axios from 'axios'

// var state = {
//     createdAuthCode : "",
//     authCodeCheck : false
// }

// function EmailCheck(props) {
//     const dispatch = useDispatch()
//     const [Email, setEmail] = useState("")
//     const [AuthCode, setAuthCode] = useState("")

//     const onEmailHandler = (event) => {
//         setEmail(event.currentTarget.value)
//     }
//     const onAuthCodeHandler = (event) => {
//         setAuthCode(event.currentTarget.value)
//     } 
//     const onNameHandler = (event) => {
//         setName(event.currentTarget.value)
//     }


//     const onSendMailHandler = (event) => {
//         event.preventDefault();

//         state.createdAuthCode = Math.random().toString(36).substr(2,6);

//         const dataToSubmit = {
//             email: Email,
//             auth: state.createdAuthCode
//         }
//         console.log('authCode = '+state.createdAuthCode)
//         axios.post("")
//     }
    
// }

// function sendEmail () {
//     const nodemailer = require("nodemailer");

//     const transporter = nodemailer.createTransport({
//     host: "smtp.forwardemail.net",
//     port: 465,
//     secure: true,
//     auth: {
//         // TODO: replace `user` and `pass` values from <https://forwardemail.net>
//         user: 'B306manager.gmail.com',
//         pass: 'b306admin'
//     }
//     });

//     // async..await is not allowed in global scope, must use a wrapper
//     async function main() {
//     // send mail with defined transport object
//     const info = await transporter.sendMail({
//         from: '"Fred Foo 👻" <B306manager.gmail.com>', // sender address
//         to: "math_star@naver.com", // list of receivers
//         subject: "Hello ✔", // Subject line
//         text: "Hello world?", // plain text body
//         html: "<b>Hello world?</b>", // html body
//     });

//     console.log("Message sent: %s", info.messageId);
//     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//     //
//     // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
//     //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
//     //       <https://github.com/forwardemail/preview-email>
//     //
//     }

//     main().catch(console.error);
// }

// export default sendEmail;