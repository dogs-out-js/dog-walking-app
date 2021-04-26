//OWNER signup
router.post('/signupOwner', (req, res) => {
    //console.log("Owner signup")
    const { username, password } = req.body;
    console.log(username, password);
    if (password.length < 8) {
      return res.render('signup', { message: 'Your password has to be 8 chars min' });
    }
    if (username === '') {
      res.render('signup', { message: 'Your username cannot be empty' });
      return;
    }
    Owner.findOne({ username: username })
      .then(ownerFromDB => {
        if (ownerFromDB !== null) {
          res.render('signup', { message: 'Username is already taken' });
        } else {
          const salt = bcrypt.genSaltSync();
          const hash = bcrypt.hashSync(password, salt)
          Owner.create({ username: username, password: hash })
            .then(ownerFromDB => {
              console.log(ownerFromDB);
              res.redirect('/owner');
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
      return res.render('signup', { message: 'Your password has to be minimum 8 characters long.' });
    }
    if (username === '') {
      res.render('signup', { message: 'Your username cannot be empty' });
      return;
    }
    Walker.findOne({ username: username })
      .then(walkerFromDB => {
        if (walkerFromDB !== null) {
          res.render('signup', { message: 'Username is already taken. Please choose a different one.' });
        } else {
          const salt = bcrypt.genSaltSync();
          const hash = bcrypt.hashSync(password, salt)
          Walker.create({ username: username, password: hash, email: email })
            .then(walkerFromDB => {
              console.log(walkerFromDB);
              res.redirect('/login');
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
  