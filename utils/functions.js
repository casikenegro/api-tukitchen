const jwt = require("jsonwebtoken");
const models = require('../models');
const webPush = require('../webPush');
const constants = require('./constants');


const paginate = async (model, currentPage = 1, pageLimit = 10,where,include,options = {}) => {
  try {
      const limit = parseInt(pageLimit, 10);
      const page = parseInt(currentPage, 10);

      // create an options object
      let newOptions = {
          offset: getOffset(page, pageLimit),
          limit: limit,
          where,
          include,
          ...options
      };   
      let rows = await model.findAll({where,include});
      let data = await model.findAll({...newOptions});
      
      return {
          previousPage: getPreviousPage(page),
          currentPage: page,
          nextPage: getNextPage(page, limit, rows.length),
          lastPage:Math.ceil(rows.length/limit),
          totalResult: rows.length,
          limit: limit,
          data
      }
  } catch (error) {
      console.log(error);
  }
}
const getOffset = (page, limit) => {
  return (page * limit) - limit;
 }
 

 const getNextPage = (page, limit, total) => {
     if ((total/limit) > page) {
         return page + 1;
     }
 
     return null
 }
 
 const getPreviousPage = (page) => {
     if (page <= 1) {
         return null
     }
     return page - 1;
 }
const rad = (x)=>{
    return (x * Math.PI) / 180;
}
const objectToFormData = (item)=>{
    var form_data = new FormData();

    for ( var key in item ) {
        form_data.append(key, item[key]);
    }
    return form_data;
}

const sendMessage = async (user_id)=>{
    // Payload Notification
    try {
    console.log(user_id);
    const channels = await models.Channels.findAll({where:{user_id}});
    if(channels.length === 0) return null;
    const payload = JSON.stringify({
      title: "Ha recibido un pedido",
      message:"Tienes un nuevo pedido" 
    });
    Promise.all(channels.map( async (item)=>{
        let data = await webPush.sendNotification({
            endpoint:item.endpoint,
            expirationTime: item.expiration_time,
            keys:{
                p256dh:item.p256dh,
                auth:item.auth
            }
        }, payload);
        return null;
    })); 
    } catch (error) {
      console.log(error);
    }
};
const returnExpIn = async (req) => {
    let token = req.headers["x-access-token"];
    if(!token) return 0;
    return jwt.verify(token, constants.secretTokenKey);
  
};
const returnRole = async (req) => {
    let token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, constants.secretTokenKey);
    const user = await models.User.findOne({ where:{id: decoded.id}});
    return user.role;
  
};
module.exports = {
  paginate, 
  rad,
  objectToFormData, 
  sendMessage, 
  returnExpIn
}