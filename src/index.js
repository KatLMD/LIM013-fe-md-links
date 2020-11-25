//import path from "path"
import fs from "fs";
import markdownLinkExtractor from "./linkextractor.js";
var https = require('https');

const ruta= process.argv[2] //test/prueba-tests/test.md

const opcion1= process.argv[3]
const opcion2= process.argv[4]


if(!opcion1){
  // ./some/example.md http://algo.com/2/3/ Link a algo
  console.log('no hay opciones');
  let archivo = fs.readFileSync(ruta, 'utf-8');
  const links= markdownLinkExtractor(archivo);
  for (const link of links) {
    console.log(ruta,link.href,link.text);
  }

}else{
  if(opcion1== "--validate"){
    // $ md-links ./some/example.md --validate
    // ./some/example.md http://algo.com/2/3/ ok 200 Link a algo
    console.log("es valida")
    let archivo = fs.readFileSync(ruta, 'utf-8');
    const links= markdownLinkExtractor(archivo);
    for (const link of links) {
      let respuesta = https.get(link.href, (res) =>{
        console.log("statusCode: ", res.statusCode); 
        return res.statusCode
      }) // busca en internet 
      .on('error', function(e) {
        console.error(33,e);
      }); // para que sirve
     console.log('36',respuesta)
    }
    
    /*if(opcion2== "--stats"){
      console.log("es stas")
    }*/
  }

  if(opcion1== "--stats"){
    /* $ md-links ./some/example.md --stats
      Total: 3
      Unique: 3 */
    console.log("es stas")
    if(opcion2== "--validate"){
    /* $ md-links ./some/example.md --stats --validate
    Total: 3
    Unique: 3
    Broken: 1 */
      console.log("es valida")
    }
  }
} 







