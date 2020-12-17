  import fs from "fs";
  // Función que extrae links desde el string en formato Markdown:
  export const markdownLinkExtractor = function(ruta) {
    'use strict';
    let markdown = fs.readFileSync(ruta, 'utf-8');

    const re = /!?\[(.*)\]\((.*?)\)/gi;  
  
    let matches = re.exec(markdown); // Cambio Método .match a método .exec() para poder sacar los corchetes
    let result = [];
    let text = []; 
    let href = [] 
  
    do {
      let temp = matches[1];
      text.push(temp);
      href.push(matches[2])
    } while ((matches = re.exec(markdown)) !== null);
      for (let i = 0; i < text.length; i++) {
        const one = {
          text:text[i],
           href:href[i]
          };

        result.push(one);
      }
      //return JSON.stringify(result, null, ' ');
      return result
  };
  

