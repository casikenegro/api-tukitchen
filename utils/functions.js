const paginate = async (model, currentPage = 1, pageLimit = 10,where,include) => {
  try {
      const limit = parseInt(pageLimit, 10);
      const page = parseInt(currentPage, 10);

      // create an options object
      let options = {
          offset: getOffset(page, pageLimit),
          limit: limit,
          where,
          include
      };   
      let rows = await model.findAll({where,include});
      let data = await model.findAll({...options});
      const lastPage = parseInt(rows.length/limit) > 0 ? parseInt(rows.length/limit) :1
      return {
          previousPage: getPreviousPage(page),
          currentPage: page,
          nextPage: getNextPage(page, limit, rows.length),
          lastPage,
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
module.exports = {
  paginate, 
  rad
}