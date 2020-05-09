import  { weatherStatusByLongLat } from './weatherStatus.js';

const GeocodingApiKey = "c9d37137a25844a8a6a890b3518fa98c";

async function reverseGeocoding(latitude, longitude){
    const reponse = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${GeocodingApiKey}`);
    const formattedResponse = await reponse.json();
    return formattedResponse;
}

export default async function getAddressFromLatLong (latitude, longitude, WeatherApiKey){
    const reverseLatLongToAddress = await reverseGeocoding(latitude, longitude);
  
    const { village, city, state, country } = reverseLatLongToAddress.results[0].components;
    document.querySelector('#city-location').innerHTML = `${(city !== undefined)? city: village}, ${state}, ${country}`;

    weatherStatusByLongLat(longitude, latitude, WeatherApiKey, reverseLatLongToAddress);
}