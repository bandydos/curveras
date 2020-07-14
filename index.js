const express = require('express');
const app = express();
const fetch = require('node-fetch');

const port = 3000;
app.listen(port, () => {
    console.log('Listening on ' + port);
});

app.use(express.static('public'));

//Routing.
app.get('/covid', (req, res) => {
    res.send('Covid route');
});

app.get('/covid/data', async (req, res) => {
    const api_url = 'https://opendata.ecdc.europa.eu/covid19/casedistribution/json/';
    const fetch_response = await fetch(api_url);
    const jsonres = await fetch_response.json();
    res.json(jsonres); // Like send but in json format.
});


