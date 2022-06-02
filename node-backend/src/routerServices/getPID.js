const BASH_GET_OBS_PID = "ps aux | grep OBS.app | grep Applications | awk {'print $2'}";

const getPID = () => {
    exec(BASH_GET_OBS_PID, function (err, stdout, stderr) {
		if (err) {
			res.send(`ERR ${err}`)
		}
		if (stdout) {
			res.send(`STDOUT ${stdout}`)
		}
		if (stderr) {
			res.send(`STDERR ${stderr}`)
		}
		else {
			console.log('exiting');
		}
	})
}