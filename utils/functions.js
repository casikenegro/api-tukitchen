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
      
      return {
          previousPage: getPreviousPage(page),
          currentPage: page,
          nextPage: getNextPage(page, limit, rows.length),
          lastPage:parseInt(rows.length/limit, 10) > 0 ? parseInt(rows.length/limit, 10) :1  ,
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
module.exports = {
  paginate
}