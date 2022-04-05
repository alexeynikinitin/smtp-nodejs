const express = require('express')
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express()
const port = 3010
const login = "alexeynikinitin@yandex.by"
const password = "zhokqkgsflanpxas"

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

let transporter = nodemailer.createTransport({
  host: "smtp.yandex.ru",
  port: 465,
  secure: true,
  auth: {
    user: login, // generated ethereal user
    pass: password, // generated ethereal password
  },
  tls: {
    rejectUnauthorized: false
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

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
