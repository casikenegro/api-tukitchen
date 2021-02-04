const fs = require('fs');
const moment = require('moment-timezone');
const path = require('path');

var readHtmlFile = function(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};



function saveImg64(imageBuffer,pathImg){

  const now = moment().tz("America/Caracas")
  var base64Data = imageBuffer.replace(/^data:image\/png;base64,/, "");
  const imageName = path.join(__dirname,pathImg+'/'+now+'.png')
  try{
    fs.writeFileSync(imageName, base64Data, 'base64');
    return now+'.png'
  }catch(err){
    return false
  }
}

function formatNumber(number, decimals, dec_point, thousands_sep){

  number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
      prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
      sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
      dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
      s = '',
      toFixedFix = function (n, prec) {
          var k = Math.pow(10, prec);
          return '' + Math.round(n * k) / k;
      };

  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
      s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
      s[1] = s[1] || '';
      s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);

}

function showPriceWithDecimals(config,price){
  if(config && config.active_price_decimals === "Desactivado" || config.active_price_decimals === undefined){
    return parseFloat(formatNumber(price,0,'',''))
  }else{
    return formatNumber(price,2,',','.')
  }
}

function dynamicsort(property,order) {
    var sort_order = 1;
    if(order === "desc"){
        sort_order = -1;
    }
    return function (a, b){
        // a should come before b in the sorted order
        if(a[property] < b[property]){
                return -1 * sort_order;
        // a should come after b in the sorted order
        }else if(a[property] > b[property]){
                return 1 * sort_order;
        // a and b are the same
        }else{
                return 0 * sort_order;
        }
    }
}

module.exports = {
  readHtmlFile,
  saveImg64,
  showPriceWithDecimals,
  formatNumber,
  dynamicsort
}
