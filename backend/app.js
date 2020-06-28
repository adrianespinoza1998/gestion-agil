//Importaciones
const moduloMysql = require('./modulos/moduloMysql');
const moduloDatosConf = require('./modulos/moduloDatosConf');
const express = require('express');
const bodyParser = require('body-parser');

//Obtener los datos del archivo de configuracion
const objDatosConf = new moduloDatosConf();
let objMysql;

objDatosConf.getData(function (data) {
    //Llamar a la base de datos
    objMysql = new moduloMysql(data.host,data.user,data.password,data.name);

    objMysql.connectBd();
});

//Configurar el puerto 3050
const PORT = process.env.PORT || 3050;

//Inicializar express
const app = express();

//Habilitar las peticiones post con json
app.use(bodyParser.json());

//Rutas
app.get('/listar-alumnos', (request,response)=>{
    objMysql.listarAlumnos(function (datos) {
        response.json(datos);
    })
});

app.get('/buscar-notas/:id_usuario/:id_curso', (request,response)=>{
    const idUsuario = request.params.id_usuario;
    const idCurso = request.params.id_curso;
    objMysql.buscarNotas(idUsuario,idCurso,function (datos) {
        response.json(datos);
    });
});

app.get('/listar-cursos', (request,response)=>{
   objMysql.listarCursos(function (datos) {
        response.json(datos);
   })
});

//Usar puerto
app.listen(PORT, ()=>{
    console.log('Server utilizando el puerto '+PORT);
});