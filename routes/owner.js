
const router = require("express").Router();
const { Router } = require("express");
const Owner = require("../models/Owner");
const Walker = require("../models/Walker");

router.get('/find-walkers', (req, res, next) => {
    Walker.find()
        .then(walkers => {
            res.render('owner/find-walkers', {walkerList: walkers})
        })
        .catch(err => {
            next(err);
          })  
})

router.get('/walker/:id', (req, res, next) => {
    const walkerId = req.params.id;
    Walker.findById(walkerId)
        .then(walker => {
            res.render('owner/walker-details', {walkerDetails: walker})
        })
        .catch(err => {
            next(err);
          })
})


router.get('/request/:id', (req, res, next) => {
    const walkerId = req.params.id;
    Walker.findById(walkerId)
        .then(walker => {  
            res.render('owner/request', {sendToInfo: walker})
        })
        .catch(err => {
            next(err);
          })
})





// router.get('/profile', (req, res, next) => {
//     const {user} = req.session.user;
//     console.log(req.session.user);
// })

module.exports = router;