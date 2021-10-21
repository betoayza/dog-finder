const express = require ('express');
const hbs = require('hbs');
const app = express();
const {buscarRazaPorNombre} = require(`${__dirname}/data/manejarBusqueda.js`);

// Establece motor de plantillas
app.set('view engine', 'hbs');
// Registrar dónde están las vistas parciales
hbs.registerPartials(`${__dirname}/views`, error => {console.log(error)});

//CONFIGURACIONES
app.set('port', process.env.PORT || 3000);


//MIDDLEWARE

//app.use(require('./rutas/rutas'));
// Habilita la carpeta public para servir contenido estático
//app.use(express.static(`${__dirname}/public`));
// Middleware para parsear el cuerpo de las peticiones HTTP
app.use(express.urlencoded({
    extended: true
}))

//RUTAS
//RUTAS PARA EL CLIENTE (NAVEGADOR)
app.get('/', (req, res) => {
    //res.send('Pagina Principal');
    res.render('home', { nombrePagina: 'BuscadorDePerrosOnline'});
});   

app.get('/catalogoRazas', (req, res) => {
    //res.send('Pagina Principal');
    res.render('catalogoRazas', { nombrePagina: 'CatalogoRazas'});
}); 

app.get('/resultadoBusqueda', (req, res) => {
    //res.send('Pagina Principal');
    //const {}

    res.render('resultadoBusqueda', { nombrePagina: 'ResultadoBusqueda'});
}); 

app.get('*', (req, res) => {
    //muestra plantilla 404 en las rutas no especificadas
    //res.render('404');
    res.render('error404.hbs');
});

//RUTAS PARA EL SERVIDOR
//petition post para agregar recurso al servidor
app.post('/resultadoBusqueda', async (req, res) => {    //en post vale el res.send()     
    try {        
        const {
            raza //debe coincidir con el name del input
        } = req.body; 
        const resultado = await buscarRazaPorNombre(raza);
        console.log(resultado);
        //res.send(resultado);        
    } catch (error) {
        res.send(error);
    }
});

//SERVIDOR
app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000 ...', 'hola');
});
