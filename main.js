//only using promises(no async/await)

const apiKey = "4278d45c70f58a10e899a779f5474cbe";
let longitude = 0, latitude = 0;
const getCurrentPositionButton = document.querySelector('.current-position');
const searchBar = document.querySelector('input');
const searchButton = document.querySelector('.search-button');
const weatherInfo = document.querySelector('.weather-info');



getCurrentPositionButton.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition((posetion) => {
        latitude = posetion.coords.latitude;
        longitude = posetion.coords.longitude;
        console.log(latitude, longitude);

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => {
                weatherInfo.innerHTML = `
            <p>${data.name}</p>
            <p>${data.main.temp}℃</p>
            <p>${data.weather[0].main}</p>
            `
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
        });
})


//code using async/await