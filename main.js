//only using promises(no async/await)

const apiKey = "4278d45c70f58a10e899a779f5474cbe";
let longitude = 0, latitude = 0;
const getCurrentPositionButton = document.querySelector('.current-position');
const searchBar = document.querySelector('input');
const searchButton = document.querySelector('.search-button');
const weatherInfo = document.querySelector('.weather-info');
const body = document.querySelector('body');



getCurrentPositionButton.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition((posetion) => {
        latitude = posetion.coords.latitude;
        longitude = posetion.coords.longitude;

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => {
                weatherInfo.innerHTML = `
            <p>${data.name}</p>
            <p>${data.main.temp}℃</p>
            <p>${data.weather[0].main}</p>
            `;
                changeBackground(data.weather[0].main);
            })
    })
})


function getWeatherDataByCity(cityName) {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            return {
                temprature: data.main.temp,
                description: data.weather[0].main,
                location: data.name,
            };
        })
        .catch(error => {
            alert("city not found");
            console.error(error);
        });
}



searchButton.addEventListener('click', () => {
    const cityName = searchBar.value;
    getWeatherDataByCity(cityName)
        .then(data => {
            weatherInfo.innerHTML = `
            <p>${data.location}</p>
            <p>${data.temprature}℃</p>
            <p>${data.description}</p>
            `;
            changeBackground(data.description);

        });
})


function changeBackground(weather) {
    console.log('hello');
    switch (weather) {
        case 'Clouds':
            console.log(weather);
            body.style.backgroundImage = "url(images/clouds1.png)";
            break;
        case 'Rain':
            body.style.backgroundImage = "url(images/rain1.png)";
            console.log(weather);
            break;
        case 'Clear':
            body.style.backgroundImage = "url(images/clear.png)";
            console.log(weather);
            break;
        case 'Snow':
            body.style.backgroundImage = "url(images/snow2.png)";
            console.log(weather);
            break;
        case 'Thunderstorm':
            body.style.backgroundImage = "url(images/thunder1.png)";
            console.log(weather);
            break;
    }
}

body.style.backgroundImage = "url(images/forecast.png)"


