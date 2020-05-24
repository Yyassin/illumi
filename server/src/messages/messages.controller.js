const express = require('express')
const database = require("../../config/database")
const models = require("./core.models")

exports.createServer = (req, res) => {
    const serverData = models.createServer(req.body);
    console.log(serverData)
}

exports.getServers = (req, res) => {
    var servers = [];
    const query = database.db.collection('servers').get()
    .then(data => {
        data.forEach(server => {
            servers.push(server.data());
        })
        
        res.status(200).json(servers);
        })
    .catch(error => {
        console.log(error)

        res.status(500).json({msg: "Internal Server Error"})
    });
}