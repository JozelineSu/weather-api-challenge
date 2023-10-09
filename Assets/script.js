const mainCard = document.querySelector('.city-card');
const weatherCards = document.querySelector('.weather-cards');
const searchButton = document.querySelector('.search-button');
const contentDiv = document.querySelector('.content');

const cityInput = document.querySelector('#cityInput');




searchButton.addEventListener('click', (e) => {
  e.preventDefault();
  const city = cityInput.value;
  const apiKey = '3557814581c42da838a31e2f756f4234';
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
    mainCard.innerHTML = '';
    weatherCards.innerHTML = '';

    const forecastList = data.list;

    for (let i = 0; i < 6; i++) {
      const forecast = forecastList[i];
      const date = forecast.dt_txt;
      const temperature = forecast.main.temp;
      const windSpeed = forecast.wind.speed;
      const humidity = forecast.main.humidity;
      console.log(data);

      if (i === 0) {
        const cardHeader = document.createElement('section');
        cardHeader.innerHTML = '<h1>' + city + ' ' + '(' + date + ')' + '</h1>' +
                                  '<h4>Temp: ' + temperature + 'F</h4>'
                                  + '<h4>Wind: ' + windSpeed + 'MPH</h4>'
                                  + '<h4>Humidity: ' + humidity + '%</h4>';
        mainCard.appendChild(cardHeader);
        
      } else {
        const card = document.createElement('section');
        card.innerHTML = '<h4>' + date + '</h4>' +
                            '<h4>Temp: ' + temperature + 'F</h4>'
                            + '<h4>Wind: ' + windSpeed + 'MPH</h4>'
                            + '<h4>Humidity: ' + humidity + '%</h4>';
        weatherCards.appendChild(card);                      
      }                 
    } 
    
    })
    .catch((error) => {
    console.error('There was a problem with the fetch operation:', error);
    })
})
  