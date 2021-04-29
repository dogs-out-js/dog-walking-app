
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

router.post('/incoming-requests/accept', (req, res, next) => {
   // console.log(req.body);
    //Request.findOneAndUpdate
    res.render(incoming-requests);
})

router.get('/incoming-requests/accept', (req, res, next) => {
    console.log(res.body);
})

router.post('/incoming-requests/reject', (req, res, next) => {
    //console.log(req.body);
    Request.findOneAndDelete({_id: req.body})
})


router.get('/incoming-requests', (req, res, next) => {
    const walkerId = req.session.user._id;
    console.log("req body", req.body._id)
    Request.find({sentTo: walkerId})
        .then((request) => {
            //console.log(request);
            res.render('walker/incoming-requests', {requestDetails: request});
        })
        .catch(err => {
            next(err);
          })
    
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
    const {username, email, walkerExperience, walkerImg, price, street, city} = req.body;
    
    Walker.findByIdAndUpdate(req.session.user._id, {
        username: req.body.username, 
        email: email, 
        walkerExperience: walkerExperience, 
        walkerImg: walkerImg, 
        price: price, 
        location: 
            {
            street,
            city
            }
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