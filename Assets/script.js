// connect to html document
const mainCard = document.querySelector('.city-card');
const weatherCards = document.querySelector('.weather-cards');
const searchButton = document.querySelector('.search-button');
const contentDiv = document.querySelector('.content');
const cityInput = document.querySelector('#cityInput');

// when user clicks the search button the api will run and html will display
searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  const city = cityInput.value;

  localStorage.setItem("city", JSON.stringify(city)); // saving user searches to local storage
  showPastSearches();

  const apiKey = '3557814581c42da838a31e2f756f4234'; // API key for OpenWeatherMap API
  const apiUrl= `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`; 

  fetch(apiUrl)
    .then(response => 
      response.json())
    .then(data => {
      const forecastDays = []; // the array will hold only the unique days found in the data given by the api to avoid repeats
      const fiveDaysForecast = data.list.filter(forecast => {
          const forecastDate = new Date(forecast.dt_txt).getDate();
          if (!forecastDays.includes(forecastDate)) {
                return forecastDays.push(forecastDate);
            }
        });

      // clearing the values
      cityInput.value = "";
      mainCard.innerHTML = "";
      weatherCards.innerHTML = "";


      // getting info from api and creating the html structure to display it for each index of our array holding the unique dates
      fiveDaysForecast.forEach((forecast, index) => {
      const date = forecast.dt_txt.split(" ")[0];
      const icon = forecast.weather[0].icon;
      const iconUrl = 'https://openweathermap.org/img/wn/' + icon +'.png';
      const temperature = forecast.main.temp;
      const windSpeed = forecast.wind.speed;
      const humidity = forecast.main.humidity;
      
      if (index === 0) {
        const cardHeader = document.createElement('section');
        cardHeader.innerHTML = '<h1>' + city + ' ' + '(' + date + ')' + '<img src= "'+ iconUrl + '">' + '</h1>' +
                                  '<p>Temp: ' + temperature + ' °F</p>'
                                  + '<p>Wind: ' + windSpeed + ' MPH</p>'
                                  + '<p>Humidity: ' + humidity + ' %</p>';
        mainCard.appendChild(cardHeader);
      } else {
        const card = document.createElement('section');
        card.innerHTML = '<h4>' + date + '</h4>'
                            + '<img src= "'+ iconUrl + '">'
                            + '<p>Temp: ' + temperature + ' °F</p>'
                            + '<p>Wind: ' + windSpeed + ' MPH</p>'
                            + '<p>Humidity: ' + humidity + ' %</p>';
        weatherCards.appendChild(card);                      
      }        
      });  
    })
    .catch((error) => {
        console.log('Unable to fetch data from api', error);
    });
}
)

// creates list items for user searches and displays them under search bar
function showPastSearches() {
  var citySearch = JSON.parse(localStorage.getItem("city"));
  
  if (citySearch !== null) {
    const searchList = document.querySelector("#citySearches");
    const listItem = document.createElement('li');
    listItem.textContent = citySearch;
    searchList.appendChild(listItem);

    listItem.addEventListener('click', function() {
      cityInput.value = listItem.textContent;
    }) 
  };
}

// when user reloads their previous search history will display the last city searched
window.addEventListener('load', function() {
  showPastSearches();
});


