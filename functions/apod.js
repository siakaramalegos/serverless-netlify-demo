const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  const { date } = JSON.parse(event.body);
  const BASE_URL = "https://api.nasa.gov/planetary/apod";

  // https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY
  return fetch(`${BASE_URL}?api_key=${process.env.NASA_API_KEY}&date=${date}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response not ok");
      }
      return response.json();
    })
    .then((json) => {
      return {
        statusCode: 200,
        body: JSON.stringify(json),
      };
    })
    .catch((error) => {
      console.error({ error });

      return {
        statusCode: 500,
        body: JSON.stringify({ error }),
      };
    });
};
