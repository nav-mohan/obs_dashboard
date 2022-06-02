const { exec, spawn } = require('child_process');
const BASH_STOP_OBS = "kill -9 $(ps aux | grep OBS | grep Applications | awk {'print $2'})";

const stopOBS = () => {
    exec(BASH_STOP_OBS, function(err,stdout,stderr){
        if(err){
                console.log("ERROR");
                console.error(err);
        }
        if(stdout){
                console.log("stdout");
                console.log(stdout);
        }
        if(stderr){
                console.log("stderr");
                console.log(stderr);
        }
        else{
                console.log('exiting');
        }
})
}