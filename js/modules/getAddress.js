import  { weatherStatusByLongLat } from './weatherStatus.js';
const GeocodingApiKey = "c9d37137a25844a8a6a890b3518fa98c";

/**
 *  Reverses the latitude and longitude position to a physical address using ReverseGeocoding API
 *  @param {Number} - (latitude) The latitude position
 *  @param {Number} - (longitude) The longitude position
 *  @return {Promise} (formattedResponse) response in form of json from the API
 */
async function reverseGeocoding(latitude, longitude){
    const reponse = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${GeocodingApiKey}`);
    const formattedResponse = await reponse.json();
    return formattedResponse;
}


/**
 *  Gets the physical address from reverseGeocoding() function and parse parameters to weatherStatusByLongLat() function
 *  @param {Number} - (latitude) The latitude position
 *  @param {Number} - (longitude) The longitude position
 *  @param {String} - (APIKEY) The API key needed for the api endpoint
 */
export default async function getAddressFromLatLong (latitude, longitude, WeatherApiKey){
    const reverseLatLongToAddress = await reverseGeocoding(latitude, longitude);
  
    //Get parameters by Destructuring from reverseGeocoding response
    const { village, city, state, country } = reverseLatLongToAddress.results[0].components;
    
    // Populate the inner html of city-location field with address gotten by reverseGeocoding
    document.querySelector('#city-location').innerHTML = `${(city !== undefined)? city: village}, ${state}, ${country}`;

    weatherStatusByLongLat(longitude, latitude, WeatherApiKey, reverseLatLongToAddress);
}