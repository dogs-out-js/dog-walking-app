
const router = require("express").Router();
const { Router } = require("express");
const Owner = require("../models/Owner");
const Walker = require("../models/Walker");
const { getWalkers, addWalker } = require('../controllers/walkers')


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

router.get('/received-requests/:id', (req, res, next) => {
    res.render('/received-requests');
})

router.get('/received-requests', (req, res, next) => {
    res.render('received-requests');
})

router.get('/profile', (req, res, next) => {
    //console.log('req.session.user', req.session.user)
    //let {username, walkerImg, walkerExperience,} = req.session.user;
    let currentUser = req.session.user
    console.log(currentUser.username);
    res.render('walker/profile', {currentUser});
    
})

router.route('../views/owner/find-walkers').get(getWalkers).post(addWalker)


module.exports = router;