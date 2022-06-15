const express = require("express");
const { checkJwt } = require('../authAPI/check-jwt')
const { exec } = require('child_process');
const {BASH_STOP_OBS} = require('./bash-scripts')
const stopRouter = express.Router()

stopRouter.get('/', checkJwt, function (req, res) {
	message = { 'stdout': '', 'stderr': '', 'err': '' }
	try{
		exec(BASH_STOP_OBS, (err, stdout, stderr) => {
			if (err) {
				console.log('ERR')
				console.log(err)
				message['err'] = err
			}
			if (stderr) {
				console.log('STDERR')
				console.log(stderr)
				message['stderr'] = stderr
			}
			else{
				console.log('STDOUT')
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