const fetch = require('node-fetch');

const forcast = async (city) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=53ca1592c73901f661614a1686afd44b&units=metric`;
  try {
    const response = await fetch(url);
    const weather = await response.json();
    const { cod, message } = weather;
    return cod && message ? message : weather;
  } catch (err) {
    return 'Check your connection';
  }
};

module.exports = forcast;
