
const router = require("express").Router();
const Owner = require("../models/Owner");
const Walker = require("../models/Walker");
const Request = require("../models/Request");


router.post('/received-requests/:id', (req, res, next) => {
    const walkerId = req.params.id;
    const ownerId = req.session.user._id
    //console.log(req.session._id);
    //console.log(walkerId);
    // console.log('owner', req.session.user);
    //date, time, duration, sentBy, sentTo
    let {date, time, duration} = req.body;

    Request.create({
        date: date,
        time: time,
        duration: duration,
        sentBy: ownerId,
        sentTo: walkerId,
        accepted: false
    })
    .then((request) => {
        //res.redirect('request-succesful');
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

router.post('/request-sent', (req, res) =>{
    res.render('owner/request-sent');
})

router.get('/request-successful', (req, res, next) => {
    res.render('owner/request-successful');
})



module.exports = router;