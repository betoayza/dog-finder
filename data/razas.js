//ESTE ARCHIVO SE CONECTA CON LA API DE RAZAS

const razas = [   
    {
       "cod_raza": "1",
       "nombre": "Caniche",
       "pais": "Francia"
    },
    {
       "cod_raza": "2",
       "nombre": "Pastor aleman",
       "pais": "Alemania",
       
    },
    {
       "cod_raza": "3",
       "nombre": "Dogo",
       "pais": "Argentina",
    }
 ];

const buscarRazaPorNombre = nombre => {
      razas.filter(nom => {nom.nombre = nombre} );
};