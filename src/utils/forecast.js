const request = require("request");
const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=ca43497f8832d96b97f8c1207aa3b517&query=" +
    latitude +
    "," +
    longitude +
    "&units=m";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions}, there is currently ${body.current.temperature} degree outside and there is ${body.current.precip} % chances to rain .`
      );
    }
  });
};
module.exports = forecast;
