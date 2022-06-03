/**
 * BUILD, DEPLOY WITH DOCKER & NGINX
 * https://www.section.io/engineering-education/build-and-dockerize-a-full-stack-react-app-with-nodejs-and-nginx/
 */

/**
 * Required External Modules
 */
const express = require("express");
const cors = require('cors');
const helmet = require('helmet')
const { clientOrigins, serverPort } = require("./config/env.dev");
const { pidRouter } = require("./routerServices/pid.router");
const { startRouter} = require("./routerServices/start.router");
const { stopRouter } =  require("./routerServices/stop.router");
const {readRouter } = require("./routerServices/read.router");
const { checkJwt } = require('./authAPI/check-jwt');
/**
 * App Variables
 */
const app = express();
/**
 * App Configuration
 */
app.use(helmet())
app.use(cors({ origin: clientOrigins }))
app.use(express.json())
let httpServer = require('http').createServer(app);


app.use('/pid',pidRouter)
app.use('/start',startRouter)
app.use('/stop',stopRouter)
app.use('/read',readRouter)

httpServer.listen(serverPort, function () {
	console.log(`SERVER STARTED ON ${serverPort}`);
})
