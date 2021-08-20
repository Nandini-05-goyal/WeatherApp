const api = {
  key: "4b8a6409d29f310c11519d3179b03029", //key taken from openweatermap api
  base: "https://api.openweathermap.org/data/2.5/"  //link for the openweathermap api
}

const search = document.querySelector(".search");  //returns first elemnt within doc
const btn = document.querySelector(".btn");
btn.addEventListener("click", getInput); //makin button clickable to take input

function getInput (event) {    //getting input from user to search the city 
    event.preventDefault();  //cancels event if it is cancelable, prevent browser from executing default action 
    if (event.type == "click") {
        getData(search.value);
        console.log(search.value);
    }
}

function getData () {
    fetch(`${api.base}weather?q=${search.value}&units=metric&appid=${api.key}`) //measure api performance
        .then(response => {
            return response.json();  //response is used to fetch a response from web rqst. json parses the response and gives info.
        }).then(displayData);
        
}

function displayData (response) {
    // console.log(response);
    if (response.cod === "404") {    //if there is a wrong city entered and code comes as 404, display thsi msg
        const error = document.querySelector(".error");
        error.textContent = "Please enter a valid city";
        search.value = "";
    } else {   //otherwise response ciy name
        const city = document.querySelector(".city");
        city.innerText = `${response.name}, ${response.sys.country}`;

        const today = new Date();
        const date = document.querySelector(".date");
        date.innerText = dateFunction(today);

        const temp = document.querySelector(".temp");
        temp.innerHTML = `Temp: ${Math.round(response.main.temp)} <span>°C</span>`;

        const weather = document.querySelector(".weather");
        weather.innerText = `Weather: ${response.weather[0].main}`;

        const tempRange = document.querySelector(".temp-range");
        tempRange.innerText = `Temp Range: ${Math.round(response.main.temp_min)}°C / ${Math.round(response.main.temp_max)}°C`;

        const weatherIcon = document.querySelector(".weather-icon");  //getting weather icon from the api site to display correct weather
        const iconURL = "http://openweathermap.org/img/w/";
        weatherIcon.src = iconURL + response.weather[0].icon + ".png";

        search.value = "";
    }
}
//date function to display date , day and year correctly
function dateFunction (d) {
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
}