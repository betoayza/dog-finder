//ESTE ARCHIVO SE CONECTA CON LA API DE RAZAS
//(solo van las definiciones de las funciones
//La invocacion va en index.js)

import fetch from "node-fetch";

const handleFetch = async url => {
   //fetch ya de por si retorna una Promesa
   const res = fetch(url);
   //Se maneja la Promesa en caso de errores
   return await handleError(res);
}

const handleError = response => {
   if (!response.ok) {
      throw new Error(response.statusText);
   }
   return response;
}

//Retorna una Promesa que será manejada desde la invocación
const buscarRazaPorNombre = nombreRaza => {
   const url = `https://dog.ceo/api/breed/${nombreRaza}/images/random`;
   //Se devuelve el manjejo de Fetch
   return handleFetch(url)
            .then(res => {
               res.json();
            })
            .catch(error => {
               error.json();
            })
};

export default buscarRazaPorNombre;