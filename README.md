A simple weather app that displays the current weather of a city using the OpenWeather API.

The weather app will display the current weather of the city provided by the user either by input or by getting the current location of the user with their permission using the Geolocation API. The app will then display the fetched weather details and the background image will be randomly set based on the provided location using the Pexels. If there is no image found with the provided location, the app will set the background image to a default image.

Things to do before running the app:
Getting an API key from OpenWeather
1. Go to https://openweathermap.org and sign up if you don't have an account yet.
2. Go to the API keys section on your account page.
4. Generate a key if there is none yet.
5. Copy and paste the API key as the value of the apiKey var in ws_server/websocket.js:12.

Getting an API key from Pexels:
1. Go to https://www.pexels.com/api and sign in if you don't have an account yet.
2. Go to the Your API key section and create a new application.
3. Provide the necessary details and submit application.
4. Once application is done, get your API key and set it as the value of the apiKey var in script.js:111.

Running the Website:
1. First make sure that you do the steps above. ^^^^
2. Go to the ws_server folder and run "node websocket.js"
3. Go to the index.html and run it with live server on VS code.
4. Follow the instruction on the website to search.

*Warning*
Your API keys may not activate instantly after you created your account and copied the API keys. It is recommended to wait a bit so the API keys can activate.

Members:
Cunanan, John Michael
Mercado, Julian Gabriel L.
Salas, Jaycee Kiel Y.
Venasquez, Paul Andrei
