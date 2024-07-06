const { Router } = require('express');

const authController = require ("../controllers/authControllers");

const router = Router();

router.post("/login",authController.login);

router.post("/register",authController.register);


module.exports = router;