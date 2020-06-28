//Importaciones
const fs = require('fs');

class DatosConfiguracion{

    constructor() {
    }

    getData(callback){

        fs.readFile('database_config.json','utf-8', (error,data) =>{
            if(error) throw error;
            callback(JSON.parse(data));
        });
    }

}

module.exports = DatosConfiguracion;