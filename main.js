//only using promises(no async/await)

const apiKey = "4278d45c70f58a10e899a779f5474cbe";
let longitude = 0, latitude = 0;
const getCurrentPositionButton = document.querySelector('.current-position');
const searchBar = document.querySelector('input');
const searchButton = document.querySelector('.search-button');
const weatherInfo = document.querySelector('.weather-info');
const body = document.querySelector('body');
const convertButton = document.querySelector('.convert-button');

let units = 'metric', unitSign = '°C';



getCurrentPositionButton.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition((posetion) => {
        latitude = posetion.coords.latitude;
        longitude = posetion.coords.longitude;

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`)
            .then(response => response.json())
            .then(data => {
                convertButton.style.display='block';
                weatherInfo.innerHTML = `
            <p>${data.name}</p>
            <p class='temp'>${data.main.temp}${unitSign}</p>
            <p>${data.weather[0].main}</p>
            `;
                changeBackground(data.weather[0].main);
            })
    })
})


function getWeatherDataByCity(cityName) {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`)
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

function searchHandler() {
    const cityName = searchBar.value;
    getWeatherDataByCity(cityName)
        .then(data => {
            convertButton.style.display='block';
            weatherInfo.innerHTML = `
            <p>${data.location}</p>
            <p class='temp'>${data.temprature}${unitSign}</p>
            <p>${data.description}</p>
            `;
            changeBackground(data.description);

        })
}

searchButton.addEventListener('click', searchHandler)


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


convertButton.addEventListener('click', () => {
    temp = weatherInfo.querySelector('.temp');
    let num = parseFloat(temp.innerText);
    console.log(num);
    if (units === 'metric') {
        units = 'imperial';
        convertButton.innerText = '°F 🡪 °C';
        unitSign = '°F';
        num = num * 9 / 5 + 32;

    } else {
        units = 'metric';
        convertButton.innerText = '°C 🡪 °F';
        unitSign = '°C';
        num = (num - 32) * 5 / 9;
    }
    num = Math.round(num * 100) / 100;
    temp.innerText = `${num}${unitSign}`

})


