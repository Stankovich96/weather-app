import weatherStatusByCityCountry from './modules/weatherStatus.js';
import getAddressFromLatLong from './modules/getAddress.js';

const WeatherApiKey = "8f7a94630b1569973b8cf33db719e169";

async function getLocationByIPAdress(){
    const response = await fetch('http://ip-api.com/json');
    const JsonResponse = await response.json();
    return JsonResponse;
}

const  geolocationCallbackSuccess = async (positions) => {
    const { latitude, longitude } = positions.coords;
    console.log(latitude, longitude);

    try {
        getAddressFromLatLong(latitude, longitude, WeatherApiKey);

    } catch (error) {
        console.log(error);
    }   
}

//
const geolocationCallbackFailue = async (err) => {
    if (err.message.includes("denied")) {  // or just ("denied")
        console.log("Bitch please! Turn on your browser's location");
        
        //Using IP location as alternative location
        //Call Ip location function
        try {
            const fetchLocationData = await getLocationByIPAdress();
            const { lat: latitude, lon: longitude } = fetchLocationData;
            getAddressFromLatLong(latitude, longitude, WeatherApiKey);
        } catch (error) {
            console.log(error);
        }
    }
}

//Wait for the index page horizontal rule to finish animation before getting the geolocation position
document.querySelector('.horizontal-rule span').addEventListener('animationend', () =>{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(geolocationCallbackSuccess, geolocationCallbackFailue);
    } else {
        console.log("Your browser doesn't support this feature, please do upgrade your browser");
    
        //Using IP location as alternative location
        //Call Ip location function 
    }
} );

//Quick location search form
document.querySelectorAll('.search').forEach(form =>{
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('.search__input').value.split(',');
    
        if (input[0] && input[1]) {
            weatherStatusByCityCountry(input[0], input[1], WeatherApiKey)
        }
        form.reset();
    })
})


//Get the modal by id
const popupModal = document.querySelector('#modal-popup');

//Open modal
document.querySelectorAll('#change-button').forEach(button => {  
    button.addEventListener('click', ()=>{
        console.log("ok");
        popupModal.style.opacity = '1';
        popupModal.style.visibility = 'visible';
        popupModal.querySelector('.popup__content').style.opacity = '1';
        popupModal.querySelector('.popup__content').style.transform = `translate(-50%, -50%) scale(1)`;
    })  
});

// close modal function
function closeModal(){
    popupModal.style.opacity = '0';
    popupModal.style.visibility = 'hidden';
    popupModal.querySelector('.popup__content').style.opacity = '0';
}

// When the user clicks the close button of the modal, close it
document.querySelector('.popup__close').addEventListener('click', ()=>{
    closeModal();
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == popupModal) {
        closeModal();
    }
}

function runWeatherForecast(e){  
    e.preventDefault(); 
    let city = popupModal.querySelector('#input-city').value;
    let country = popupModal.querySelector('#input-country').value;

    if (city && country) {
        weatherStatusByCityCountry(city, country, WeatherApiKey)
    }
    
    popupModal.reset();
    closeModal();
}

//when the user wants to change location by opening the modal, execute runWeatherForecast function
popupModal.addEventListener('submit', runWeatherForecast);

//Setup and insert DateStamp
function currentDateStamp(){
    const date = new Date;
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const options2 = { hour12: true, hour: 'numeric', minute: 'numeric' };
    const dateStamp = `${new Intl.DateTimeFormat('en-UK', options2).format(date)} - ${new Intl.DateTimeFormat('en-NG', options).format(date)}`;
    document.querySelectorAll('.date-stamp, #weather___footer .date-stamp').forEach(element => element.innerHTML = dateStamp);
}

setInterval(currentDateStamp, 1000);