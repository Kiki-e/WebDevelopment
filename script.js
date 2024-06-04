const conn = new WebSocket('ws://localhost:8080');

const search = document.querySelector('.search-box .search');
const get_loc = document.querySelector('.search-box .get_location');
const search_input = document.querySelector('.search-box input');
const container = document.querySelector('.container');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

conn.addEventListener('open', () => {
    console.log('Connected to WebSocket server');
    search_input.value = '';
});

conn.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'success') {
        displayWeather(data.data);
    }
});

get_loc.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            conn.send(JSON.stringify({ type: 'location', location: { latitude, longitude } }));
        }, error => {
            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            error404.style.display = 'block';
            document.querySelector('.not-found p').textContent = `${error}: Trouble getting location.`;
            error404.classList.add('fadeIn');
        });
    } else {
        container.style.height = '400px';
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        error404.style.display = 'block';
        document.querySelector('.not-found p').textContent = "Geolocation is not supported by the browser.";
        error404.classList.add('fadeIn');
    }
});

search.addEventListener('click', () => {
    const city = search_input.value;
    conn.send(JSON.stringify({ type: 'city', city: city })); 
});

function displayWeather(data){
    if (data.city === '')
        return;

    if (data.cod == '404') {
        container.style.height = '400px';
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        error404.style.display = 'block';
        document.querySelector('.not-found p').textContent = `${data.cod}: City not found.`;
        error404.classList.add('fadeIn');
        return;
    } else if (data.cod == '401') {
        container.style.height = '400px';
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        error404.style.display = 'block';
        document.querySelector('.not-found p').textContent = `${data.cod}-Unauthorized: Invalid API Key.`;
        error404.classList.add('fadeIn');
        return;
    }

    error404.style.display = 'none';
    error404.classList.remove('fadeIn');

    const currentDate = new Date();
    const dateTimeString = currentDate.toLocaleString('en-PH', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true, timeZoneName: 'short' });

    const page_title = document.querySelector('.page-title');
    const image = document.querySelector('.weather-box img');
    const temperature = document.querySelector('.weather-box .temperature');
    const description = document.querySelector('.weather-box .description');
    const location = document.querySelector('.weather-box .location');
    const datetime = document.querySelector('.weather-box .datetime');
    const humidity = document.querySelector('.weather-details .humidity span');
    const wind = document.querySelector('.weather-details .wind span');

    switch (data.weather[0].main) {
        case 'Clear':
            image.src = 'images/clear.png';
            break;
        case 'Rain':
            image.src = 'images/rain.png';
            break;
        case 'Snow':
            image.src = 'images/snow.png';
            break;
        case 'Clouds':
            image.src = 'images/cloud.png';
            break;
        case 'Thunderstorm':
            image.src = 'images/cloud.png';
            break;
        case 'Drizzle':
            image.src = 'images/cloud.png';
            break;
        default:
            image.src = 'images/mist.png';
    }

    const apiKey = 'Pexels API key here';

    fetch(`https://api.pexels.com/v1/search?query=${data.name}+${data.sys.country}+landmarks&per_page=1&page=1`, {
    headers: {
        Authorization: apiKey
    }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch image');
        }
        return response.json();
    })
    .then(data => {
        if (data.photos && data.photos.length > 0) {
            const imageUrl = data.photos[0].src.original;
            document.body.style.backgroundImage = `url(${imageUrl})`;
        } else {
            console.error('No images found for landmarks');
            document.body.style.backgroundImage = url('images/default.jpg')
        }
    })
    .catch(error => {
        console.error('Error fetching image:', error);
        document.body.style.backgroundImage = url('images/default.jpg')
    });

    page_title.style.display = 'none';
    search_input.value = `${data.name}, ${data.sys.country}`;
    temperature.innerHTML = `${parseInt(data.main.temp)}<span>°C</span>`;
    description.innerHTML = `${data.weather[0].description}`;
    location.innerHTML = `Location: ${data.name}, ${data.sys.country}`;
    datetime.innerHTML = `Date and Time: ${dateTimeString}`;
    humidity.innerHTML = `${data.main.humidity}%`;
    wind.innerHTML = `${parseInt(data.wind.speed)}Km/h`;

    weatherBox.style.display = '';
    weatherDetails.style.display = '';
    weatherBox.classList.add('fadeIn');
    weatherDetails.classList.add('fadeIn');
    container.style.height = '590px';
};