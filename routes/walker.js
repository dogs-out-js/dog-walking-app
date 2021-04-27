
const router = require("express").Router();
const { Router } = require("express");
const Owner = require("../models/Owner");
const Walker = require("../models/Walker");


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
    res.render('/walker/received-requests');
})

router.get('/incoming-requests', (req, res, next) => {
    res.render('received-requests');
})

module.exports = router;