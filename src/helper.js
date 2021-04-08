const request = require("postman-request");

const geocode = (address, callback) => {
  const latLongUrl = `http://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoidmlkaHlhMTcwNiIsImEiOiJja21xOWVzc2swb3BkMnZxcGNtcThud281In0.ihfDvqKi4NVuykIB6cHDrA&limit=1s`;
  request({ url: latLongUrl, json: true }, (error, response) => {
    console.log;
    if (error) {
      callback("Unable to connect to mapbox.com!");
    } else if (response.statusCode === 404) {
      callback("Details not found");
    } else if (!response?.body?.features?.length) {
      callback("Unable to find your location! Try searching different one");
    } else {
      const rawData = response.body;
      const lon = rawData.features[0].center[0];
      const lat = rawData.features[0].center[1];
      callback(undefined, {
        latitude: lat,
        longitude: lon,
        placeName: rawData.features[0].place_name,
      });
    }
  });
};

const forecast = (lat, lon, callback) => {
  const weatherAPIUrl = `http://api.weatherstack.com/current?access_key=7100f3bb1048078feb3550e5084c5a1e&query=${lat},${lon}&units=f`;
  console.log(`weatherAPIUrl ${weatherAPIUrl}`)
  request({ url: weatherAPIUrl, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service!");
    } else if (response.body.error) {
      callback(response.body.error.info);
    } else {
      const rawData = response.body;
      callback(undefined,
        `${rawData.current.weather_descriptions[0]}. It is currently ${rawData.current.temperature} degress out. It feels like ${rawData.current.feelslike} degrees out`
      );
    }
  });
};

module.exports = {
  geocode: geocode,
  forecast: forecast
}