//ESTE ARCHIVO SE CONECTA CON LA API DE RAZAS
//(solo van las definiciones de las funciones
//La invocacion va en index.js)

import fetch from "node-fetch";
//const fetch = require('fetch');

const handleFetch = async url => {
   const res = await fetch(url);
   return await handleError(res);
}

const handleError = (res) => {
   if (!res.ok) throw new Error(res.statusText);
   return res;
}

//Retorna una Promesa que será manejada desde la invocación
const buscarRazaPorNombre = async nombreRaza => {
   const url = `https://dog.ceo/api/breed/${nombreRaza}/images/random`;
   console.log(url);
   //Se devuelve el manjejo de Fetch
   const respuesta = await handleFetch(url);
   const resJSON = await respuesta.json();
   return resJSON;
};

export default buscarRazaPorNombre;