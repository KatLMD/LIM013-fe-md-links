import path from "path"
import fs from "fs";
import { options } from "marked";

const markdownLinkExtractor = require('markdown-link-extractor');

const ruta= process.argv[2] //test/prueba-tests/test.md
console.log(5,ruta)

const opcion1= process.argv[3]
const opcion2= process.argv[4]
console.log(9,opcion1, opcion2);


if(!opcion1){
  console.log('no hay opciones');
  let archivo = fs.readFileSync(ruta, 'utf-8');
 
  
  
  
  const links = markdownLinkExtractor(archivo);
  console.log(22, archivo)
  links.forEach((link ,a)=> {
    console.log(24,link,a);
  });

}else{
  if(opcion1== "--validate"){
    console.log("es valida")
    if(opcion2== "--stats"){
      console.log("es stas")
    }
  }
  if(opcion1== "--stats"){
    console.log("es valida")
    if(opcion2== "--validate"){
      console.log("es stas")
    }
  }
} 




/* let archivo = fs.readFileSync(ruta, 'utf-8');

console.log(archivo) */
