'use strict';

const userLocation = document.querySelector('#userLocation');
const userTemperature = document.querySelector('#userTemperature')
const weatherIcon = document.querySelector('#image');
const disclaimer = document.querySelector('#disclaimer');

const successCallback = (position) => {
    console.log(position);
    let coords = position.coords;
    let lat = coords.latitude;
    let lon = coords.longitude;
    
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=58dfe150527141cdd127908ff00d2e31&units=metric`)
        .then(function (resp) { return resp.json() })
        .then(function (data) {
            console.log(data);
            userLocation.innerHTML = data.name;
            userTemperature.innerHTML = Math.round(data.main.temp) + '&#176' + ' C';
            weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
            disclaimer.innerHTML = data.weather[0]['description'];

            if (Math.round(data.main.temp) < 0) {
                userTemperature.style.color = '#00b3ff';
            } 
            else if (Math.round(data.main.temp) > 0) {
                userTemperature.style.color = '#ff7300';
            }
        })
        .catch(function () {
            // errors
        });
};

const errorCallback = (error) => {
    alert('To find out the weather, allow the browser to use your location data');
}; 

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);