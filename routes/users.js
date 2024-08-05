const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

// -----Admin Access Only

router.post('/signup', (req, res, next) => {
    /* 
    First check if the email exists, if it does return 422
    If the email doesn't exist, then hash the provided password
    then save the user and return the result, else return error 
    */

    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if (user.length >= 1)
        {
            res.status(422).json({message: "This email is associated with a user"})
        }
        else
        {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err)
                {
                    return res.status(500).json({error: err});
                }
                else
                {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    });

                    user.save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({message: "User Created"});
                    })
                    .catch(err => {
                        res.status(500).json({error: err});
                    })
                }
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });


});

router.post('/login', (req, res, next) => {

    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if (user.length < 1)
        {
            res.status(401).json({message: "Auth Failed"});
        }
        else
        {
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err)
                {
                    res.status(500).json({error: err});
                }
                else if (result)
                {
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    }, process.env.SECRET_KEY, {expiresIn: "1h"})
                    
                    res.status(200).json({message: "Auth Succesfull", token: token});
                }
                else
                {
                    res.status(500).json({message: "Auth Failed"});
                }
            })
        }
    })
    .catch(err => {
        res.status(500).json({error: err});
    })


});


router.delete('/:userId', (req, res, next) => {
    res.status(200).json("Deleting a user");
})

router.patch('/:userId', (req, res, next) => {
    res.status(200).json("Editing a user");
})


module.exports = router;