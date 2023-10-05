const mainCard = document.querySelector('.city-card');
const weatherCards = document.querySelector('.weather-cards');
const searchButton = document.querySelector('.search-button');
let cityInput = document.querySelector('#cityInput');


const apiKey = '3557814581c42da838a31e2f756f4234';
const city = 'New York'; // Replace with the city you want weather data for

// Construct the API URL
const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

// Make the API request
fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => {
    // Handle the weather data here
    const forecastList = data.list;

    for (let i = 0; i < 6; i++) {
      const forecast = forecastList[i];
      const date = forecast.td_txt;
      const temperature = forecast.main.temp;
      const windSpeed = forecast.wind.speed;
      const humidity = forecast.main.humidity;

      if (i ===0) {
        const cardHeader = document.createElement('section');
        cardHeader.innerHTML = '<h1>' + city + date + '</h1>' +
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
  });






//const apiKey = '3557814581c42da838a31e2f756f4234';
//const apiURL = 'https://api.openweathermap.org/data/2.5/forecast?q='+ newName.value +'&appid=3557814581c42da838a31e2f756f4234';

