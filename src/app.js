const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forcast = require('./utils/forcast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views'); // It's like screen
const partialsPath = path.join(__dirname, '../templates/partials'); //It's like components

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath); // setting partial config

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Afras',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Afras',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'You can get help from here',
    title: 'Help',
    name: 'Afras',
  });
});

app.get('/weather', async (req, res) => {
  const { location } = req.query;
  if (!location) {
    return res.status(400).json('Must provide a location');
  }
  const result = await forcast(location);
  if (result?.weather) {
    res.json({
      location: location,
      weather: result.main.temp + 'C',
      forcast: result.weather[0].description,
    });
  } else {
    res.status(400).json(result);
  }
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Afras',
    errorMessage: 'Help article not found',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Afras',
    errorMessage: 'Page not found',
  });
});

app.listen(port, () => {
  console.log('Server is up on' + port);
});
