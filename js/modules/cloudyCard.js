import weatherCanvas from './weatherCardValues.js';

/**
 *  Paints the cloudy weather card with values from weatherReport response and reverseAddress response
 *  @param {Response} - (weatherReport) API response from weather API
 *  @param {Response} - (reverseAddres) API response from reverseGeocoding API
 */
export default function cloudyWeather(weatherReport, reverseAddress){
    const card = document.querySelector('#cloudy-weather-card');
    const cardThumbnail = document.querySelector('#cloudy-weather-card .second-column');
    weatherCanvas(weatherReport, card, cardThumbnail, reverseAddress);
}