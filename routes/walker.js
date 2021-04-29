
const router = require("express").Router();
const { Router } = require("express");
const Owner = require("../models/Owner");
const Walker = require("../models/Walker");
const Request = require("../models/Request");


router.get('/owner/:id', (req, res, next) => {
    const ownerId = req.params.id;
    Walker.findById(ownerId)
        .then(owner => {
            res.render('walker/owner-details', {ownerDetails: owner})
        })
        .catch(err => {
            next(err);
          })
})

router.get('/incoming-requests', (req, res, next) => {
    const walkerId = req.session.user._id;
    console.log(walkerId)
    Request.find({sentTo: walkerId})
        .then((request) => {
            console.log(request);
            res.render('walker/incoming-requests', {requestDetails: request});
        })
        .catch(err => {
            next(err);
          })
    
})

router.get('/profile', (req, res, next) => {
    //console.log('req.session.user', req.session.user)
    //let {username, walkerImg, walkerExperience,} = req.session.user;
    let currentUser = req.session.user
    console.log(currentUser.username);
    res.render('walker/profile', {currentUser});  
})




module.exports = router;