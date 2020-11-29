const fetch = require('node-fetch');
var https = require('https');
export const verificarLink = (link)=>{
  //return link
  return new Promise((resolve,reject)=>{
    fetch(link)
          .then((res)=>{
            resolve({
              href: link,
              status: res.status
            })
          })
          .catch((err)=>{
            reject({
              err:err,
              status: 'no status',
              statusText: 'FAIL',
            })
          })
  })  
};


export const otraForma = (link)=>{
  return new Promise((resolve,reject)=>{
    https.get(link, (res) =>{
      console.log("statusCode: ", res.statusCode); 
      resolve(res.statusCode)
    })  
    .on('error', function(e) {
      console.error(33,e);
    });
  })
}