const mysql = require('mysql');

class Mysql {

    bdConection;

    constructor(host,user,password,bd) {
        this.bdConection=mysql.createConnection({
           host:host,
           user:user,
           password:password,
           database:bd
        });
    }

    connectBd(){
        this.bdConection.connect(error =>{
            if(error) throw error;
            console.log('Conexion a bd exitosa');
        });
    }

    listarAlumnos(callback){
        const sql = 'SELECT * FROM alumnos'
        this.bdConection.query(sql, (error,results)=>{
            if(error) throw error;

            callback(results);
        });
    }

    buscarNotas(idUsuario,idCurso,callback){
        const sql = 'SELECT * FROM notas WHERE id_alumno = ? AND id_curso = ?'
        this.bdConection.query(sql,[idUsuario,idCurso],(error,results)=>{
           if(error) throw error;

           callback(results);
        });
    }

    listarCursos(callback){
        const sql = 'SELECT * FROM cursos'
        this.bdConection.query(sql,(error,results)=>{
           if(error) throw error;

           callback(results);
        });
    }

}

module.exports=Mysql;