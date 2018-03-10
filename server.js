const express = require('express');
const app = express();
const path = require('path');

const publicPath = path.join(__dirname + '/public'); // static folder path
const port = process.env.PORT || 3000;  // for heroku

console.log(publicPath);
app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.listen(port, () => {
    console.log('Listening to port ' + port);
});