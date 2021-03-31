const models = require('../models');

const insertHours = async(init,final) => {
    const initArray = init.split(':');
    const finalArray = final.split(':'); 
    if(initArray.length  < 2 || finalArray.length < 2){
       return { message: "formato de hora invalido"}
    }
 };
 
const searchHours = async(init,final,where = {}) => {
   let hour;
   if(final > init) {
      hour = { hour : { [models.Op.between] : [init,final] } };
   }else{
      hour ={ hour: {[models.Op.between] : [init,'23:59'],[models.Op.between] : ['00:00',final] }} ;
   }

 return {
   ...where,
   ...hour,
 }
};

module.exports = {
  insertHours,
  searchHours
}