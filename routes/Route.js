const express = require("express");
const route = express.Router();
const UserController = require('../controllers/UserController');
const HospitalController = require('../controllers/HospitalController');
const TestingCenterController = require('../controllers/TestingCenterController');
const DailyUpdateController = require('../controllers/DailyUpdateController');
const ReportController = require('../controllers/ReportController');

const passport = require("passport");
require("../middleware/Passport")(passport);

// user route

route.post('/create',UserController.register);
route.post('/login',UserController.login);
route.put("/updateUser",passport.authenticate("jwt", { session: false }),UserController.profile);
route.get("/getUser",passport.authenticate("jwt", { session: false }),UserController.get); 

// Hospital route
route.post("/createHospital",passport.authenticate("jwt", { session: false }),HospitalController.create);
route.put("/updateHospital",passport.authenticate("jwt", { session: false }),HospitalController.update);
route.get("/getOneHospital/:id",passport.authenticate("jwt", { session: false }),HospitalController.getOne);
route.get("/getAllHospital",passport.authenticate("jwt", { session: false }),HospitalController.getAll); 
route.post("/deleteHospital",passport.authenticate("jwt", { session: false }),HospitalController.delete);

// Testing Center
route.post("/createCenter",passport.authenticate("jwt", { session: false }),TestingCenterController.create);
route.put("/updateCenter",passport.authenticate("jwt", { session: false }),TestingCenterController.update);
route.get("/getOneCenter/:id",passport.authenticate("jwt", { session: false }),TestingCenterController.getOne);
route.get("/getAllCenter",passport.authenticate("jwt", { session: false }),TestingCenterController.getAll); 
route.post("/deleteCenter",passport.authenticate("jwt", { session: false }),TestingCenterController.delete);

// DailyUpdate
route.post("/createDaily",passport.authenticate("jwt", { session: false }),DailyUpdateController.create);
route.put("/updateDaily",passport.authenticate("jwt", { session: false }),DailyUpdateController.update);
route.get("/getDaily",passport.authenticate("jwt", { session: false }),DailyUpdateController.getOne);

// report
route.post("/createReport",passport.authenticate("jwt", { session: false }),ReportController.create);
route.put("/updateReport",passport.authenticate("jwt", { session: false }),ReportController.update);
route.get("/getOneReport/:id",passport.authenticate("jwt", { session: false }),ReportController.getOne);
route.get("/getAllReport",passport.authenticate("jwt", { session: false }),ReportController.getAll);


module.exports = route;