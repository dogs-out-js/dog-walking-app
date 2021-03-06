
const router = require("express").Router();
const Owner = require('../models/Owner');
const Walker = require('../models/Walker');
const bcrypt = require('bcrypt');

//signup choice
router.get("/signupChoice", (req, res, next) => {
  res.render("signupChoice", {});
})

//signup as an Owner
router.get("/signup/owner", (req, res, next) => {
  res.render("signup", { owner: 'true' });
});

// signup as a Walker
router.get("/signup/walker", (req, res, next) => {
    res.render("signup-walker", { walker: 'true' });
});
  
// login
router.get("/login", (req, res, next) => {
  res.render("login");
});


router.post('/login', (req, res) => {
  const { username, password } = req.body;
  Owner.findOne({ username: username })
    .then(ownerFromDB => {
      Walker.findOne({ username: username })
         .then(walkerFromDB => {
            if (ownerFromDB === null && walkerFromDB === null) {
                // if username does not exist as owner or walker
                res.render('login', { message: 'Invalid login or password' });
                return;
            } else if (ownerFromDB !== null) {
                if (bcrypt.compareSync(password, ownerFromDB.password)) {
                    req.session.user = ownerFromDB;
                    res.render('owner/find-walkers', { owner: ownerFromDB });
                    res.redirect('/owner/find-walkers');
                  } else {
                    res.render('login', { message: 'Invalid login or password' });
                  } 
            } else {
                // username exists as an walker
                if (bcrypt.compareSync(password, walkerFromDB.password)) {
                  req.session.user = walkerFromDB;
                    res.render('walker/incoming-requests', { walker: walkerFromDB });
                    res.redirect('/walker/incoming-requests');
                  } else {
                    res.render('login', { message: 'Invalid login or password' });
                  } 
            }
            
         })
    })

})


//OWNER signup
router.post('/signupOwner', (req, res) => {
    const { username, password } = req.body;
    if (password.length < 8) {
      return res.render('signup', { message: 'Your password has to be minimum 8 characters long.' });
    }
    if (username === '') {
      res.render('signup', { message: `Your username can't be empty` });
      return;
    }
    
    Owner.findOne({ username: username })
      .then(ownerFromDB => {
        if (ownerFromDB !== null) {
          res.render('signup', { message: 'Username is already taken' });
        } else {
          const salt = bcrypt.genSaltSync();
          const hash = bcrypt.hashSync(password, salt)
          Owner.create({ username: username, password: hash})
  
            .then(ownerFromDB => {            
              res.redirect('login');
            })
        }
      })
      .catch(err => {
        console.log(err);
      })
});

  //WALKER signup
  router.post('/signupWalker', (req, res) => {
    const { username, password, email } = req.body;
    if (password.length < 8) {
      return res.render('signup-walker', { message: 'Your password has to be minimum 8 characters long.' });
    }
    if (username === '') {

      res.render('signup-walker', { message: `Your username can't be empty` });


      return;
    }
    Walker.findOne({ username: username })
      .then(walkerFromDB => {
        if (walkerFromDB !== null) {
          res.render('signup-walker', { message: 'Username is already taken, choose another one.' });
        } else {
          const salt = bcrypt.genSaltSync();
          const hash = bcrypt.hashSync(password, salt)
          Walker.create({ username: username, password: hash, email: email, walkerExperience: "", walkerImg: "", price: ""})
            .then(walkerFromDB => {
              res.render('login', {walkerFromDB});
            })
        }
      })
      .catch(err => {
        console.log(err);
      })
  });
  
  
  router.get('/logout', (req, res) => {
    req.session.destroy(function (err) {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/');
      }
    })
  });
  
module.exports = router;
  