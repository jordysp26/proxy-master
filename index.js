const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require("cors");


const https = require("https"),
  fs = require("fs");

const options = {

    
};

// Create Express Server
const app = express();

// Configuration
const PORT = 3000;
//const HOST = "localhost";
const API_SERVICE_URL = "https://loki.pdaprofile.com";

// Logging
app.use(morgan('dev'));

//cors
app.use(cors());

// Info GET endpoint
app.get('/info', (req, res, next) => {
    res.send('This is a proxy service which proxies to JSONPlaceholder API.');
});

// Authorization
app.use('', (req, res, next) => {
    if (req.headers.authorization) {
        next();
    } else {
        res.sendStatus(403);
    }
});

// Proxy endpoints
app.use('/loki/api/v1/push', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    secure: false,
    pathRewrite: {
        [`^/loki/api/v1/push`]: '',
    },
}));

// Start Proxy
app.listen(process.env.PORT || 5000, () => {
    console.log(`Starting Proxy at :${PORT}`);
});

//https.createServer(options, app).listen(8080);
