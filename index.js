const express = require ('express');
const hbs = require('hbs');
const app = express();

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
    res.render('home', { nombrePagina: 'CatalogoRazas'});
}); 

app.get('/resultadoBusqueda', (req, res) => {
    //res.send('Pagina Principal');
    res.render('home', { nombrePagina: 'ResultadoBusqueda'});
}); 

app.get('*', (req, res) => {
    //muestra plantilla 404 en las rutas no especificadas
    //res.render('404');
    res.render('error404.hbs');
});

//RUTAS PARA EL SERVIDOR
//petition post para agregar recurso al servidor
app.post('/resultadoBusqueda', (req, res) => {         
    try {
        const { //extraigo del body los campos que me interesan (todos) de la petición post
            codigo,  //si voy a mandar por formulario, este campo debe coincidir con la propiedad "name" del input
            legajo,  //idem
            apellido, //idem
            nombre    //idem
        } = req.body; 
        altaAlumno({ //creo un nuevo objeto alumno con los campos extraidos 
            "cod_carrera": codigo,
            "legajo": legajo,
            "apellido": apellido,
            "nombre": nombre
        });
        console.log(alumnos);
        res.send('Alta exitosa!');        
    } catch (error) {
        res.send(error);
    }
});

//SERVIDOR
app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000 ...', 'hola');
});
