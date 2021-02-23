
const objectToFormData = obj => { 

  const form = new FormData();

  Object.entries(obj).forEach( () => { 
    form.append(key,value);
  } );

  return form;

}

module.exports = {
  objectToFormData,
}
const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page > 0 ? page  * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: tutorials } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, tutorials, totalPages, currentPage };
};
module.exports = {
  getPagination,
  getPagingData
}