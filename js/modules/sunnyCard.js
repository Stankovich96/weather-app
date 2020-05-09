import weatherCanvas from './weatherCardValues.js';

/**
 *  Paints the sunny weather card with values from weatherReport response and reverseAddress response
 *  @param {Response} - (weatherReport) API response from weather API
 *  @param {Response} - (reverseAddres) API response from reverseGeocoding API
 */
export default function sunnyWeather(weatherReport, reverseAddress){
    const card = document.querySelector('#sunny-weather-card');
    const cardThumbnail = document.querySelector('#sunny-weather-card .second-column');
    weatherCanvas(weatherReport, card, cardThumbnail, reverseAddress);
}