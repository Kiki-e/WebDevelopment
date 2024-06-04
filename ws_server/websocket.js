const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const server = http.createServer(express); 
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        const apiKey = 'OpenWeather API key here';
        const data = JSON.parse(message);

        if (data.type == 'city') {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${data.city}&units=metric&appid=${apiKey}`)
                .then(response => response.json())
                .then(json => {
                    ws.send(JSON.stringify({ type: 'success', data: json }));
                })
        } else if (data.type == 'location') {
            const { latitude, longitude } = data.location;
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`)
                .then(response => response.json())
                .then(json => {
                    ws.send(JSON.stringify({ type: 'success', data: json }));
                })
        }
    });
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

server.listen(8080, () => {
    console.log("Server is listening at port 8080.");
});