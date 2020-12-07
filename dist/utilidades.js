"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.obtenerArrayRutas = exports.verificarLink = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const fetch = require('node-fetch');

const verificarLink = link => {
  return new Promise((resolve, reject) => {
    fetch(link).then(res => {
      resolve({
        href: link,
        status: res.status
      });
    }).catch(err => {
      reject({
        err: err,
        status: 'no status',
        statusText: 'fail'
      });
    });
  });
};

exports.verificarLink = verificarLink;

const obtenerArrayRutas = ruta => {
  let direcctory = _fs.default.lstatSync(ruta).isDirectory();

  let res = [];
  console.log(26, _path.default);

  if (direcctory) {
    let allFiles = _fs.default.readdirSync(ruta);

    for (const file of allFiles) {
      if (file.toLowerCase().endsWith('.md')) {
        res.push(_path.default.join(ruta, file));
      }
    }
  } else {
    res = [ruta];
  }

  if (_path.default.isAbsolute(res[0])) {
    console.log(38, _path.default.resolve(res[0]));
  }

  return [ruta, res];
};

exports.obtenerArrayRutas = obtenerArrayRutas;