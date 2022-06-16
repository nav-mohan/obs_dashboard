const {wordpressBaseUrl,
    wordpressJwtValidatePath,
    deployEnvironment,
    secretServerKey}  = require('../config');
const express           = require('express');
const https             = require('https');

const validateRouter       = express.Router();

validateRouter.get("/", (nodeValidateRequest,nodeValidateResponse) => {
    console.log("Received Validate Request",nodeValidateRequest.query.JWT)
    var validateOptions = {
        hostname: wordpressBaseUrl,
        port: 443,
        path: wordpressJwtValidatePath,
        query:
        {
            'JWT':nodeValidateRequest.query.JWT,
        },
        method: 'GET',
        headers:{"Content-Type":"application/json"},
        //Must update fm949's SSL certificate to WebNames
        rejectUnauthorized: (deployEnvironment === 'DEVELOPMENT') ? false : true,
    }

    var wpValidateRequest = https.request(validateOptions, (wpValidateResponse) => {
        console.log(wpValidateResponse)

    })

    // if Node fails to connect to Wordpress
    wpValidateRequest.on('error', (error) => {
        console.error("wpValidateError");
        console.log(error)
        nodeValidateResponse.send({
            "success":false,
            "wpStatusCode":500,
            "wpStatusMessage":"Wordpress site is probably down",
            "wpErrorMessage":error
        })
    });

})

module.exports = {
    validateRouter
}