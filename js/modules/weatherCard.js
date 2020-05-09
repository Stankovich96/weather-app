import cloudyWeather from './cloudyCard.js';
import rainyWeather from './rainyCard.js';
import sunnyWeather from './sunnyCard.js';

/**
 *  Hides the index page by setting display to none
 */
function hideIndexPage(){
    document.querySelectorAll('#welcome-header, #welcome-text-box, #welcome-footer').forEach(function (query) {
        query.style.display = 'none';
    });
}

/**
 *  Hides all the weather cards container by setting display to none
 */
function hideWeatherCards(){
    document.querySelectorAll('#cloudy-weather-card, #rainy-weather-card, #sunny-weather-card').forEach(function (query) {
        query.style.display = 'none';
    });
}

/**
 *  Checks the condition of the weather API response and a displays suitable page for it
 *  @param {Response} - (weatherData) API response from weather API
 *  @param {Response} - (reverseAddres) API response from reverseGeocoding API
 */
export default function weatherCard(weatherData, reverseAddress){
    if ((weatherData.weather[0].description.includes("clouds") || weatherData.weather[0].description.includes("clear"))) {
        hideIndexPage();
        hideWeatherCards();
        document.querySelector('#cloudy-weather-card').style.display = 'flex';     
        cloudyWeather(weatherData, reverseAddress);
    }

    if (weatherData.weather[0].description.includes("rain") || weatherData.weather[0].description.includes("thunderstorm")) {
        hideIndexPage();
        hideWeatherCards();
        document.querySelector('#rainy-weather-card').style.display = 'flex';     
        rainyWeather(weatherData, reverseAddress);
    }

    if (weatherData.weather[0].description.includes("sunny")) {
        hideIndexPage();
        hideWeatherCards();
        document.querySelector('#sunny-weather-card').style.display = 'flex';     
        sunnyWeather(weatherData, reverseAddress);
    }
}
