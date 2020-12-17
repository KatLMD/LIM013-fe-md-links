//const mdLinks = require('../');


//describe('mdLinks', () => {

  //it('should...', () => {
    //console.log('FIX ME!');
 // });

//});
import fs from "fs";
import {obtenerArrayRutas} from '../src/utilidades.js';
import {mdLink} from '../src/utilidades.js';
import {verificarLink} from '../src/utilidades.js';
import {markdownLinkExtractor} from '../src/linkextractor.js';
import path from 'path';


describe('markdownLinkExtractor', () => {
  it('Se espera que markdownLinkExtractor sea una funcion', () => {
    expect(typeof markdownLinkExtractor).toBe('function'); 
  })

  

 /*  it('Espero que retorne false para la ruta: markdowns\Readme.md', () => {
    expect(verificarLink('C:\\.&4')).toBe(false); 
  }) */
})

describe('obtenerArrayRutas', () => {
  it('Deberia ser una funcion', () => {
    expect( typeof obtenerArrayRutas).toBe('function'); 
  })
  it('Deberia retornar un array', () => {
    expect( typeof obtenerArrayRutas("test/prueba-tests")).toBe('object'); 
  })
  it('Para "test/prueba-tests" Deberia retornar ' + JSON.stringify([ 'test\\prueba-tests\\otroAlgo.md', 'test\\prueba-tests\\test.md' ]), () => {
    expect( obtenerArrayRutas("test/prueba-tests")).toEqual([ 'test\\prueba-tests\\otroAlgo.md', 'test\\prueba-tests\\test.md' ]); 
  })
  it('Para "test/prueba-tests/otroAlgo.md" Deberia retornar ' + JSON.stringify([ 'test\\prueba-tests\\otroAlgo.md']), () => {
    expect( obtenerArrayRutas("test/prueba-tests/otroAlgo.md")).toEqual([ 'test/prueba-tests/otroAlgo.md']); // no convierte en \\algo\\a.md
  })
  /* it('Para ruta nula  retornar false' , () => {
    expect( obtenerArrayRutas()).toEqual(false); 
  }) */
})



//test supongoooooooooo

describe('mdLink', () => {
  it('Deberia ser una funcion', () => {
    expect( typeof mdLink).toBe('function'); 
  })
  it('Deberia retornar un array', () => {
    expect( typeof mdLink("test/prueba-tests")).toBe('object'); 
  })
  it('mdlink para "test/prueba-tests" Deberia retornar ' + JSON.stringify([
    {
      path: 'test\\prueba-tests\\otroAlgo.md',
      href: 'https://lasletkkras.org/',
      text: '*Letra F*'
    },
    {
      path: 'test\\prueba-tests\\test.md',
      href: 'https://lasletras.org/letra-a/',
      text: '*Letra A*'
    },
    {
      path: 'test\\prueba-tests\\test.md',
      href: 'https://lasletras.org/letra-b/',
      text: '*Letra B*'
    },
    {
      path: 'test\\prueba-tests\\test.md',
      href: 'https://lasletras.org/letra-c/',
      text: '*Letra C*'
    },
    {
      path: 'test\\prueba-tests\\test.md',
      href: 'https://lasletras.org/letra-d/',
      text: '*Letra D*'
    },
    {
      path: 'test\\prueba-tests\\test.md',
      href: 'https://lasletras.org/letra-e/',
      text: '*Letra E*'
    },
    {
      path: 'test\\prueba-tests\\test.md',
      href: 'https://lasletras.org/letra-f/',
      text: '*Letra F*'
    }
  ]), () => {
    expect( mdLink("test/prueba-tests")).toEqual([
      {
        path: 'test\\prueba-tests\\otroAlgo.md',
        href: 'https://lasletkkras.org/',
        text: '*Letra F*'
      },
      {
        path: 'test\\prueba-tests\\test.md',
        href: 'https://lasletras.org/letra-a/',
        text: '*Letra A*'
      },
      {
        path: 'test\\prueba-tests\\test.md',
        href: 'https://lasletras.org/letra-b/',
        text: '*Letra B*'
      },
      {
        path: 'test\\prueba-tests\\test.md',
        href: 'https://lasletras.org/letra-c/',
        text: '*Letra C*'
      },
      {
        path: 'test\\prueba-tests\\test.md',
        href: 'https://lasletras.org/letra-d/',
        text: '*Letra D*'
      },
      {
        path: 'test\\prueba-tests\\test.md',
        href: 'https://lasletras.org/letra-e/',
        text: '*Letra E*'
      },
      {
        path: 'test\\prueba-tests\\test.md',
        href: 'https://lasletras.org/letra-f/',
        text: '*Letra F*'
      }
    ]); 
  })
  it('para ruta vacio', () => {
    expect(  mdLink("")).toEqual(false); 
  })

  it('para ruta errada', () => {
    expect(  mdLink("abcdf/")).toEqual(false); 
  })

  /* it('para la opcion --validate', () => {
    expect(  mdLink("test/prueba-tests/otroAlgo.md",{validate:true})).toEqual([
      {"href": "https://lasletkkras.org/", "path": "test/prueba-tests/otroAlgo.md", "status": Promise, "text": "*Letra F*"}
    ]); 
  }) */
  /* it('Para ruta nula  retornar false' , () => {
    expect( obtenerArrayRutas()).toEqual(false); 
  }) */
})

describe('verificarLink', () => {
  it('Se espera que verificarLink sea una funcion', () => {
    expect(typeof verificarLink).toBe('function'); 
  })

  it('para un link verificarLink', (done) => {
    verificarLink('https://lasletras.org/letra-d/').then((response) => {
      expect(response).toEqual(
        {
          href: 'https://lasletras.org/letra-d/',
          status: 200,
          statusText : 'ok'
        }
      );
      done();
    });
  });
  it('para un link roto verificarLink', (done) => {
    verificarLink('https://lasletrsds.org/letra-d/').then(resolve=>(null),(reject) => {
      expect(reject).toEqual(
        {
          href: 'https://lasletrsds.org/letra-d/',
          status: 404,
          statusText: 'fail',
        }
      );
      done();
    });
  });

 /*  it('Espero que retorne false para la ruta: markdowns\Readme.md', () => {
    expect(verificarLink('C:\\.&4')).toBe(false); 
  }) */
})