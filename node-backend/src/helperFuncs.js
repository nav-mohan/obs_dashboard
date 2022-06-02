// BASH SCRIPTING STUFF
const { exec, spawn } = require('child_process');
// const { util } = require('util');//NOT USING THIS FOR NOW
const OBS_PID = "";
const NUMBER_OF_OBS_PROCS = 0;

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