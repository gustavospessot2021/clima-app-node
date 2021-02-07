const axios = require('axios');


const getClima = async(lat, long) => {


    const resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=df9d86884ac72e57c7d9f662fc5d0635&units=metric`);

    return resp.data.main.temp;
}



module.exports = {
    getClima
}