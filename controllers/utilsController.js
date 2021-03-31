const { sendMail } = require('../utils/email');
const { validationResult } = require("express-validator");
const { returnProfile, returnRole } = require('../utils/functions');

const sendMailTo = async (req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).send({ errors: errors.array()})
    }
    const role = await returnRole(req);
    if(role === "COMPRADOR"){
        return res.status(412).send({message: "forbidden"});
    }
    const profile  = await returnProfile(req);
    if(!profile) {
        return res.status(400).send({message: "profile not exist"});
    }
    try {
        await sendMail({
            to:req.body.to,
            template: "generic-mail",
            subject:req.body.subject,
            content: {
                message_1:req.body.title, 
                message_2:req.body.message,
            },
        });
        return res.send({message:"send mail success"});
    } catch (error) {
        return res.status(500).send(error);
    }
};

module.exports = { sendMailTo }; 