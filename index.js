const express = require('express');
const app = express();
const PORT = 3030;

const { FIreray } = require('./src/date.json')

app.get('/', (req, res) => res.redirect('https://github.com/lucasFelixSilveira'))

require('./src/rotasFireray.js')(app, FIreray);

app.listen(PORT)