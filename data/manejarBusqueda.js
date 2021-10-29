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
   //Buscar 10 imagenes por nombre raza
   const url = `https://dog.ceo/api/breed/${nombreRaza}/images/random/10`;
   console.log(url);
   //Se devuelve el manjejo de Fetch
   const razaRes = await handleFetch(url);
   const razaResJSON = await respuesta.json();
   return razaResJSON;
};

//realizar todas las busquedas
const mostrarRazasDisponibles = async () => {   
   //1) buscar todos los nombre razas
   const url = `https://dog.ceo/api/breeds/list/all`;
   console.log(url);
   const razasTotales = await handleFetch(url);
   const razasTotalesJSON = await razasTotales.json();
   console.log(razasTotalesJSON);
   const clavesPerros = await Object.keys(razasTotalesJSON.message);
   console.log("La clave-Perro son: " , clavesPerros);
   //const imagenPerroRaza = for (i=0; i<clavesPerros.length(); i++) {

   //};
   return clavesPerros;

};

export  {buscarRazaPorNombre, mostrarRazasDisponibles};