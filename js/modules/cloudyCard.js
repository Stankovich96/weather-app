import weatherCanvas from './weatherCardValues.js';

export default function cloudyWeather(weatherReport, reverseAddress){
    const card = document.querySelector('#cloudy-weather-card');
    const cardThumbnail = document.querySelector('#cloudy-weather-card .second-column');
    weatherCanvas(weatherReport, card, cardThumbnail, reverseAddress);
}