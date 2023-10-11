const mainCard = document.querySelector('.city-card');
const weatherCards = document.querySelector('.weather-cards');
const searchButton = document.querySelector('.search-button');
const contentDiv = document.querySelector('.content');

const cityInput = document.querySelector('#cityInput');
const city = cityInput.value;
const apiKey = '3557814581c42da838a31e2f756f4234'; // API key for OpenWeatherMap API
const apiUrl= `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;


searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  
  fetch(apiUrl)
    .then(response => 
      response.json())
    .then(data => {

      const forecastDays = [];
      const fiveDaysForecast = data.list.filter(forecast => {
          const forecastDate = new Date(forecast.dt_txt).getDate();
          if (!forecastDays.includes(forecastDate)) {
                return forecastDays.push(forecastDate);
            }
        });
 
        cityInput.value = "";
        mainCard.innerHTML = "";
        weatherCards.innerHTML = "";

        fiveDaysForecast.forEach((forecast, index) => {
          
      const date = forecast.dt_txt.split(" ")[0];
      const temperature = forecast.main.temp;
      const windSpeed = forecast.wind.speed;
      const humidity = forecast.main.humidity;
      
      if (index === 0) {
        const cardHeader = document.createElement('section');
        cardHeader.innerHTML = '<h1>' + city + ' ' + '(' + date + ')' + '</h1>' +
                                  '<h4>Temp: ' + temperature + ' F</h4>'
                                  + '<h4>Wind: ' + windSpeed + ' MPH</h4>'
                                  + '<h4>Humidity: ' + humidity + ' %</h4>';
        mainCard.appendChild(cardHeader);
        
      } else {
        const card = document.createElement('section');
        card.innerHTML = '<h4>' + date + '</h4>' +
                            '<h4>Temp: ' + temperature + ' F</h4>'
                            + '<h4>Wind: ' + windSpeed + ' MPH</h4>'
                            + '<h4>Humidity: ' + humidity + ' %</h4>';
        weatherCards.appendChild(card);                      
      }        
      }); 
        
    })
    .catch((error) => {
        console.log('Unable to fetch data from api', error);
    });
}
)




