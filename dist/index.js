"use strict";

var _linkextractor = _interopRequireDefault(require("./linkextractor.js"));

var _utilidades = require("./utilidades.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import path from "path"
const ruta = process.argv[2]; //test/prueba-tests/test.md

const opcion1 = process.argv[3];
const opcion2 = process.argv[4];
console.log(10, 'arrayRutas');
let arrayRutas = (0, _utilidades.obtenerArrayRutas)(ruta);
console.log(10, arrayRutas);
const links = (0, _linkextractor.default)(ruta);

if (!opcion1) {
  // ./some/example.md http://algo.com/2/3/ Link a algo
  console.log('no hay opciones');
  let arrayRespuesta = [];

  for (const link of links) {
    let objeto = {
      path: ruta,
      //string
      href: link.href,
      //string
      text: link.text //string

    };
    arrayRespuesta.push(objeto);
  }

  console.log(arrayRespuesta);
} else {
  if (opcion1 == "--validate") {
    // $ md-links ./some/example.md --validate
    // ./some/example.md http://algo.com/2/3/ ok 200 Link a algo
    let arrayRespuesta = [];

    for (const link of links) {
      let estado = (0, _utilidades.verificarLink)(link.href);
      let objeto = {
        path: ruta,
        //string
        href: link.href,
        //string
        text: link.text,
        //string
        status: estado //promesa

      };
      arrayRespuesta.push(objeto);
    }
  }

  if (opcion1 == "--stats") {
    /* $ md-links ./some/example.md --stats
      Total: 3
      Unique: 3 */
    console.log("es stas");
    let href = [];

    for (const link of links) {
      href.push(link.href);
    }

    let objetorespuesta = {
      total: href.length,
      unique: [...new Set(href)].length
    };

    if (opcion2 == "--validate") {
      /* $ md-links ./some/example.md --stats --validate
      Total: 3
      Unique: 3
      Broken: 1 */
      console.log("es valida");
    }

    console.log(objetorespuesta);
  }
}