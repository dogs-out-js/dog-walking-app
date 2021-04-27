
const router = require("express").Router();
const Owner = require("../models/Owner");
const Walker = require("../models/Walker");
const Request = require("../models/Request");


router.post('/received-requests/:id', (req, res, next) => {
    const walkerId = req.params.id;
    console.log(walkerId);
    // console.log('owner', req.session.user);
    //date, time, duration, sentBy, sentTo
    let {date, time, duration} = req.body;

    Request.create({
        date: date,
        time: time,
        duration: duration,
        //sentBy: [to add],
        sentTo: walkerId
    })
    .then((request) => {
        res.render('received-requests', {requestDetails: request})
        //res.redirect('received-requests', {request})
    })
    .catch(err => {
        console.log(err);
      })
})

router.get('/received-requests/:id', (req, res, next) => {
    res.render('received-requests');
})

module.exports = router;