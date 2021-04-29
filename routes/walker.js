
const router = require("express").Router();
const { Router } = require("express");
const Owner = require("../models/Owner");
const Walker = require("../models/Walker");

const { getWalkers, addWalker } = require('../controllers/walkers')

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
    Request.find({$and: [{sentTo: walkerId},{accepted: false}]})
        .then((request) => {
            //console.log(request);
            res.render('walker/incoming-requests', {requestDetails: request});
        })
        .catch(err => {
            next(err);
          })
    
})

router.post('/accept/:id', (req, res, next) => {
    Request.findByIdAndUpdate(reqId, {accepted: true}, {new: true})
        .then(() => {
            res.redirect("/walker/incoming-requests");
        })
        .catch(err => {
        next(err);
        })
})

router.get('/accept/:id', (req, res, next) => {
    res.redirect('/walker/incoming-requests');
}) 

router.post('/reject/:id', (req, res, next) => {
     const reqId = req.params.id;
     console.log("reqId",reqId);
     Request.findByIdAndDelete(reqId)
         .then(() => {
             res.redirect("/walker/incoming-requests");
         })
         .catch(err => {
            next(err);
          })
 })
 
 router.get('/reject/:id', (req, res, next) => {
     res.redirect('/walker/incoming-requests');
 }) 

router.get('/edit', (req, res, next) => {
    
    Walker.findById(req.session.user._id)
        .then(currentWalker => {
            res.render('walker/edit', {currentWalker});
        })
    //console.log("currentowner", currentOwner);
    
})

router.post('/profile', (req, res, next) => {
    let currentWalker = req.session.user;
    const {username, email, walkerExperience, walkerImg, price, location} = req.body;
    
    Walker.findByIdAndUpdate(req.session.user._id, {
        username: req.body.username, 
        email: email, 
        walkerExperience: walkerExperience, 
        walkerImg: walkerImg, 
        price: price, 
        location: location
        }, {new: true})
        .then((updatedWalker) => {
            res.redirect('/walker/profile');
        })
        .catch(err => {
            next(err);
          })
})

router.get('/profile', (req, res, next) => {
    Walker.findById(req.session.user._id)
    .then(currentUser => {
        console.log(currentUser);
        res.render('walker/profile', {currentUser})
    })
    .catch(err => {
        next(err);
      })
    //console.log('req.session.user', req.session.user)
    //let {username, walkerImg, walkerExperience,} = req.session.user;
    // let currentUser = req.session.user
    // console.log(currentUser.username);
    // res.render('walker/profile', {currentUser});  
})


router.route('../views/owner/find-walkers').get(getWalkers)

router.get('/planned-walks', (req, res, next) => {
    res.render('walker/planned-walks');
})

module.exports = router;