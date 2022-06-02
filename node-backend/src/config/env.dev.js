const dotenv = require('dotenv');
dotenv.config();

const audience = process.env.AUTH0_AUDIENCE;
const domain = process.env.AUTH0_DOMAIN;
const serverPort = process.env.SERVER_PORT;
const clientOriginUrl = process.env.CLIENT_ORIGIN_URL;

if(!audience){
    throw new Error(".env is missing AUTH0_AUDIENCE");
    audience = "OBS-Dashboard"
}

if(!domain){
    throw new Error(".env is missing AUTH0_DOMAIN");
    domain = 'dev-nb9beumc.us.auth0.com'
}

if(!serverPort){
    throw new Error(".env is missing SERVER_PORT");
    serverPort=6060;
}

if(!clientOriginUrl){
    throw new Error(".env is missing CLIENT_ORIGIN_URL");
    clientOriginUrl = "http://localhost:4040"
}
const clientOrigins = ["http://localhost:4040"];

module.exports = {
    audience,
    domain,
    serverPort,
    clientOriginUrl,
    clientOrigins,
  };
  