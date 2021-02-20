
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
