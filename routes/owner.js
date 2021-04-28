
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
    
    Owner.findById(req.session.user._id)
        .then(currentOwner => {
            console.log(currentOwner);
            res.render('owner/edit', {currentOwner});
        })
    //console.log("currentowner", currentOwner);
    
})

router.post('/profile', (req, res, next) => {
    let currentOwner = req.session.user;
    const {username, email, dogName, dogBreed, dogAge, dogSize, dogsSpecialNeeds, dogImg, location} = req.body;
    Owner.findByIdAndUpdate(req.session.user._id, {username: req.body.username, email: email, dogName: dogName, dogBreed: dogBreed, dogAge: dogAge, dogSize: dogSize, dogsSpecialNeeds: dogsSpecialNeeds, dogImg: dogImg, location: location}, {new: true})
        .then((updatedOwner) => {
            res.redirect('/owner/profile');
        })
        .catch(err => {
            next(err);
          })
})

router.get('/profile', (req, res, next) => {
    Owner.findById(req.session.user._id)
        .then(currentOwner => {
            res.render('owner/owner-details', {currentOwner})
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