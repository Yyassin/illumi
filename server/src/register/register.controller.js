const express = require('express')
const database = require("../../config/database")

exports.signup = async (req, res) => {
    try {
        const result =  await database.auth.createUserWithEmailAndPassword(req.body.email, req.body.password)

        try {
            const token = await result.user.getIdTokenResult(true)
            res.status(200).json(token)
            console.log('Success signed in as ' + req.body.email)
        } catch (error) {
            console.log(error.message)
            res.status(500).json({message: error.message})
        }

    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
        console.log(error.message);
    }
}

exports.signin = async (req, res) => {
    try {
        const result =  await database.auth.signInWithEmailAndPassword(req.body.email, req.body.password)
        
        try {
            const token = await result.user.getIdTokenResult(true)
            res.status(200).json(token)
            console.log('Success signed in as ' + req.body.email)

        } catch (error) {
            console.log(error.message)
            res.status(500).json({message: error.message})
        }
        
    } catch (error) {
        console.log("msg: " + error.message)
        return res.status(200).json({message: error.message})
    }
}

exports.validate = (req, res, next) => {
    const token = req.body.accessToken

    if(!token) {
        return res.json({message: 'Missing token'})
    }

    database.admin.verifyIdToken(token)
        .then(result => {
            next();
        })
        .catch(error => {
            console.log(error.message)
            return res.json({message: 'Invalid token'})
        })
}
