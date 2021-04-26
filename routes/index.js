const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// router.get("/owner-profile", (req, res, next) => {
//   res.render("owner-profile");
// });

// router.get("/walker-profile", (req, res, next) => {
//   res.render("walker-profile");
// });




module.exports = router;
