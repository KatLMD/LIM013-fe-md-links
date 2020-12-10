  import fs from "fs";
  // Función que extrae links desde el string en formato Markdown:
  const markdownLinkExtractor = function(ruta) {
    'use strict';
    let markdown = fs.readFileSync(ruta, 'utf-8');

    const re = /!?\[(.*)\]\((.*?)\)/gi;  
  
    let matches = re.exec(markdown); // Cambio Método .match a método .exec() para poder sacar los corchetes
    let result = [];
    let text = [];  
  
    do {
      let temp = matches[1];
      text.push(temp);
    } while ((matches = re.exec(markdown)) !== null);
    
    const reHref = /(https?|ftp):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/gi;
    let href = markdown.match(reHref);
  
    if (text.length === href.length) {
      for (let i = 0; i < text.length; i++) {
        //const one = new Link(text[i], href[i]);
        const one = {
          text:text[i],
           href:href[i]
          };

        result.push(one);
      }
      //return JSON.stringify(result, null, ' ');
      return result
    } else {
      return ('El texto ingresado contiene un error, por favor corríjalo e intente nuevamente');
    };
  };
  
  module.exports = markdownLinkExtractor;



