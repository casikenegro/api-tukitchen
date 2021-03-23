const models = require('../models');
const { returnUserByToken } = require("../middleware");

const subscription = async (req, res) => {
    const  user = await returnUserByToken(req);
    const { endpoint, expirationTime, keys } = req.body;
    if(!(await models.Notifications.findOne({where:{ endpoint}}))){
        await models.Channels.create({
            user:user.id,
            endpoint,
            expirationTime,
            p256dh: keys.p256dh,
            auth: keys.auth
        });
    }
    
    res.status(201).json();
  };
  
  
  module.exports = {
    subscription,
  }