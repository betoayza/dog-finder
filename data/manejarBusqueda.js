//ESTE ARCHIVO SE CONECTA CON LA API DE RAZAS
//(solo van las definiciones de las funciones
//La invocacion va en index.js)

const handleFetch = (url) => {
   return fetch(url)
      .then(handleError)
};

const handleError = response => {
   if(!response.ok){
      throw new Error(response.statusText);
   }
   return response;
};

const buscarRazaPorNombre = async nombreRaza => {
   const url = `https://dog.ceo/api/breed/${nombreRaza}/images/random`;
   handleFetch(url)
      .then(res => {console.log(res.json()); return res;})
      //.then(resJSON => {return res.json();})
      .catch(error => {console.error(error);})
};

module.exports = { buscarRazaPorNombre };
   



