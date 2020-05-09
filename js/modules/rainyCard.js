import weatherCanvas from './weatherCardValues.js';

export default function rainyWeather(weatherReport, reverseAddress){
    const card = document.querySelector('#rainy-weather-card');
    const cardThumbnail = document.querySelector('#rainy-weather-card .second-column');
    weatherCanvas(weatherReport, card, cardThumbnail, reverseAddress);
}