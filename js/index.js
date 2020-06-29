$(document).ready(function () {
    var listaAlumnos = [];

    //Obtener alumnos
    $.ajax({
        url:'http://localhost:3050/listar-alumnos',
        method:'GET'
    }).done(function (data) {
        listaAlumnos = data;

        var option = '';
        for(var i=0;i<listaAlumnos.length;i++){
            option+='<option value="'+listaAlumnos[i].id_alumno+'">'+listaAlumnos[i].nombre+
                ' '+listaAlumnos[i].apellido+'</option>'
        }

        document.getElementById('listaAlumnos').innerHTML= option;

        llenarTabla(listaAlumnos[0].id_alumno);
    });

    $('#listaAlumnos').change(function (id) {
        var idAlumno=id.target.value;
        llenarTabla(idAlumno);
    });

    function llenarTabla(idAlumno) {

        var listaNotas = [];

        $.ajax({
            url:'http://localhost:3050/listar-cursos',
            method:'GET'
        }).done(function (data) {

            for(var i =0;i<data.length;i++){
                var notas = {
                    id: data[i].id_curso,
                    asignatura:data[i].nombre,
                    notas:[]
                };

                listaNotas.push(notas);

                $.ajax({
                    url:'http://localhost:3050/buscar-notas/'+idAlumno+'/'+listaNotas[i].id,
                    method:'GET'
                }).done(function (response) {

                    for(var i=0;i<response.length;i++){
                        listaNotas[i].notas.push(response[i].nota);
                    }

                    var index = 0;

                    for(var i =0;i<listaNotas.length;i++){
                        if(index<listaNotas[i].notas.length){
                            index = listaNotas[i].notas.length;
                        }
                    }

                    var encabezado = '<th scope="col">Asignatura</th>'

                    for(var i=0;i<index;i++){
                        encabezado+='<th scope="col">Nota '+(i+1)+'</th>'
                    }

                    encabezado = encabezado+'<th>Promedio</th>'

                    document.getElementById('encabezado').innerHTML=encabezado;

                    var tableBody='';

                    for(var i=0;i<listaNotas.length;i++){
                        tableBody+='<tr><th scope="row">'+listaNotas[i].asignatura+'</th>'

                        var sumaNotas =0;

                        for(var e=0;e<index;e++){
                            if(listaNotas[i].notas[e]==null){
                                tableBody+='<td>-</td>';
                            }else{
                                tableBody+='<td>'+listaNotas[i].notas[e]+'</td>';
                                sumaNotas+=listaNotas[i].notas[e];
                            }
                        }

                        if(sumaNotas==0){
                            tableBody+='<td>-</td>';
                        }else{
                            tableBody+='<td>'+(Math.round(sumaNotas/index))+'</td>'
                        }

                        tableBody+='</tr>';
                    }

                    document.getElementById('tableBody').innerHTML=tableBody;
                });
            }
        });
    }
});