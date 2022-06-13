const dotenv = require('dotenv');
dotenv.config();

var nodeBaseUrl;

const audience = process.env.AUTH0_AUDIENCE;
const domain = process.env.AUTH0_DOMAIN;
const serverPort = process.env.NODE_SERVER_PORT;
const clientOriginUrl = process.env.CLIENT_ORIGIN_URL;
const wordpressBaseUrl = process.env.WORDPRESS_BASE_URL;
const wordpressJwtAuthKey = process.env.WORDPRESS_JWT_AUTH_KEY
const wordpressJwtLoginPath = process.env.WORDPRESS_JWT_LOGIN_PATH;
const deployEnvironment = process.env.DEPLOY_ENVIRONMENT;

if(!audience){
    audience = "OBS-Dashboard"
    throw new Error(".env is missing AUTH0_AUDIENCE");
}

if(!domain){
    domain = 'dev-nb9beumc.us.auth0.com'
    throw new Error(".env is missing AUTH0_DOMAIN");
}

if(!serverPort){
    serverPort=6060;
    throw new Error(".env is missing SERVER_PORT");
}

if(!clientOriginUrl){
    clientOriginUrl = "http://localhost:4040"
    throw new Error(".env is missing CLIENT_ORIGIN_URL");
}

if(!wordpressBaseUrl){
    wordpressBaseUrl = "https://fm949.ca";
}

if(!wordpressJwtAuthKey){
    throw new Error(".env is missing WORDPRESS_JWT_AUTH_KEY");
}

if(!wordpressJwtLoginPath){
    wordpressJwtLoginPath = "/wp-json/simple-jwt-login/v1/auth";
}

const clientOrigins = ["http://localhost:4040"];

if(!deployEnvironment){
    throw new Error(".env is missing DEPLOY_ENVIRONMENT")
}

if(deployEnvironment === "DEVELOPMENT"){
    nodeBaseUrl = `http://localhost:${serverPort}`;
}
if(deployEnvironment === "PRODUCTION"){
    nodeBaseUrl = `${wordpressBaseUrl}:${serverPort}`;
}
module.exports = {
    audience,
    domain,
    serverPort,
    clientOriginUrl,
    clientOrigins,
    nodeBaseUrl,
    wordpressBaseUrl,
    wordpressJwtAuthKey,
    wordpressJwtLoginPath,
    deployEnvironment
  };
  