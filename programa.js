const opciones ={
    id_materia:{
        alias: 'i',
        demand: true
    },
    nombre_estudiante:{
        alias:'n',
        demand: true
    },
    identificacion_estudiante:{
        alias:'d',
        demand: true
    } 
}

const fs = require('fs')
const argv = require('yargs')
            .command ('inscribir', 'Inscribase a una materia', opciones)
            .argv

const imprimir = (obj,time,callback) => {
    setTimeout(function(){
        callback (`El nombre de la materia es: ${obj.nombre} y su id es: ${obj.id}. La duración de la materia es de: ${obj.duracion} horas y tiene un valor de: ${obj.precio} pesos.`)
    } ,time);
}

let materias = [];
let time = 2000;
materias = [
    {nombre:"Matematicas", precio:20000, duracion:8, id:1},
    {nombre:"Ingles", precio:0, duracion:20, id:2},
    {nombre:"Frances", precio:0, duracion:40, id:3}
]

if (argv.id_materia === undefined){
    for(let i=0;i<materias.length;i++){
       imprimir(materias[i],time,function(resultado){
        console.log(resultado);
        });
        time+=2000;
    }    
}else{
    let materia = materias.find( m => m.id === argv.id_materia);
    if (materia === undefined){
        console.log ('Se ingreso un id de materia incorrecto.')
    }else {
        let crearArchivo = (materia,argv) =>{
            let texto =`El estudiante ${argv.nombre_estudiante} con identificación ${argv.identificacion_estudiante}, se prematriculo a la materia ${materia.nombre} con id ${materia.id}. La duración de la materia es de ${materia.duracion} horas y tiene un valor de ${materia.precio} pesos.`;
            fs.writeFile('prematricula.txt',texto,(err)=>{
               if(err) throw(err);
                console.log('Se creo con exito el archivo');
            });
        }
        crearArchivo(materia,argv);
    }
}

