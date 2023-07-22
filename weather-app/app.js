const request = require("postman-request");

const url =
  "http://api.weatherstack.com/current?access_key=c3046b32be6d569c31c0d94402eb64b1&query=37.8267,-122.4233";

request({ url, json: true }, (error, response) => {
  const data = response.body;
  console.log(data.current);
});
