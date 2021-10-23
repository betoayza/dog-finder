//ESTE ARCHIVO SE CONECTA CON LA API DE RAZAS
//(solo van las definiciones de las funciones
//La invocacion va en index.js)

const handleFetch = async url => {
   const res = fetch(url);
   return await handleError(res);
}

const handleError = response => {
   if(!response.ok){
      throw new Error(response.statusText);
   }
   return response;
}

const buscarRazaPorNombre = nombreRaza => {
   return new Promise( (resolve, reject) => {
      const url = `https://dog.ceo/api/breed/${nombreRaza}/images/random`;
      handleFetch(url)
            .then(res => { console.log(res); resolve(res) })
            .catch(error => { reject (error); })         
   })
};

module.exports = { buscarRazaPorNombre }; 
   



