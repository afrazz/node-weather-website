const fetchWeather = (location) => {
  return fetch(`http://localhost:3000/weather?location=${location}`)
    .then((res) => res.json())
    .then((data) => data)
    .catch(console.log);
};

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message = document.querySelector('#message');

weatherForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const location = search.value;
  const weatherData = await fetchWeather(location);
  console.log(weatherData);
  if (weatherData.location) {
    message.textContent = `${weatherData.location} has a weather of ${weatherData.weather} and ${weatherData.forcast}`;
  } else {
    message.textContent = weatherData;
  }
});
