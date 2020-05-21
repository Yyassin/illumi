const express = require('express')
const database = require("../../config/database")

exports.signup = async (req, res) => {
    try {
        //console.log(res);
        console.log(req.body);

        await database.auth.createUser({
             email: req.body.email,
             password: 'sadsadsad',
             displayName: 'test',
         })

        console.log('Success saved user ' + req.body.email)
    } catch (error) {
        console.log(error.message);
    }
}

exports.test = (req, res) => {
    //console.log(res)
    res.json({msg: "hello"});
}