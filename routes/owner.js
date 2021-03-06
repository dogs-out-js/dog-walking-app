
const router = require("express").Router();
const { Router } = require("express");
const Request = require("../models/Request");
const Owner = require("../models/Owner");
const Walker = require("../models/Walker");
const { uploader, cloudinary } = require("../config/cloudinary");

router.post('/find-walkers', (req, res, next) => {
    const{city, district} = req.body; 
    Walker.find({$or: [{city: city},{district: district}]})
    .then(walkers => {
        console.log("walkers", walkers)
        res.render('owner/find-walkers', {walkerList: walkers})
    })
    .catch(err => {
        next(err);
      })  
    // res.render('owner/find-walkers');  
})

router.get('/find-walkers', (req, res, next) => {
    const{city, district} = req.body; 
    console.log(req.body);
    Walker.find({$or: [{city: city},{district: district}]})
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
            res.render('owner/edit', {currentOwner});
        })  
})

router.post('/profile', uploader.single('photo'), (req, res, next) => {
    let currentOwner = req.session.user;
    const {username, email, dogName, dogBreed, dogAge, dogSize, dogsSpecialNeeds, dogImg, city, district} = req.body;
    
    const imgPath = req.file.path;
    const imgName = req.file.originalname;
    const publicId = req.file.filename;
    
    
    Owner.findByIdAndUpdate(req.session.user._id, {username: req.body.username, email: email, dogName: dogName, dogBreed: dogBreed, dogAge: dogAge, dogSize: dogSize, dogsSpecialNeeds: dogsSpecialNeeds, dogImg: dogImg, imgPath: imgPath, imgName: imgName, publicId: publicId, city: city, district: district}, {new: true})
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



module.exports = router;