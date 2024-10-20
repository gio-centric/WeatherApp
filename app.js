const apiKey = process.env.API_KEY;

document.getElementById('weatherForm').addEventListener('submit', function(e) {
    e.preventDefault(); // To prevent page refresh

    const city = document.getElementById('city').value;
    const units = document.getElementById('units').value;
    
    fetch(`/.netlify/functions/weather?city=${city}&units=${units}`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                const unit_label = units === 'metric' ? '°C' : '°F';
                const wind_speed_label = units === 'metric' ? 'm/s' : 'mph';
                const weatherResult = `
                    <h2>Weather in ${data.name}</h2>
                    <p>Temperature: ${data.main.temp}${unit_label}</p>
                    <p>Weather: ${data.weather[0].description}</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                    <p>Wind Speed: ${data.wind.speed}${wind_speed_label}</p>
                `;
                document.getElementById('weatherResult').innerHTML = weatherResult;
            } else {
                document.getElementById('weatherResult').innerHTML = `<p>City cannot be found!</p>`;
            }
        })
        .catch(error => console.log('Error:', error));
});
