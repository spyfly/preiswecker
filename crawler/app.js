var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var { initialize } = require("express-openapi");

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// OpenAPI routes
initialize({
    app,
    apiDoc: require("./api/api-doc"),
    paths: "./api/paths",
  });

module.exports = app;
