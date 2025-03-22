// main.js for index.html

// Weather API
const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
const city = 'Timbuktu'; // Adjust the city

async function fetchWeatherData() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('weather-data').innerHTML = '<p>Failed to load weather data.</p>';
    }
}

function displayWeatherData(data) {
    const weatherDiv = document.getElementById('weather-data');
    if (!data || !data.list) {
        weatherDiv.innerHTML = '<p>Weather data not available.</p>';
        return;
    }

    const today = data.list[0];
    const forecast = data.list.filter((item, index) => index % 8 === 0).slice(1, 4); // Get 3 days forecast

    weatherDiv.innerHTML = `
        <p>Current: ${today.main.temp}°C, ${today.weather[0].description}</p>
        <h3>Forecast:</h3>
        ${forecast.map(day => `<p>${new Date(day.dt * 1000).toLocaleDateString()}: ${day.main.temp}°C</p>`).join('')}
    `;
}

// Spotlight Members
async function loadSpotlights() {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();
        displaySpotlights(members);
    } catch (error) {
        console.error('Error loading members data:', error);
        document.getElementById('spotlight-container').innerHTML = '<p>Failed to load member spotlights.</p>';
    }
}

function displaySpotlights(members) {
    const spotlightDiv = document.getElementById('spotlight-container');
    const goldSilver = members.filter(member => member.membership === 2 || member.membership === 3);

    if (goldSilver.length < 2) {
        spotlightDiv.innerHTML = '<p>Not enough gold or silver members.</p>';
        return;
    }

    const spotlights = [];
    while (spotlights.length < 2 && goldSilver.length > 0) {
        const randomIndex = Math.floor(Math.random() * goldSilver.length);
        spotlights.push(goldSilver.splice(randomIndex, 1)[0]);
    }

    spotlightDiv.innerHTML = spotlights.map(member => `
        <div class="spotlight-card">
            <img src="images/${member.image}" alt="${member.name} logo">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Website</a>
            <p>Membership: ${member.membership === 3 ? 'Gold' : 'Silver'}</p>
        </div>
    `).join('');
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    fetchWeatherData();
    loadSpotlights();
    document.getElementById('current-year').textContent = new Date().getFullYear();
});