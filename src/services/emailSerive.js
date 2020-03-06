const config = require("../config")
const sendgrid = require('sendgrid')(config.sendgridKey)

exports.send = async (to, subject, body) => {
    sendgrid.send({
        to: to,
        from: "edp2013.ep@gmail.com",
        subject: subject,
        html: body
    })
}