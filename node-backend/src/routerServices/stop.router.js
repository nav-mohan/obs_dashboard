const express = require("express");
const { checkJwt } = require('../authAPI/check-jwt')
const { exec } = require('child_process');

const BASH_STOP_OBS = "kill -9 $(ps aux | grep OBS | grep Applications | awk {'print $2'})";
const stopRouter = express.Router()

stopRouter.get('/', checkJwt, function (req, res) {
	message = { 'stdout': '', 'stderr': '', 'err': '' }
	try{

		exec(BASH_STOP_OBS, (err, stdout, stderr) => {
			if (err) {
				console.log('err')
				console.log(err)
				message['err'] = err
			}
			if (stderr) {
				console.log('stderr')
				console.log(stderr)
				message['stderr'] = stderr
			}
			if (stdout) {
				console.log('stdout')
				console.log(stdout)
				message['stdout'] = stdout
			}
			res.send(message)
		});
		
	}
	catch(error){
		console.log("ERROR")
		console.log(error)
	}
	})

module.exports = {
	stopRouter
}