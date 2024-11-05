const apiKey = window.API_KEY; // Gio's OpenWeatherMap API keys

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
                
                //Get the appropriate weather icon
                const iconCode = data.weather[0].icon;
                const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

                //const weatherCondition = data.weather[0].main.toLowerCase(); // Main weather condition (e.g., Rain, Snow)
                //let gifUrl = '';

                // You can customize this mapping based on your available GIFs
                // if (weatherCondition.includes('rain')) {
                //     gifUrl = './Weather_Gifs/rain.gif';
                // } else if (weatherCondition.includes('clear')) {
                //     gifUrl = './Weather_Gifs/sun.gif';
                // } else if (weatherCondition.includes('snow')) {
                //     gifUrl = './Weather_Gifs/snow.gif';
                // } else if (weatherCondition.includes('clouds')) {
                //     gifUrl = './Weather_Gifs/cloudy.gif';
                // } else if (weatherCondition.includes('thunderstorm')) {
                //     gifUrl = './Weather_Gifs/storm.gif';
                // } else if (weatherCondition.includes('drizzle')) {
                //     gifUrl = './Weather_Gifs/rain.gif';
                // } else if (weatherCondition.includes('evening')) {
                //     gifUrl = './Weather_Gifs/night.gif';
                // } else {
                //     gifUrl = './Weather_Gifs/default.gif'; // A default GIF if none match
                // }

                const weatherResult = `
                    <h2>Weather in ${data.name}</h2>
                    <img src="${iconUrl}" alt="${data.weather[0].description}">
                    <p>Temperature: ${data.main.temp}${unit_label}</p>
                    <p>Weather: ${data.weather[0].description}</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                    <p>Wind Speed: ${data.wind.speed}${wind_speed_label}</p>
                `;

                //<img src="${gifUrl}" alt="Weather animation" class="weather-gif"> //ADD this above in last string template literal to use gifURL
                
                document.getElementById('weatherResult').innerHTML = weatherResult;
            } else {
                document.getElementById('weatherResult').innerHTML = `<p>City cannot be found!</p>`;
            }
        })
        .catch(error => console.log('Error:', error));
});