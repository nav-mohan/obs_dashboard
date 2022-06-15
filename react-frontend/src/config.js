const baseUrlDevelopment = process.env.REACT_APP_BASEURL_DEVELOPMENT;
const baseUrlProduction  = process.env.REACT_APP_BASEURL_PRODUCTION;
const loginPath          = process.env.REACT_APP_LOGIN_PATH;
const deployEnvironment  = process.env.REACT_APP_DEPLOYMENT_ENVIRONMENT;
const serverUrl          = process.env.REACT_APP_SERVER_URL;

var nodeBaseUrl;

if(!baseUrlDevelopment){
    throw new Error(".env is missing REACT_APP_BASEURL_DEVELOPMENT")
}

if(!baseUrlProduction){
    throw new Error(".env is missing REACT_APP_BASEURL_PRODUCTION")
}

if(!loginPath){
    throw new Error(".env is missing REACT_APP_LOGIN_PATH")
}

if(!deployEnvironment){
    throw new Error(".env is missing REACT_APP_DEPLOYMENT_ENVIRONMENT");
}

if(deployEnvironment=='DEVELOPMENT'){
    nodeBaseUrl = baseUrlDevelopment;
}
if(deployEnvironment=='PRODUCTION'){
    nodeBaseUrl = baseUrlProduction;
}

module.exports = {
    serverUrl,
    nodeBaseUrl,
    loginPath,
    deployEnvironment
}