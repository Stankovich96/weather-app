import cloudyWeather from './cloudyCard.js';
import rainyWeather from './rainyCard.js';
import sunnyWeather from './sunnyCard.js';

function hideIndexPage(){
    document.querySelectorAll('#welcome-header, #welcome-text-box, #welcome-footer').forEach(function (query) {
        query.style.display = 'none';
    });
}

function hideWeatherCards(){
    document.querySelectorAll('#cloudy-weather-card, #rainy-weather-card, #sunny-weather-card').forEach(function (query) {
        query.style.display = 'none';
    });
}

export default function weatherCard(weatherData, reverseAddress){
    if ((weatherData.weather[0].description.includes("clouds") || weatherData.weather[0].description.includes("clear"))) {
        hideIndexPage();
        cloudyWeather(weatherData, reverseAddress);
        hideWeatherCards();
        document.querySelector('#cloudy-weather-card').style.display = 'flex';     
    }

    if (weatherData.weather[0].description.includes("rain")) {
        hideIndexPage();
        rainyWeather(weatherData, reverseAddress);
        hideWeatherCards();
        document.querySelector('#rainy-weather-card').style.display = 'flex';     
    }

    if (weatherData.weather[0].description.includes("sunny")) {
        hideIndexPage();
        sunnyWeather(weatherData, reverseAddress);
        hideWeatherCards();
        document.querySelector('#sunny-weather-card').style.display = 'flex';     
    }
}
