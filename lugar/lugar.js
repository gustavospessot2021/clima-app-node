const axios = require('axios');
const axiosAPI = require("axios").default;



const getLatLongSegunAPI = (direccion) => {

    // pasando a URL seguro
    const encodeURL_localidad = encodeURI(direccion);

    const options = {
        method: 'GET',
        url: 'https://yahoo-weather5.p.rapidapi.com/weather',
        params: { location: encodeURL_localidad, format: 'json', u: 'c' },
        headers: {
            'x-rapidapi-key': '1de49ffe60mshc79f023ec26f1d0p1c7839jsn7ce95b08cec9',
            'x-rapidapi-host': 'yahoo-weather5.p.rapidapi.com'
        }
    };

    axiosAPI.request(options).then(function(response) {
        console.log("\n**** SEGUN API ****");
        //console.log(response.data);
        let datos = response.data;
        let lati = datos.location.lat;
        let longi = datos.location.long;
        console.log(lati);
        console.log(longi);

    }).catch(function(error) {
        console.error("Error buscando la Lat y Long", error);
    });

}

const getLatLongSegunAPI_asyncAwait = async(direccion) => {

    // pasando a URL seguro
    const encodeURL_localidad = encodeURI(direccion);

    const options = {
        method: 'GET',
        url: 'https://yahoo-weather5.p.rapidapi.com/weather',
        params: { location: encodeURL_localidad, format: 'json', u: 'c' },
        headers: {
            'x-rapidapi-key': '1de49ffe60mshc79f023ec26f1d0p1c7839jsn7ce95b08cec9',
            'x-rapidapi-host': 'yahoo-weather5.p.rapidapi.com'
        }
    };

    // axiosAPI.request(options).then(function(response) {
    //     console.log("\n**** SEGUN API (Async + Await) ****");
    //     console.log(response.data);
    // }).catch(function(error) {
    //     console.error(error);
    // });

    const resp = await axiosAPI.request(options);

    if (resp.data.lenght === 0) {
        throw new Error(`No hay resultados para ${direccion}`);
    }


    const datos = resp.data;
    //console.log(datos);
    const pais_extraida = datos.location.country;
    const direc_extraida = datos.location.city;
    const lat_extraida = datos.location.lat;
    const long_extraida = datos.location.long;

    return {
        localidad: direc_extraida,
        pais: pais_extraida,
        lat: lat_extraida,
        long: long_extraida
    };
}


//viene a direccion la informacion de argv.direccion
const getLatLong = (direccion) => {

    // pasando a URL seguro
    const encodeURL_localidad = encodeURI(direccion);

    const instance = axios.create({
        baseURL: `https://yahoo-weather5.p.rapidapi.com/weather?location=${encodeURL_localidad}`,
        headers: {
            "x-rapidapi-key": "1de49ffe60mshc79f023ec26f1d0p1c7839jsn7ce95b08cec9",
            "x-rapidapi-host": "yahoo-weather5.p.rapidapi.com",
            "useQueryString": true
        }
        //params: { format: 'json', u: 'f' },
    });


    //const resp = await instance.get();

    instance.get()
        .then(resp => {
            //console.log(clima);
            let clima = resp.data; // Toda la informacion del clima
            let lat = clima.location.lat;
            let long = clima.location.long;

            console.log("\n**** SEGUN CURSO ****");
            console.log("LATITUD: ", lat);
            console.log("LONGITUD: ", long);

            // console.log("*** Localidad ***\n", clima.location);
            // console.log("*** Actual ***\n", clima.current_observation);
            // console.log("*** Hoy ***\n", clima.forecasts[0]);
            // console.log("*** Mañana ***\n", clima.forecasts[1]);
            // console.log("*** Pasado mañana ***\n", clima.forecasts[2]);
            // console.log("*** Día" + clima.forecasts[3].day + " ***\n");
            // console.log(clima.forecasts[3]);

        })
        .catch(err => {
            console.log('ERROR!!!', err);

        });

}




module.exports = {
    getLatLong,
    getLatLongSegunAPI,
    getLatLongSegunAPI_asyncAwait
}