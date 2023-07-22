const request = require("postman-request");

const url =
  "http://api.weatherstack.com/current?access_key=c3046b32be6d569c31c0d94402eb64b1&query=37.8267,-122.4233";

request({ url, json: true }, (error, response) => {
  console.log(
    response.body.current.weather_descriptions[0] +
      ". It is currently " +
      response.body.current.temperature +
      " degress out. It feels like " +
      response.body.current.feelslike +
      " degrees out."
  );
});

const searchUrl = `https://geocode.maps.co/search?q=los+Angeles`;
request(
  { url: searchUrl, json: true },
  (error, response) => {
    console.log(response.body[0].lat, response.body[0].lon);
  }
);
