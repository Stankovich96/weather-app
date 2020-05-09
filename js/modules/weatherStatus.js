import weatherCard from './weatherCard.js';

export function weatherStatusByLongLat(long, lat, APIKEY, reverseLatLongToAddress){
    const endpointWithLongandLat = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${APIKEY}`;

    fetch(endpointWithLongandLat)
        .then((result) => result.json())
        .then((Fetchedresponse)=> weatherCard(Fetchedresponse, reverseLatLongToAddress))
        .catch(err=>console.log(err))
}

export default function weatherStatusByCityCountry(cityName, country, APIKEY){
    const endpointWithCityandCountry = `http://api.openweathermap.org/data/2.5/weather?q=${cityName},${country}&units=metric&appid=${APIKEY}`;
    
    fetch(endpointWithCityandCountry)
        .then((result) => result.json())
        .then((Fetchedresponse) => weatherCard(Fetchedresponse, { cityName, country }))
        .catch(err => console.log(err));
}

