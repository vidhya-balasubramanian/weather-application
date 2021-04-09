const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require('./helper').geocode;
const forecast = require('./helper').forecast;

const port = process.env.PORT || 4000;

const app = express();
const publicPath = path.join(__dirname, '../public');
console.log('public '+ publicPath)
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// for using public folder 
app.use(express.static(publicPath));

app.get("", (req, res) => {
  res.render("weather", {
    title: 'Weather',
    createdBy: 'vidhya'
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: 'About',
    createdBy: 'vidhya'
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: 'Help',
    createdBy: 'vidhya'
  });
});

app.get("/help/*", (req, res) => {
  res.render("placeholder", {
    title: 'Help article not found'
  });
});

app.get("/weather", (req, res) => {
  const query = req.query;
  if (!query.address) {
    return res.send({
      error: 'Please provide an address'
    })
  }
  geocode(query.address, (geocodeError, {latitude, longitude, placeName} = {}) => {
    console.log(`Error ${geocodeError}`);
    if (geocodeError) {
      return res.send({
        error: geocodeError
      })
    }
    else {
      forecast(latitude, longitude, (forecastError, forecastData) => {
        if (forecastError) {
          return res.send({
            error: forecastError
          })
        } else if (forecastData) {
          res.send({
            forecast: forecastData,
            location: placeName,
            address: query.address
          });
        }
      })
    }
  });
  
})
app.get("*", (req, res) => {
  res.render("placeholder", {
    title: 'This is 404 page'
  });
});

const staticHtml = path.join(__dirname, '../public/static.html');

app.get("/static", (req, res) => {
  res.send(staticHtml);
});

app.listen(port, () => {
  console.log(`Server is up in ${port} server`);
});


// set localhost title and favicon 