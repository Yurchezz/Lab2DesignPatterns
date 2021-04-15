const express = require('express');
const router = express.Router();
const insuranceController = require('../controllers/insurance.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');


router.get('/',  awaitHandlerFactory(insuranceController.getAllInsurances)); // localhost:3000/api/v1/users
router.get('/rendered',  awaitHandlerFactory(insuranceController.renderAllInsuranes)); // localhost:3000/api/v1/users
router.get('/csvget',  awaitHandlerFactory(insuranceController.getCsvJson)); // localhost:3000/api/v1/users
router.get('/csvset',  awaitHandlerFactory(insuranceController.setCsvJson)); // localhost:3000/api/v1/users


module.exports = router;