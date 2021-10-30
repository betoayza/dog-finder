import express from 'express';
import hbs from 'hbs';
const app = express();
import {getDiezFotosPorNombreRaza, getImagenDeRaza, getTodasRazas, getArrayObjetosTodasRazas} from './data/manejarBusqueda.js';
//import mostrarRazasDisponibles from './data/manejarBusqueda.js'; 

// Establece motor de plantillas
app.set('view engine', 'hbs');
// Registrar dónde están las vistas parciales
hbs.registerPartials('./views', error => {
    console.log(error)
});

//CONFIGURACIONES
app.set('port', process.env.PORT || 3000);


//MIDDLEWARE

// Habilita la carpeta public para servir contenido estático
//app.use(express.static('./public'));

// Middleware para parsear el cuerpo de las peticiones HTTP
app.use(express.urlencoded({
    extended: true
}))

//RUTAS
//RUTAS PARA EL CLIENTE (NAVEGADOR)
app.get('/', (req, res) => {
    //res.send('Pagina Principal');
    res.render('home', {
        nombrePagina: 'BuscaPerros.com'
    });
});

app.get('/catalogoRazas', async (req, res) => {
    try{
        //devuelve un array de objetos  
        const arrayObjetosRaza = await getTodasRazas();     
        //console.log(razasTotales);       
        res.render('catalogoRazas', { arrayObjetosRaza } );
    }catch(error){
        res.send("Un error ha ocurrido!: " + error);
    }    
});

//mostrar 'home' para peticion GET
app.get('/home', (req, res) => { //en post vale el res.send()     
    res.render('home');
});

//respuesta al cliente mediante peticion get
app.get('/resultadoBusqueda', async (req, res) => {
    try {
        const {
               raza2 //debe coincidir con el name del input
              } = req.query; //recibe la solicitd GET y extrae el valor de la clave "raza"
        //Pasar cualquier busqueda a minusculas para evitar el case-sensitive
        
        //Devuelve una Promesa que se guardará en "respuesta"
        const diezFotosRaza = await getDiezFotosPorNombreRaza(raza2.toLowerCase());   
        console.log(diezFotosRaza);                                 
        //muestra la pagina con la respuesta 
        res.render('resultadoBusqueda', { diezFotosRaza, raza2 } );
    } catch (error) {
        console.error(error);
        res.send("El error es : " + error);
    }
});



//Rutas por default para cualquier peticion GET
app.get('*', (req, res) => {
    //muestra plantilla 404 en las rutas no especificadas
    //res.render('404');
    res.render('error404');
});

//SERVIDOR
app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000 ...', 'hola');
});