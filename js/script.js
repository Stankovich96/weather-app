import weatherStatusByCityCountry from './modules/weatherStatus.js';
import getAddressFromLatLong from './modules/getAddress.js';

const WeatherApiKey = "8f7a94630b1569973b8cf33db719e169";

/**
 *  Fetch user's location using IP address API
 *  @return { Promise } (JsonResponse) response in form of json from the API
 */
async function getLocationByIPAdress(){
    const response = await fetch('http://ip-api.com/json');
    const JsonResponse = await response.json();
    return JsonResponse;
}

/**
 *  Callback success function from navigator.geolocation WebApi that parses user's -
 *  position to getAddressFromLatLong function
 *  @param {String} - (positons) The user position object
 */
const  geolocationCallbackSuccess = async (positions) => {
    const { latitude, longitude } = positions.coords;

    try {
        getAddressFromLatLong(latitude, longitude, WeatherApiKey);

    } catch (error) {
        console.log(error);
    }   
}


/**
 *  Callback failure function from navigator.geolocation WebApi
 *  @param {Exeception} - (err) Error message recieved
 */
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


/**
 *  Wait for the index page horizontal rule to finish animation before getting the geolocation position
 */
document.querySelector('.horizontal-rule span').addEventListener('animationend', () =>{
    // If the browsers has geolocation WebAPI attached to it
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(geolocationCallbackSuccess, geolocationCallbackFailue);
    } else {
        console.log("Your browser doesn't support this feature, please do upgrade your browser");
    
        //Using IP location as alternative location
        //Call Ip location function 
    }
} );


/**
 *  Quick location search form
 */
document.querySelectorAll('.search').forEach(form =>{
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Get the input fields value and separate by comma
        const input = form.querySelector('.search__input').value.split(',');

        // If city and country strings were provided, parse the cityname, country name & apikey to weatherStatusByCityCountry()
        if (input[0] && input[1]) {
            weatherStatusByCityCountry(input[0], input[1], WeatherApiKey)
        }
        form.reset(); //Empty form fields
    })
})


/**
 *  Get the modal by id
 */
const popupModal = document.querySelector('#modal-popup');


/**
 *  Open modal
 */
document.querySelectorAll('#change-button').forEach(button => {  
    button.addEventListener('click', ()=>{
        console.log("ok");
        popupModal.style.opacity = '1';
        popupModal.style.visibility = 'visible';
        popupModal.querySelector('.popup__content').style.opacity = '1';
        popupModal.querySelector('.popup__content').style.transform = `translate(-50%, -50%) scale(1)`;
    })  
});


/**
 *  close modal function
 */
function closeModal(){
    popupModal.style.opacity = '0';
    popupModal.style.visibility = 'hidden';
    popupModal.querySelector('.popup__content').style.opacity = '0';
}


/**
 *  When the user clicks the close button of the modal, close it
 */
document.querySelector('.popup__close').addEventListener('click', ()=>{
    closeModal();
});


/**
 *  When the user clicks anywhere outside of the modal, close it
 */
window.onclick = function(event) {
    if (event.target == popupModal) {
        closeModal();
    }
}


/**
 *  Takes in city & country names from searchField input and runs the weather status of the input
 *  @param {Event} - (e) event paramater from the form element
 */
function runWeatherForecast(e){  
    e.preventDefault(); 
    // Get the input values from the modal form fields
    let city = popupModal.querySelector('#input-city').value;
    let country = popupModal.querySelector('#input-country').value;

    // If city and country strings were provided, parse the cityname, country name & apikey to weatherStatusByCityCountry()
    if (city && country) {
        weatherStatusByCityCountry(city, country, WeatherApiKey)
    }
    
    
    popupModal.reset(); // Empty the form fields
    closeModal(); // Close the modal
}


/**
 *  when the user wants to change location by opening the modal, execute runWeatherForecast function
 */
popupModal.addEventListener('submit', runWeatherForecast);


/**
 *  Setup and insert DateStamp
 */
function currentDateStamp(){
    const date = new Date;
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const options2 = { hour12: true, hour: 'numeric', minute: 'numeric' };
    const dateStamp = `${new Intl.DateTimeFormat('en-UK', options2).format(date)} - ${new Intl.DateTimeFormat('en-NG', options).format(date)}`;
    // Insert the datestamp for every date-stamp element fields
    document.querySelectorAll('.date-stamp, #weather___footer .date-stamp').forEach(element => element.innerHTML = dateStamp);
}

setInterval(currentDateStamp, 1000); // Run the currentDateStamp function in every 1 seconds