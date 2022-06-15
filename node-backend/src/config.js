const dotenv = require('dotenv');
dotenv.config();

var nodeBaseUrl;

const secretServerKey       = process.env.SECRET_SERVER_KEY;
const serverPort            = process.env.NODE_SERVER_PORT;
const clientOriginUrl       = process.env.CLIENT_ORIGIN_URL;
const wordpressBaseUrl      = process.env.WORDPRESS_BASE_URL;
const wordpressJwtAuthKey   = process.env.WORDPRESS_JWT_AUTH_KEY
const wordpressJwtLoginPath = process.env.WORDPRESS_JWT_LOGIN_PATH;
const deployEnvironment     = process.env.DEPLOY_ENVIRONMENT;

if(!secretServerKey){
    secretServerKey='really-secret-key-here';
    throw new Error(".env is missing SECRET_SERVER_KEY");
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
    secretServerKey,
    serverPort,
    clientOriginUrl,
    clientOrigins,
    nodeBaseUrl,
    wordpressBaseUrl,
    wordpressJwtAuthKey,
    wordpressJwtLoginPath,
    deployEnvironment
  };
  