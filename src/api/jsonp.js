import jsonp from 'jsonp'
export default function(url, data, option) {
  url += param(data);
  return new Promise((resolve, reject) => {
      jsonp(url,option, (err,data) => {
          if(!err) {
              resolve(data);
          }
          else {
              reject(err);
          }
      })
  })
}

function param(data) {
  let url = "";
  for(let key in data) {
     let value = data[key];
     url += `&${key}=${encodeURIComponent(value)}`;
  }
  return "?" + url.substr(1);
}