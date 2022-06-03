const fs = require('fs/promises');
const express = require("express");
const {checkJwt} = require('../authAPI/check-jwt')

const readRouter = express.Router()

async function readOut(req,res) {
  try {
    const data = await fs.readFile('./logs/out.log', { encoding: 'utf8' });
    res.send(data)
  } catch (err) {
    res.send(err)
    // console.log(err);
  }
}

readRouter.get('/', checkJwt, function(req, res){
	message = {'stdout':'','stderr':'','err':''}
  readOut(req,res)
})

module.exports = {
	readRouter
}