
const router = require("express").Router();
const { Router } = require("express");
const Owner = require("../models/Owner");
const Walker = require("../models/Walker");
const Request = require("../models/Request");
const { uploader, cloudinary } = require("../config/cloudinary");


// router.get("/walker/owner-page/owner/:id", (req, res)=>{
//     const ownerId = req.params.id;
//     Owner.findById(ownerId)
//         .then (owner =>{
//             res.render('walker/owner-page', {ownerDetails: owner})
//         })
//         .catch(err => {
//             next(err);
//           })
// })

router.get('/owner/:id', (req, res, next) => {
    const ownerId = req.params.id;
    Walker.findById(ownerId)
        .then(owner => {
            res.render('walker/owner-page', {ownerDetails: owner})
        })
        .catch(err => {
            next(err);
          })
})

router.get('/incoming-requests', (req, res, next) => {
    const walkerId = req.session.user._id;
    Request.find({$and: [{sentTo: walkerId},{accepted: false}]})
        .populate('sentBy')
        .then((request) => {
            const {username} = request;
            
            res.render('walker/incoming-requests', {requestDetails: request});
        })
        .catch(err => {
            next(err);
          })
})

router.post('/accept/:id', (req, res) => {
    const reqId = req.params.id;
    Request.findByIdAndUpdate(reqId, {accepted: true}, {new: true})
        .then(() => {
            res.redirect("/walker/incoming-requests");
        })
        .catch(err => {
        next(err);
        })
})

router.get('/accept/:id', (req, res) => {
    res.redirect('/walker/incoming-requests');
}) 

router.post('/reject/:id', (req, res, next) => {
     const reqId = req.params.id;
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
})

router.post('/profile', uploader.single('photo'), (req, res, next) => {
    let currentWalker = req.session.user;
    const {username, email, walkerExperience, walkerImg, price, city, district} = req.body;
    
    const imgPath = req.file.path;
    const imgName = req.file.originalname;
    const publicId = req.file.filename;

    Walker.findByIdAndUpdate(req.session.user._id, {
        username: req.body.username, 
        email: email, 
        walkerExperience: walkerExperience, 
        walkerImg: walkerImg, 
        imgPath: imgPath,
        imgName: imgName,
        publicId: publicId,
        price: price, 
        city: city,
        district: district
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
        res.render('walker/profile', {currentUser})
    })
    .catch(err => {
        next(err);
      }) 
})



router.get('/planned-walks', (req, res, next) => {
    const walkerId = req.session.user._id;
    Request.find({$and: [{sentTo: walkerId},{accepted: true}]})
        .populate('sentBy')
        .then((request) => {
            console.log(request);
            res.render('walker/planned-walks', {plannedWalkDetails: request});
            
        })
        .catch(err => {
            next(err);
          })
    
})

router.get('/owner-details/:id', (req, res, next) => {
    const ownerId = req.params.id;
    Owner.findById(ownerId)
        .then(owner => {
            res.render('walker/owner-details', {ownerDetails: owner});
        })
        .catch(err => {
            next(err);
          })
})



module.exports = router;