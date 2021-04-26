OWNER signup
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
  