const express = require('express');
const app = express();

const api = require('./Api/api');
const auth = require('./Api/auth');
app.use('/download', auth, api);
module.exports = app;