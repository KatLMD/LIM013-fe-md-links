"use strict";

var _utilidades = require("./utilidades.js");

const rutaIngresada = process.argv[2]; //test/prueba-tests/test.md

const opcion1 = process.argv[3];
const opcion2 = process.argv[4];
const options = {
  validate: false
};

if (opcion1 == "--validate" || opcion2 == "--validate") {
  options.validate = true;
}

const resTotal = (0, _utilidades.mdLink)(rutaIngresada, options);

if (!opcion1) {
  // ./some/example.md http://algo.com/2/3/ Link a algo
  for (const link of resTotal) {
    console.log(link.path, link.href, link.text);
  }
} else {
  if (opcion1 == "--stats") {
    /* $ md-links ./some/example.md --stats
    Total: 3
    Unique: 3 */
    console.log("es stas");
    let href = [];

    for (const link of resTotal) {
      href.push(link.href);
    }
    /* let objetorespuesta={
    total: href.length,
    unique:[...new Set(href)].length
    }   */


    console.log(`Total: ${href.length}
                Unique: ${[...new Set(href)].length}`);

    if (opcion2 == "--validate") {
      /* $ md-links ./some/example.md --stats --validate
        Total: 3
        Unique: 3
        Broken: 1 */
      console.log("es valida");
    } else {
      console.log(objetorespuesta);
    }
  } else if (opcion1 == "--validate") {
    /* $ md-links ./some/example.md --validate
    ./some/example.md http://algo.com/2/3/ ok 200 Link a algo */
    for (const link of resTotal) {
      let promesa = link.status;
      promesa.then(status => {
        console.log(link.path, link.href, status.status, link.text);
      });
    }
  }
}

;