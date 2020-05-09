import weatherCard from './weatherCard.js';

/**
 *  Gets the weather status of a position from API
 *  @param {Number} - (long) The longitude position
 *  @param {Number} - (lat) The latitude position
 *  @param {String} - (APIKEY) The API key needed for the api endpoint
 */
export function weatherStatusByLongLat(long, lat, APIKEY, reverseLatLongToAddress){
    const endpointWithLongandLat = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${APIKEY}`;

    // fetches the api and returns the response to weatherCard() function to consume
    fetch(endpointWithLongandLat)
        .then((result) => result.json())
        .then((Fetchedresponse)=> weatherCard(Fetchedresponse, reverseLatLongToAddress))
        .catch(err=>console.log(err))
}

/**
 *  Gets the weather status of a city and country from API
 *  @param {String} - (cityName) The city name
 *  @param {String} - (country) The country name
 *  @param {String} - (APIKEY) The API key needed for the api endpoint
 */
export default function weatherStatusByCityCountry(cityName, country, APIKEY){
    const endpointWithCityandCountry = `http://api.openweathermap.org/data/2.5/weather?q=${cityName},${country}&units=metric&appid=${APIKEY}`;
    
    // fetches the api and returns the response to weatherCard() function to consume
    fetch(endpointWithCityandCountry)
        .then((result) => result.json())
        .then((Fetchedresponse) => weatherCard(Fetchedresponse, { cityName, country }))
        .catch(err => console.log(err));
}

