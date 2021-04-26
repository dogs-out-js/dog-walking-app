
const router = require("express").Router();
const { Router } = require("express");
const Owner = require("../models/Owner");
const Walker = require("../models/Walker");

router.get('/find-walkers', (req, res, next) => {
    Walker.find()
        .then(walkers => {
            console.log(walkers);
            res.render('owner/find-walkers', {walkerList: walkers})
        })
        .catch(err => {
            next(err);
          })  
})

module.exports = router;