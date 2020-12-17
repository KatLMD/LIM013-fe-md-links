const fetch = require('node-fetch');
import fs from "fs";
import path from "path"
import {markdownLinkExtractor} from "./linkextractor.js"



export const verificarLink = (link)=>{
  return new Promise((resolve,reject)=>{
    fetch(link)
          .then((res)=>{
            resolve({
              href: link,
              status: res.status,
              statusText: 'ok',
            })
          })
          .catch((err)=>{
            reject({
              href: link,
              status: 404,
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
  /* if(path.isAbsolute(res[0])) {
    console.log(38,path.resolve(res[0]));
  } */
  return  res;
};

export const mdLink =(rutaIngresada,options={validate:false})=>{
  if (rutaIngresada) {
    if (fs.existsSync(rutaIngresada)) {
      /* console.log('The path exists.'); */
      let arrayRutas = obtenerArrayRutas(rutaIngresada)
      let arrayRespuesta = [];
      for (const ruta of arrayRutas) {
        /* console.log(10, arrayRutas); */
        const links = markdownLinkExtractor(ruta);
      
        if(options.validate==false){
          // ./some/example.md http://algo.com/2/3/ Link a algo
          /* console.log('no hay opciones'); */
          
          for (const link of links) {
            let objeto = {
              path : ruta, 
              href : link.href, 
              text : link.text 
            }
            arrayRespuesta.push(objeto)
          }
          
        }else{
          if(options.validate){    // $ md-links ./some/example.md --validate
            // ./some/example.md http://algo.com/2/3/ ok 200 Link a algo
            for (const link of links) {
              let estado = verificarLink(link.href)
              let objeto ={
                path : ruta,
                href : link.href, 
                text : link.text, 
                status : estado //promesa
              }
              arrayRespuesta.push(objeto)
            }
            
          }
        }  
      }
     // console.log(arrayRespuesta)
      return arrayRespuesta;
    }else{
      return false
    }
  }
  return false
}
