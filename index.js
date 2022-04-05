const cors = require("cors");
const express = require('express')
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express()
const port = process.env.PORT

const login = process.env.SMTP_LOGIN || "___"
const password = process.env.SMTP_PASSWORD || "___"

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

let transporter = nodemailer.createTransport({
  host: "smtp.yandex.ru",
  port: 465,
  secure: true,
  auth: {
    user: login,
    pass: password,
  },
  tls: {
    rejectUnauthorized: false
  }
});

app.post('/send-message', async (req, res) => {
  const {name, email, message} = req.body
  try {
    await transporter.sendMail({
      from: login,
      to: "alexeynikinitin@yandex.by",
      subject: "My Portfolio",
      html: `<div>
                <b>Letter from ${name}</b>
                <div>${email}</div>
                <div>${message}</div>
           </div>`,
    })
    res.send({resultCode: 0})
  } catch (e) {
    res.send({resultCode: 1})
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
