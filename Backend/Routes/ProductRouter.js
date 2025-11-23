const { ensureAuthenticaticated } = require("../Middlewares/Auth");

const router = require("express").Router();

router.get("/", ensureAuthenticaticated, (req, res) => {
    console.log(req.user);
    
  res.status(200).json([
    {
      name: "mobile",
      price: 10000,
    },
    {
      name: "TV",
      price: 20000,
    },
  ]);
});

module.exports = router;
