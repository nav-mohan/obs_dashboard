/**
 * Required External Modules
 */
const express = require("express");
const cors = require('cors');
const helmet = require('helmet')
const { clientOrigins, serverPort } = require("./config/env.dev");

/**
 * App Variables
 */
const app = express();
const ipaRouter = express.Router();
const messRouter = express.Router();
ipaRouter.use("/mess",messRouter);

/**
 * App Configuration
 */
app.use(helmet())
app.use(cors({ origin: clientOrigins }))
app.use(express.json())
let httpServer = require('http').createServer(app);

// BUILD, DEPLOY WITH DOCKER & NGINX
// https://www.section.io/engineering-education/build-and-dockerize-a-full-stack-react-app-with-nodejs-and-nginx/

const {checkJwt} = require('./authAPI/check-jwt');

app.get('/start', checkJwt, function (req, res) {
	res.send('STARTING OBS');
	console.log("STARTING OBS");
	startDetachedOBS();
})

app.get('/pid', checkJwt, function (req, res) {
	console.log("GETTING PID");
	getPID();
})

app.get('/stop', checkJwt, function (req, res) {
	res.send('Stopping OBS')
	console.log("STOPPING OBS");
	stopOBS()

})

httpServer.listen(process.env.SERVER_PORT, function () {
	console.log(`SERVER STARTED ON ${process.env.SERVER_PORT}`);
})
