const express = require("express");
const {checkJwt} = require('../authAPI/check-jwt')

const obsRouter = express.Router()

// IMPORT OBSWebSocket FOR ESTABLISHING SOCKET CONNECTION WITH OBS
const OBSWebSocket = require('obs-websocket-js');

class ObsWsManager {
    constructor(){
        this.OBS_WS = new OBSWebSocket();
        this.authenticationStatus = 0;
        this.connectionStatus = 0;
        this.OBS_WS.on('AuthenticationSuccess', function () {
            console.log("AUTHENTICATED");
            this.authenticationStatus = 1;
        });
        this.OBS_WS.on('AuthenticationFailure',function(){
            console.log("FAILED AUTHENTICATION");
            this.authenticationStatus = 0;
        })
        this.OBS_WS.on('ConnectionOpened', function () {
            console.log("CONNECTED");
            this.connectionStatus = 1;
        });
        this.OBS_WS.on('ConnectionClosed',function(){
            console.log("DISCONNECTED");
            this.connectionStatus = 0;
        })
        this.OBS_WS.on("error",(err)=>{
            console.log("on error")
            console.log(err)
        })
    };

    initConn = async (OBS_IP_ADDRESS,OBS_SOCKET_PORT,OBS_PASSWORD) => {
        this.OBS_WS.connect({
            address: `${OBS_IP_ADDRESS}:${OBS_SOCKET_PORT}`,
            password: `${OBS_PASSWORD}`
        })
        .then(()=>{
            console.log("SUCCESS")
            return "SUCCESS!"
        })
        .catch(function (err) {
            console.log(`ERROR:${Object.keys(err)}`)
            console.log(`ERROR STATUS:${err.status}`)
            console.log(`ERROR DESCRIPTION:${err.description}`)
            console.log(`ERROR CODE:${err.code}`)
            console.log(`ERROR ERROR:${err.error}`)
            return "FAILED TO CONNECT - OBS IS PROBABLY DOWN"
        })
    }

    getAuthStatus = () => this.OBS_WS.authenticationStatus
    setAuthStatus = (newAuthStatus) => this.OBS_WS.authenticationStatus = newAuthStatus
    getConnStatus = () => this.OBS_WS.connectionStatus
    setConnStatus = (newConnStatus) => this.OBS_WS.connectionStatus = newConnStatus
    
}

const OBS_WS_Man = new ObsWsManager()

obsRouter.get('/init-conn',(req,res)=>{
    if(OBS_WS_Man.getAuthStatus==1){
        res.send("OBS WS is already authenticated")
        return;
    }
    if(OBS_WS_Man.getConnStatus==1){
        res.send("OBS WS is already connected")
        return;
    }
    else{
        OBS_WS_Man.initConn('localhost','4444','1234')
        .then((result)=>{
            console.log("HAHAHA");
            console.log(result);
            res.send(result)
        })
        .catch((err)=>{
            console.log(`then error ${err}`)
        })
    }
})


obsRouter.get('/get-status',(req,res)=>{
    console.log("GETTING STATUS")
})

module.exports = {
    obsRouter
}