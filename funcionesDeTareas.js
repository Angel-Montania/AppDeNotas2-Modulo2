const fs = require("fs");
const process = require("process");
let ejecucion = process.argv[2]
process.argv[2] == undefined? ejecucion = process.argv[2] : ejecucion = ejecucion.toLowerCase();
let parametro1 = process.argv[3]
let parametro2 = process.argv[4]
let parametro3 = process.argv[5]

function funcionalidadAppTareas(){
    fs.readFile('./tareas.json', 'utf-8', function (err, data) {
        if (err) {
            console.log(err)
        } else {
            let JSONparseado = JSON.parse(data);
            switch(ejecucion) {
                case "listar":
                    console.log(" ")
                    console.log("LISTADO DE TAREAS")
                    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
                    if(!JSONparseado.length) {
                        console.log("LA LISTA ESTA VACIA")
                    } else {
                        JSONparseado.forEach(element => {
                            console.log(element)
                        })
                    }
                    ;
                    break;
                case "crear":
                    function agregarTarea (titulo, estado, extra) {
                        if(extra) {
                                JSONparseado.push({
                                    titulo: titulo.toLowerCase(),
                                    estado: estado.toLowerCase() + " " + extra.toLowerCase()
                            });
                            console.log(" ");
                            console.log("Titulo: " + titulo + "   -----   Estado: " + estado + " " + extra);
                        } else { 
                            JSONparseado.push({
                                titulo: titulo.toLowerCase(),
                                estado: estado.toLowerCase()
                            });
                            console.log(" ");
                            console.log("Titulo: " + titulo + "   -----   Estado: " + estado);
                        };
                        fs.writeFileSync("./tareas.json", JSON.stringify(JSONparseado), "utf-8");
                        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~TAREA AGREGADA~~~~~~~~~~~~~~~~~~~~~~~~~");
                    };
                    agregarTarea(parametro1, parametro2, parametro3);
                    break;
                case "filtrar":
                    let JSONFiltrado = JSONparseado.filter(elemento => {
                        return elemento.estado == parametro1 || elemento.estado == parametro1 + " " + parametro2
                    });
                    console.log(" ");
                    console.log("~~~~TAREAS FILTRADAS~~~~")
                    JSONFiltrado.length? JSONFiltrado.forEach(elemento => console.log(elemento)): console.log("No ingreso el estado correctamente")
                    break;
                case "eliminar":
                    for(let i = 0; i < JSONparseado.length; i++) {
                            if(JSONparseado[i].titulo == parametro1 || JSONparseado[i].titulo.indexOf(parametro1) != -1){
                                JSONparseado.splice(i,1) 
                            } else {};
                        };
                        /* function eliminar (arreglo, titulo) { for(let i = 0; i < arreglo.length; i++) { if(arreglo[i].titulo === titulo){ arreglo.splice(i,1) } else {} } return arr } */
                    fs.writeFileSync("./tareas.json", JSON.stringify(JSONparseado), "utf-8");
                    console.log("");
                    console.log("~~~~TAREAS ACTUALES~~~~");
                    console.log(JSONparseado)
                    break;
                case undefined:
                    console.log(" ")
                    console.log("Atención - Tienes que pasar una acción.");
                    break;
                default:
                    console.log(" ")
                    console.log("No entiendo qué quieres hacer.");
            }
        }
    })
};

module.exports = funcionalidadAppTareas;