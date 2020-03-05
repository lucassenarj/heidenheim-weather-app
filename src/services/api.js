import axios from 'axios'

const path = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/ace1850ec41cb58a4bc938b4c440d58d'

const getWeatherInfo = async () => {
  return await axios.get(`${path}/42.3601,-71.0589`, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*'
    }
  })
  .then(response => {
    return {
      status: true,
      response: response.data
    };
  }).catch((error) => {
    return {
      status: false,
      error
    };
  });
}

export {
  getWeatherInfo
}