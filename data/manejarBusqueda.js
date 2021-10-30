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

//Obtener 10 fotos de una raza
const getDiezFotosPorNombreRaza = async nombreRaza => {
   //Buscar 10 imagenes por nombre raza
   const url = `https://dog.ceo/api/breed/${nombreRaza}/images/random/10`;
   console.log(url);
   //Se devuelve el manjejo de Fetch
   const razaRes = await handleFetch(url);
   const razaResJSON = await razaRes.json();
   return razaResJSON;
};

//Obtener una imagen de una raza
const getImagenDeRaza = async nombreRaza => {
   const url = `https://dog.ceo/api/breed/${nombreRaza}/images/random`;
   console.log(url);
   const respuesta = await handleFetch(url);
   const respuestaJSON = await respuesta.json();
   return await respuestaJSON;
};

//realizar todas las busquedas
const getTodasRazas = async () => {   
   const url = `https://dog.ceo/api/breeds/list/all`;
   console.log(url);
   //1) Consultar y obtener todas las razas
   const razasTotales = await handleFetch(url); //Objeto Promesa-Response
   const razasTotalesJSON = await razasTotales.json();  //Pasarlo a JSON
   console.log(razasTotalesJSON);
   //2) Extraer los nombres de las razas
   const arrayNombresRazas = await Object.keys(razasTotalesJSON.message);
   console.log("Los nombres de las razas totales son: " , arrayNombresRazas);    
   //3) Obtener URLs de las imagenes de las razas
   return await getArrayObjetosTodasRazas(arrayNombresRazas);
};

//Obtener array de objetos raza con imagen + nombreRaza
const getArrayObjetosTodasRazas = async (arrayRazas) => { 
   /*
   const objAux = { //Objeto Aux para todas las urls de las imagenes de cada raza
      "message": [url1, url2 ...]            
   };
   */
   //chequear que paso el array   
   console.log(arrayRazas);
   //Array auxiliar para devolver los objetos razas con sus imagenes
   const arrayRazasConImagenes = [];     
   //recorrer el array con los nombres de razas 
   for (let i=0; i<arrayRazas.length; i++) {
      //extraer la url de la imagen del objeto actual
      let resJSON = await getImagenDeRaza(arrayRazas[i]); 
      let urlImagen = resJSON["message"];
      //nombre de raza actual
      let nombreRaza = arrayRazas[i];
      //crear un objeto por cada imagen y nombre
      let raza = {            
                  urlImagen: urlImagen,
                  nombre: nombreRaza
                 }
      //pasar el objeto raza a array de objetos razas con imagenes
      arrayRazasConImagenes.push(raza); 
   };
   return arrayRazasConImagenes;   
};

export  {getDiezFotosPorNombreRaza, getImagenDeRaza, getTodasRazas, getArrayObjetosTodasRazas};