const weatherForm = document.querySelector(".weatherForm");
const input = document.querySelector(".inputCity");
const card = document.querySelector(".card");
const apikey = "5abef41a2d88d9bcc83ec5723be05c82";

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const city = input.value;
    if (city) {
        try {
            const weatherData = await getData(city);
            display(weatherData);
        }
        catch (errorr) {
            console.error(error);
            displayError(error);
        }

    }
    else {
        displayError("Please Enter a name of a city");

    }


})

function displayError(message) {
    const erorrdisplay = document.createElement("p");
    erorrdisplay.textContent = message;
    erorrdisplay.classList.add(".displayErorr");
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(erorrdisplay);

}

async function getData(city) {
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const responce = await fetch(api);
    if (!responce.ok) {
        throw new Error("Could not fetch data");
    }
    else {
        return await responce.json();
    }

}

function display(data) {

    const { name: city, main: { temp, humidity }, weather: [{ description, id }] } = data;
    card.textContent = "";
    card.style.display = "flex";

    const displayCity = document.createElement("h1");
    displayCity.textContent = city;
    displayCity.classList.add("displayCity");

    const displayTemp = document.createElement("p");
    displayTemp.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    displayCity.classList.add("displayTemp");

    const displayHumidity = document.createElement("p");
    displayHumidity.textContent = humidity;
    displayCity.classList.add("displayHumidity");

    const displayDesc = document.createElement("p");
    displayDesc.textContent = description;
    displayCity.classList.add("displayDesc");

    card.appendChild(displayCity);
    card.appendChild(displayTemp);
    card.appendChild(displayHumidity);
    card.appendChild(displayDesc);

}