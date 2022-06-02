const express = require("express");
const { getPID } = require("./pid.services");
const {checkJwt} = require('../authAPI/check-jwt')

const pidRouter = express.Router()

pidRouter.get("/private",checkJwt ,(req,res )=>{
	const message = getPID();
	res.status(200).send(message);
})

pidRouter.get("/public",(req,res )=>{
	const message = getPID();
	res.status(200).send(message);
})