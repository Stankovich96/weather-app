/**
 *  Paints the current displayed weather card with values from weatherReport response and reverseAddress response
 *  @param {Response} - (weatherReport) API response from weather API
 *  @param {NodeElement} - (card) weather card container node element
 *  @param {NodeElement} - (cardThumbnail) weather card second-column node element
 *  @param {Response} - (reverseAddres) API response from reverseGeocoding API
 */
export default function weatherCardValues(weatherReport, card, cardThumbnail, reverseAddress){
    // Changes a string value to titlecase format
    function titleCase(str) {
        return str.toLowerCase().split(' ').map(function(word) {
          return (word.charAt(0).toUpperCase() + word.slice(1));
        }).join(' ');
    }
    
    // Get values from weatherReport response
    const { temp, feels_like, humidity } = weatherReport.main;   
    const clouds  = weatherReport.clouds.all;
    const wind_speed  = weatherReport.wind.speed;
    const { description  } = weatherReport.weather[0];
    const vowels = ['a', 'e', 'i', 'o', 'u'];    
    
    // Get the necessary weather card element to fill in
    const weatherCardTemp = card.querySelector('.weather__info--temp');                     //in val<span class="weather__info--temp-deg">o
    const weatherCardTempThumbnail = cardThumbnail.querySelector('.weather__info--temp');   //in val<span class="weather__info--temp-deg">o
    const cityLocation = card.querySelector('.weather-card__loc-city');                     //in cityName
    const countryLocation = card.querySelector('.weather-card__loc-country');               //in countryName
    const address = card.querySelector('.city .city__location');                            //in city, state, country
    const cloudy_value = card.querySelector('#w-cloudy-value');                             //in val%
    const precipitation_value = card.querySelector('#w-precipitation-value');               //in valmm
    const humidity_value = card.querySelector('#w-humidity-value');                         //in val%
    const wind_value = card.querySelector('#w-wind-value');                                 //in val m/s
    const weather_message = card.querySelector('.weather__info--message');                  //in weather description

    // Paint the weather card with values gotten the weather API
    weatherCardTemp.innerHTML = `${Math.round(temp)}<span class="weather__info--temp-deg">o</span>`;
    weatherCardTempThumbnail.innerHTML = `${Math.round(temp)}<span class="weather__info--temp-deg">o</span>`; 
    cloudy_value.innerHTML = `${clouds}%`;
    precipitation_value.innerHTML = `${Math.round(feels_like)}<sup>o</sup>C`;
    humidity_value.innerHTML =  `${humidity}%`;
    wind_value.innerHTML = `${wind_speed} m/s`;
    weather_message.innerHTML = `It's going to be ${vowels.some(vowel => description[0].includes(vowel)) ? 'an': 'a'} ${description}`;

    // if reverseAddress response contains result from an endpoint, then fill in (city||village), state and country
    // else fill in city and country passed into the reverseAddress
    if (reverseAddress.results) {
        const { village, city, state, country} = reverseAddress.results[0].components;
        cityLocation.innerHTML = `${country}`;
        countryLocation.innerHTML = `${(city !== undefined)? city: village}`;
        address.innerHTML = `${(city !== undefined)? city: village}, ${state}, ${country}`;
    }else{
        cityLocation.innerHTML = `${titleCase(reverseAddress.country)}`;
        countryLocation.innerHTML = `${titleCase(reverseAddress.cityName)}`;
        address.innerHTML = `${titleCase(reverseAddress.cityName)}, ${titleCase(reverseAddress.country)}`;
    }
}