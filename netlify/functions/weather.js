const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  const { city, units } = event.queryStringParameters;
  const apiKey = process.env.API_KEY; // Securely retrieve the API key from environment variables

  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`);
  const data = await response.json();

  if (data.cod === 200) {
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } else {
    return {
      statusCode: data.cod,
      body: JSON.stringify({ message: 'City not found!' }),
    };
  }
};
