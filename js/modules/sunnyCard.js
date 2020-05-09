import weatherCanvas from './weatherCardValues.js';

export default function sunnyWeather(weatherReport, reverseAddress){
    const card = document.querySelector('#sunny-weather-card');
    const cardThumbnail = document.querySelector('#sunny-weather-card .second-column');
    weatherCanvas(weatherReport, card, cardThumbnail, reverseAddress);
}