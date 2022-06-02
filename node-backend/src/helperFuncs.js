// BASH SCRIPTING STUFF
const { exec, spawn } = require('child_process');
// const { util } = require('util');//NOT USING THIS FOR NOW
const OBS_PID = "";
const NUMBER_OF_OBS_PROCS = 0;
const BASH_START_OBS = "nohup /Applications/OBS.app/Contents/MacOS/obs --minimize-to-tray &";
const BASH_STOP_OBS = "kill -9 $(ps aux | grep OBS | grep Applications | awk {'print $2'})";

var fs = require('fs');						// WE NEED TO DEFINE Async LOG FILES FOR THE stdout stderr
var out = fs.openSync('../logs/out.log', 'a');	// I HOPE OBS WILL CONTINUE WRITING TO THEM EVEN IF NodeJS CRASHES
var err = fs.openSync('../logs/err.log', 'a');	// I HOPE NodeJS CAN CONINUE READING FROM THEM IN THE EVENT OF A RESTART OF NodeJS 
const startDetachedOBS = function(){
	const detachedOBS = spawn("/Applications/OBS.app/Contents/MacOS/obs" , ["--minimize-to-tray","&"],
	{ detached: true, stdio: [ 'ignore', out, err ] }
	);
	detachedOBS.on("error",function(err){
		console.log("detachedOBS error")
		console.log(err)
	})
	detachedOBS.on("close",function(close_code){
		console.log(`detachedOBS close_code ${close_code}`)
	})
	detachedOBS.unref();
}



const initialCheck = function(){
	console.log("GETTING OBS PID");
	exec(BASH_GET_OBS_PID,function(err,stdout,stderr){
		if(err){
			console.log("ERROR")
			console.log(err)
		}
		if(stdout){
			console.log("stdout")
			console.log(stdout)
		}
		if(stderr){
			console.log("stderr")
			console.log(stderr)
		}
		else{
			console.log("INITIAL CHECK DONE")
		}
	})
}

initialCheck();


const updateClient = function(socket){
	const message = {
		'NUMBER_OF_OBS_PROCS':NUMBER_OF_OBS_PROCS,
	};
	socket.emit("update-client",JSON.stringify(message));
}

io.on("connection",function(socket){
	console.log(`NEW CLIENT CONNECTED ON SOCKET`);
	// console.log(socket);
	updateClient(socket);

	socket.on("bash1",function(){
		console.log("BASH1");
	})

	socket.on("disconnect",function(){
		console.log(`SOCKET CLIENT ${socket} DISCONNECTED`);
	});
})