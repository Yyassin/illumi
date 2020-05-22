const express = require('express')
const database = require("../../config/database")

exports.signup = async (req, res) => {
    try {
        console.log(req.body);

        await database.auth.createUser({
             email: req.body.email,
             password: req.body.password,
             displayName: req.body.email,
         })

        console.log('Success saved user ' + req.body.email)
    } catch (error) {
        console.log(error.message);
    }
}
