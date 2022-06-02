const BASH_GET_OBS_PID = "ps aux | grep OBS.app | grep Applications | awk {'print $2'}";

const getPID = () => {
    exec(BASH_GET_OBS_PID, function (err, stdout, stderr) {
		if (err) {
			return {message: $err }
			res.send(`ERR ${err}`)
		}
		if (stdout) {
			return {message: $stdout }
			res.send(`STDOUT ${stdout}`)
		}
		if (stderr) {
			return {message: $stderr }
			res.send(`STDERR ${stderr}`)
		}
		else {
			console.log('exiting');
		}
	})
}

module.exports = {
	getPID
}