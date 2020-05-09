import weatherCanvas from './weatherCardValues.js';

/**
 *  Paints the rainy weather card with values from weatherReport response and reverseAddress response
 *  @param {Response} - (weatherReport) API response from weather API
 *  @param {Response} - (reverseAddres) API response from reverseGeocoding API
 */
export default function rainyWeather(weatherReport, reverseAddress){
    const card = document.querySelector('#rainy-weather-card');
    const cardThumbnail = document.querySelector('#rainy-weather-card .second-column');
    weatherCanvas(weatherReport, card, cardThumbnail, reverseAddress);
}