const express = require("express");
const { checkJwt } = require('../authAPI/check-jwt')
const { exec } = require('child_process');

const BASH_GET_OBS_PID = "ps -o comm,pid | grep OBS.app | grep Applications | awk {'print $2'} | head -1";
const pidRouter = express.Router()

pidRouter.get('/', checkJwt, function (req, res) {
	message = { 'stdout': '', 'stderr': '', 'err': '' }
	exec(BASH_GET_OBS_PID, (err, stdout, stderr) => {
		if (err) {
			message['err'] = err
			res.send(message)
		}
		if (stderr) {
			message['stderr'] = stderr
			res.send(message)
		}
		if (stdout) {
			message['stdout'] = stdout
			res.send(message)
		}
	});
})

module.exports = {
	pidRouter
}