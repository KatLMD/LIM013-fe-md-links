//import path from "path"
import fs from "fs";
import markdownLinkExtractor from "./linkextractor.js";
import {verificarLink,otraForma} from './utilidades.js'
var https = require('https');
//node-fetch
const fetch = require('node-fetch');




const ruta= process.argv[2] //test/prueba-tests/test.md

const opcion1= process.argv[3]
const opcion2= process.argv[4]


if(!opcion1){
  // ./some/example.md http://algo.com/2/3/ Link a algo
  console.log('no hay opciones');
  const links= markdownLinkExtractor(ruta);
  let arrayRespuesta = [];
  for (const link of links) {
    arrayRespuesta.push(
      {
        path : ruta,
        href : link.href,
        text : link.text
      }
    )
  }
  console.log(arrayRespuesta)
}else{
  if(opcion1== "--validate"){
    // $ md-links ./some/example.md --validate
    // ./some/example.md http://algo.com/2/3/ ok 200 Link a algo
    const links= markdownLinkExtractor(ruta);
    let arrayRespuesta = [];
    for (const link of links) {
      /* otraForma(link.href).then(res=>console.log(res)) */
      const respuesta = verificarLink(link.href)
      /* respuesta.then((a)=>{console.log(37,a)}) */
      arrayRespuesta.push(
        {
          path : ruta,
          href : link.href,
          text : link.text,
          status : respuesta
        }
      )

    }
    console.log(arrayRespuesta)
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



function elegirOpciones() {
  let opciones = seleccionar.value;

  if ( opciones === 'soleado') {
    parrafo.textContent = 'El día esta agradable y soleado hoy. ¡Use pantalones cortos! Ve a la playa o al parque y come un helado.';
  } else if (opciones === 'lluvioso') {
    parrafo.textContent = 'Está lloviendo, tome un abrigo para lluvia y un paraguas, y no se quede por fuera mucho tiempo.';
  } else if (opciones === 'nevando') {
    parrafo.textContent = 'Está nevando ─ ¡está congelando! Lo mejor es quedarse en casa con una taza caliente de chocolate, o hacer un muñeco de nieve.';
  } else if (opciones === 'nublado') {
    parrafo.textContent = 'No está lloviendo, pero el cielo está gris y nublado; podría llover en cualquier momento, así que lleve un saco solo por si acaso.';
  } else {
    parrafo.textContent = '';
  }
}



const llamar = (url)=>{
  return new Promise((resolve,reject)=>{
      https.get(url,(res)=>{
          resolve(res.statusCode)
      })
  })
}