const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const router = require('./router')

app.use(bodyParser.json())
app.use(bodyParser.text())
app.use(bodyParser.urlencoded({ extended: true }))
const port = process.env.APP_PORT || 8002
const server = app.listen(port);
router(app)

module.exports = server