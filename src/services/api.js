import axios from 'axios'

const path = 'https://api.darksky.net/forecast/ace1850ec41cb58a4bc938b4c440d58d'

const getWeatherInfo = async () => {
  return await axios.get(`${path}/42.3601,-71.0589`, {
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    }
  })
  .then(response => {
    return response.data;
  }).catch((error) => {
    return error;
  });
}

export {
  getWeatherInfo
}