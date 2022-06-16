const {wordpressBaseUrl,
    wordpressJwtRefreshPath,
    wordpressJwtAuthKey,
    deployEnvironment,
    secretServerKey}  = require('../config');
const express           = require('express');
const https             = require('https');

const refreshRouter       = express.Router();

var postData = {'AUTH_KEY':wordpressJwtAuthKey};

const user_pass = "$P$ByLF80gm1xyPWIWY9c.IYN6FEtUH1K"

refreshRouter.post("/", (nodeRefreshRequest,nodeRefreshResponse) => {
    var refreshOptions = {
        hostname: wordpressBaseUrl,
        port: 443,
        path: wordpressJwtRefreshPath,
        method: 'POST',
        headers:{"Content-Type":"application/json"},
        //Must update fm949's SSL certificate to WebNames
        rejectUnauthorized: (deployEnvironment === 'DEVELOPMENT') ? false : true,
    }

    var wpRefreshRequest = https.request(refreshOptions, (wpRefreshOptions) => {

    })
})

module.exports = {
    refreshRouter
}