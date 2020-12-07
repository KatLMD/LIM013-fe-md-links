const fetch = require('node-fetch');
import fs from "fs";
import path from "path"
export const verificarLink = (link)=>{
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
              statusText: 'fail',
            })
          })
  })  
};

export const obtenerArrayRutas = (ruta)=>{
  let direcctory = fs.lstatSync(ruta).isDirectory() 
  let res = [] ;
  if(direcctory){
    let allFiles = fs.readdirSync(ruta)
    for (const file of allFiles) {
      if(file.toLowerCase().endsWith('.md')){
        res.push(path.join(ruta,file))
      }
    }
  }else{
    res = [ ruta]
  }
  if(path.isAbsolute(res[0])) {
    console.log(38,path.resolve(res[0]));
  }
  return  res;
};


