const argv = require("yargs").options({
    direccion: {
        alias: 'd',
        desc: 'Direccion de la ciudad para obtener clima',
        demand: true
    }
}).argv;

const lugar = require('./lugar/lugar.js');
const clima = require('./clima/clima.js');

const dire = argv.direccion;
// se obtiene la direccion del yargs

// mostramos la direccion obtenido con yargs al argv
// console.log(argv.direccion);

//luego se pasa la direccion a la funcion creada
//lugar.getLatLong(dire);

//lugar.getLatLongSegunAPI(dire);

// lugar.getLatLongSegunAPI_asyncAwait(dire)
//     .then(resp => {
//         console.log("\n**** SEGUN API (Async + Await) ****");
//         console.log(resp);

//         clima.getClima(resp.lat, resp.long)
//             .then(salida => {
//                 console.log(`Temperatura actual: ${salida} grados Celsius`);
//             })
//             .catch(err => console.log(err));
//     })
//     .catch(errin => console.log(errin));

const getInfo = async(direccion) => {

    try {
        const coords = await lugar.getLatLongSegunAPI_asyncAwait(direccion);
        const temp = await clima.getClima(coords.lat, coords.long);
        return `El Clima de ${coords.localidad} - ${coords.pais} es de ${temp} º Celsius`;
    } catch (e) {
        return `No se pudo determinar el clima de ${direccion}`;
    }
}


getInfo(dire)
    .then(console.log)
    .catch(e => console.log);