
const router = require("express").Router();
const { Router } = require("express");
const Owner = require("../models/Owner");
const Walker = require("../models/Walker");

router.get('/find-walkers', (req, res, next) => {
    Walker.find()
        .then(walkers => {
            //console.log(walkers);
            res.render('owner/find-walkers', {walkerList: walkers})
        })
        .catch(err => {
            next(err);
          })  
})

router.get('/walker/:id', (req, res, next) => {
    const walkerId = req.params.id;
    console.log
    Walker.findById(walkerId)
        .then(walker => {
            console.log(walker);
            res.render('owner/walker-details', {walkerDetails: walker})
        })
        .catch(err => {
            next(err);
          })
})

module.exports = router;