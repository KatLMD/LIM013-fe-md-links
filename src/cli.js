#!/usr/bin/env node
import {mdLink} from './utilidades.js'
const rutaIngresada= process.argv[2] //test/prueba-tests/test.md
const opcion1= process.argv[3]
const opcion2= process.argv[4]





const options = {validate:false}
if(opcion1=="--validate" || opcion2=="--validate"){
  options.validate = true
}

const resTotal = mdLink(rutaIngresada,options)
if (resTotal!=false) {
  if(!opcion1){
    // ./some/example.md http://algo.com/2/3/ Link a algo
    for (const link of resTotal) {
      console.log(link.path,link.href,link.text)
    }
    
  }else{
    if(opcion1== "--stats"){
      /* $ md-links ./some/example.md --stats
      Total: 3
      Unique: 3 */  
      let href = [];
      for (const link of resTotal) {
        href.push(link.href)
      }
      console.log(`Total: ${href.length}\nUnique: ${[...new Set(href)].length}`)
  
      if(opcion2== "--validate" ){
        /* $ md-links ./some/example.md --stats --validate
          Total: 3
          Unique: 3
          Broken: 1 */
          let brokens = 0;
          let pagina = 0;
          let imprimirBrokens = (broken,index)=>{
            if(index==resTotal.length){
              console.log(`Broken: ${broken}`)
            }
          }
          for (const link of resTotal) {
            pagina++;
            link.status
            .then(()=>{return null},()=>{return brokens+1})
            .then((broken)=>{imprimirBrokens(broken,pagina)})
          }
          
      }
    }else if(opcion1 == "--validate"){
      /* $ md-links ./some/example.md --validate
  ./some/example.md http://algo.com/2/3/ ok 200 Link a algo */
        for (const link of resTotal) {
  
          let promesa = link.status
          let resolved = (status)=>{
            console.log(link.path,link.href,status.status,link.text)
          }
          let rejected = (status)=>{
            console.log(link.path,link.href,404,link.text)
          }
          promesa.then(resolved, rejected)
          
        }
      }
    };
} else {
  console.log(false)
}


      
    
