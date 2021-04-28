
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

router.get('/edit', (req, res, next) => {
    let currentOwner = req.session.user;
    console.log("currentowner", currentOwner);
    res.render('owner/edit', {currentOwner})
})

router.post('/profile', (req, res, next) => {
    let currentOwner = req.session.user;
    const {username, dogName, dogBreed, dogAge, dogSize, dogSpecialNeeds, location} = req.body;
    Owner.findByIdAndUpdate(req.session.user.id, {username: username, dogname: dogName, dogBreed: dogBreed, dogAge: dogAge, dogSize: dogSize, dogSpecialNeeds: dogSpecialNeeds, location: location}, {new: true})
        .then((updatedOwner) => {
            //res.json({data: updatedOwner});
            console.log("updatedOwner", updatedOwner);
            console.log(`The entry for "${req.session.user.id}" has been updated`);
            res.redirect('/owner/profile');
        })
        .catch(err => {
            next(err);
          })
})

router.get('/profile', (req, res, next) => {
    let currentOwner = req.session.user;
    res.render('owner/owner-details', {currentOwner})
})









// router.get('/profile', (req, res, next) => {
//     const {user} = req.session.user;
//     console.log(req.session.user);
// })

module.exports = router;