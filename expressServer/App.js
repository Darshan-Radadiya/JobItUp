"use strict";
exports.__esModule = true;
exports.App = void 0;
var express = require("express");
var bodyParser = require("body-parser");
var JobModel_1 = require("./model/JobModel");
var crypto = require("crypto");
var url = require("url");
var JobSeekerModel_1 = require("./model/JobSeekerModel");
var JobPosterModel_1 = require("./model/JobPosterModel");
var JobApplicationModel_1 = require("./model/JobApplicationModel");
var UserModel_1 = require("./model/UserModel");
var GooglePassport_1 = require("./GooglePassport");
var passport = require("passport");
var logger = require("morgan");
var session = require("express-session");
var cookieParser = require("cookie-parser");
// Creates and configures an ExpressJS web server.
var App = /** @class */ (function () {
    //Run configuration methods on the Express instance.
    function App() {
        this.isJobSeeker = "";
        this.jobSeekerId = "";
        this.jobPosterId = "";
        this.cookiee = " ";
        this.googlePassportObj = new GooglePassport_1["default"]();
        this.expressApp = express();
        this.middleware();
        this.routes();
        this.Jobs = new JobModel_1.JobModel();
        this.JobSeekers = new JobSeekerModel_1.JobSeekerModel();
        this.JobPosters = new JobPosterModel_1.JobPosterModel();
        this.JobApplications = new JobApplicationModel_1.JobApplicationModel();
        this.Users = new UserModel_1.UserModel();
    }
    // Configure Express middleware.
    App.prototype.middleware = function () {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        this.expressApp.use(logger('dev'));
        this.expressApp.use(session({ secret: 'keyboard cat' }));
        this.expressApp.use(cookieParser());
        this.expressApp.use(passport.initialize());
        this.expressApp.use(passport.session());
    };
    App.prototype.validateAuth = function (req, res, next) {
        if (req.isAuthenticated()) {
            console.log("user is authenticated");
            return next();
        }
        console.log("user is not authenticated");
        res.redirect('/');
    };
    // Configure API endpoints.
    App.prototype.routes = function () {
        var _this = this;
        var router = express.Router();
        router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'], prompt: "select_account" }));
        router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), function (req, res) {
            console.log("successfully authenticated user and returned to callback page.");
            console.log("redirecting to /#/homepage");
            _this.Users.model.findOne({ userId: req.user.id }).then(function (users) {
                if (users) {
                    var obj = JSON.parse(JSON.stringify(users));
                    if (obj.profileType == "JS") {
                        _this.isJobSeeker = "Y";
                        _this.JobSeekers.model.findOne({ userId: req.user.id }).then(function (jobSeekers) {
                            var obj1 = JSON.parse(JSON.stringify(jobSeekers));
                            _this.jobSeekerId = obj1.jobSeekerId;
                            console.log("Job Seeker Id is: ", _this.jobSeekerId);
                            res.redirect('/#/homepage/' + _this.jobSeekerId + '/' + _this.isJobSeeker);
                        });
                    }
                    else {
                        _this.isJobSeeker = "N";
                        _this.JobPosters.model.findOne({ userId: req.user.id }).then(function (jobPosters) {
                            var obj1 = JSON.parse(JSON.stringify(jobPosters));
                            _this.jobPosterId = obj1.jobPosterId;
                            console.log("Job Poster Id is: ", _this.jobPosterId);
                            res.redirect('/#/homepage/' + _this.jobPosterId + '/' + _this.isJobSeeker);
                        });
                    }
                }
                console.log("is Job Seeker: ", _this.isJobSeeker);
                // res.redirect('/#/homepage/'+'?name='+req.user.displayName+'&email='+req.user.emails[0].value);
            });
        });
        router.get('/auth/logout', function (req, res, next) {
            req.logout(function (err) {
                if (err) {
                    return next(err);
                }
                res.redirect('/#/');
            });
        });
        router.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET, DELETE, POST, PUT');
            res.header('Access-Control-Allow-Headers', 'content-type');
            next();
        });
        /*Job*/
        router.get('/app/job/', this.validateAuth, function (req, res) {
            console.log('Query All Jobs');
            console.log("Google User ID: " + req.user.id);
            console.log("displayName: " + req.user.displayName);
            console.log("email: " + req.user.emails[0].value);
            _this.Jobs.retrieveAllJobs(res);
        });
        //Mocha Test Fetch Jobs
        router.get('/api/job/', function (req, res) {
            console.log('Query All Jobs');
            _this.Jobs.retrieveAllJobs(res);
        });
        /* Retrieve One Job Details*/
        router.get('/app/job/:jobId', this.validateAuth, function (req, res) {
            var id = req.params.jobId;
            console.log('Query Single job with id: ' + id);
            _this.Jobs.retrieveJobDetails(res, { jobId: id });
        });
        /* Retrieve Jobs by Job Poster*/
        router.get('/app/job/jobposter/:jobPosterId', this.validateAuth, function (req, res) {
            var id = req.params.jobPosterId;
            console.log('Query Jobs for Job Poster with id: ' + id);
            _this.Jobs.retrieveJobsByJobPoster(res, { jobPosterId: id });
        });
        /* Retrieve Jobs by Search Criteria*/
        router.get('/app/jobs/', function (req, res) {
            var urlParts = url.parse(req.url, true);
            var query = urlParts.query;
            console.log(query);
            _this.Jobs.retrieveJobsBySearch(res, query);
        });
        /* Retrieve Jobs by Search Criteria for a specific Job Poster*/
        router.get('/app/jobposter/:jobPosterId/jobs/', this.validateAuth, function (req, res) {
            var urlParts = url.parse(req.url, true);
            var id = req.params.jobPosterId;
            var query = urlParts.query;
            query.jobPosterId = id;
            console.log(query);
            _this.Jobs.retrieveJobsBySearch(res, query);
        });
        /* Retrieve Jobs with Applicants*/
        router.get('/app/job/jobposter/:jobPosterId', this.validateAuth, function (req, res) {
            var id = req.params.jobPosterId;
            console.log('Query Jobs with Applicants for jobposter with id: ' + id);
            _this.Jobs.retrieveJobsWithApplicants(res, { jobPosterId: id, hasApplicants: "Y" });
        });
        /*Create a Job Post*/
        router.post('/app/job/', this.validateAuth, function (req, res) {
            var id = crypto.randomBytes(16).toString("hex");
            console.log(req.body);
            var jsonObj = req.body;
            jsonObj.jobId = id;
            _this.Jobs.model.create(jsonObj, function (err) {
                if (err) {
                    console.log('object creation failed');
                    res.send('{"status":"' + 'failed to create job post' + '"}');
                }
                else {
                    res.send('{"id":"' + id + '"}');
                }
            });
        });
        //Mocha Create Job
        router.post('/api/job/', function (req, res) {
            var id = crypto.randomBytes(16).toString("hex");
            console.log(req.body);
            var jsonObj = req.body;
            jsonObj.jobId = id;
            _this.Jobs.model.create(jsonObj, function (err) {
                if (err) {
                    console.log('object creation failed');
                    res.send('{"status":"' + 'failed to create job post' + '"}');
                }
                else {
                    res.send('{"id":"' + id + '"}');
                }
            });
        });
        /*Update a Job*/
        router.put('/app/job/:jobId', this.validateAuth, function (req, res) {
            console.log("im in");
            var jobId = req.params.jobId;
            var body = req.body;
            _this.Jobs.updateJob(res, jobId, body);
        });
        /*Delete Job and related Job Applications*/
        router["delete"]('/app/job/:jobId', this.validateAuth, function (req, res) {
            try {
                var id = req.params.jobId;
                console.log('Delete Job Application with jobId: ' + id);
                _this.JobApplications.deleteJobApplicationsByJobId(null, { jobId: id });
                console.log('Delete Job Post with id: ' + id);
                _this.Jobs.deleteJob(res, { jobId: id });
            }
            catch (err) {
                res.send('{"Error":"' + err + '"}');
                console.error('{"Error":"' + err + '"}');
            }
        });
        /*Job Seeker*/
        router.get('/app/jobseeker/', this.validateAuth, function (req, res) {
            console.log('Query All Job Seekers');
            _this.JobSeekers.retrieveAllJobSeekers(res);
        });
        router.post('/app/jobseeker/', this.validateAuth, function (req, res) {
            var id = crypto.randomBytes(16).toString("hex");
            console.log(req.body);
            var jsonObj = req.body;
            jsonObj.jobSeekerId = id;
            _this.JobSeekers.model.create(jsonObj, function (err) {
                if (err) {
                    console.log('object creation failed');
                }
            });
            res.send('{"id":"' + id + '"}');
        });
        router.get('/app/jobseeker/:jobSeekerId', this.validateAuth, function (req, res) {
            var id = req.params.jobSeekerId;
            console.log('Query Single Job Seeker with id: ' + id);
            _this.JobSeekers.retrieveJobSeekerDetails(res, { jobSeekerId: id });
        });
        //Mocha Fetch Single Job Seeker
        router.get('/api/jobseeker/:jobSeekerId', function (req, res) {
            var id = req.params.jobSeekerId;
            console.log('Query Single Job Seeker with id: ' + id);
            _this.JobSeekers.retrieveJobSeekerDetails(res, { jobSeekerId: id });
        });
        /*Update a JobSeeker profile*/
        router.put('/app/jobseeker/:jobSeekerId', this.validateAuth, function (req, res) {
            console.log("151: res", res);
            console.log("152: req", req);
            var jobSeekerId = req.params.jobSeekerId;
            console.log("155: JobSeekerId", jobSeekerId);
            var body = req.body;
            console.log("158: res.body", body);
            _this.JobSeekers.updateJobSeekerProfile(res, jobSeekerId, body);
        });
        /*Update a JobSeeker work experience*/
        router.put('/app/jobseeker/:jobSeekerId/workExperience/:workExperienceId', this.validateAuth, function (req, res) {
            var jobSeekerId = req.params.jobSeekerId;
            var workExperienceId = req.params.workExperienceId;
            var body = req.body;
            _this.JobSeekers.updateJobSeekerWorkExperience(res, jobSeekerId, workExperienceId, body);
        });
        /*Update a JobSeeker Education*/
        router.put('/app/jobseeker/:jobSeekerId/education/:educationId', this.validateAuth, function (req, res) {
            var jobSeekerId = req.params.jobSeekerId;
            var educationId = req.params.educationId;
            var body = req.body;
            _this.JobSeekers.updateJobSeekerEducation(res, jobSeekerId, educationId, body);
        });
        // delete job seeker profile.
        router["delete"]('/app/jobseeker/:jobSeekerId', this.validateAuth, function (req, res) {
            var id = req.params.jobSeekerId;
            var input = { jobSeekerId: id };
            try {
                console.log('Delete Single Job seeker with id: ' + id);
                _this.JobSeekers.deleteJobSeeker(res, input);
            }
            catch (err) {
                console.error('Error occurred while deleting job seeker with id:' + id);
            }
        });
        /*Job Poster*/
        router.get('/app/jobposter/', this.validateAuth, function (req, res) {
            console.log('Query All Job Posters');
            _this.JobPosters.retrieveAllJobPosters(res);
        });
        router.post('/app/jobposter/', this.validateAuth, function (req, res) {
            var id = crypto.randomBytes(16).toString("hex");
            console.log(req.body);
            var jsonObj = req.body;
            jsonObj.jobPosterId = id;
            _this.JobPosters.model.create(jsonObj, function (err) {
                if (err) {
                    console.log('object creation failed');
                }
            });
            res.send('{"id":"' + id + '"}');
        });
        // update details for specified job poster
        router.put('/app/jobposter/:jobPosterId', this.validateAuth, function (req, res) {
            var jobPosterId = req.params.jobPosterId;
            var body = req.body;
            _this.JobPosters.updateJobPosterDetails(res, jobPosterId, body);
        });
        // get details for specified job poster
        router.get('/app/jobposter/:jobPosterId', this.validateAuth, function (req, res) {
            var id = req.params.jobPosterId;
            console.log('Query Single Job Poster with id: ' + id);
            _this.JobPosters.retrieveJobPosterDetails(res, { jobPosterId: id });
        });
        // delete job poster and all related jobs and applications
        router["delete"]('/app/jobposter/:jobPosterId', this.validateAuth, function (req, res) {
            var id = req.params.jobPosterId;
            var input = { jobPosterId: id };
            try {
                console.log('Deleting applications for jobs posted by jobposterid:' + id);
                _this.JobApplications.deleteManyApplications(null, { jobId: id });
            }
            catch (err) {
                console.error('Error occurred while deleting applications for jobs posted by jobposter with id:' + id);
            }
            try {
                console.log('Deleting jobs posted by jobposterid:' + id);
                _this.Jobs.deleteManyJobs(null, input);
            }
            catch (err) {
                console.error('Error occurred while deleting jobs posted by jobposter with id:' + id);
            }
            try {
                console.log('Delete Single jobPoster with id: ' + id);
                _this.JobPosters.deleteJobPoster(res, input);
            }
            catch (err) {
                console.error('Error occurred while deleting jobposter with id:' + id);
            }
        });
        //get all jobs posted by job poster
        router.get('/app/job/jobposter/:jobPosterId', this.validateAuth, function (req, res) {
            var id = req.params.jobPosterId;
            console.log('Query applications of job poster with id: ' + id);
            _this.Jobs.retrieveJobDetails(res, { jobPosterId: id });
        });
        //get all job applications
        router.get('/app/jobApplication/', this.validateAuth, function (req, res) {
            console.log('Query All Applications');
            _this.JobApplications.retrieveAllJobApplications(res);
        });
        //create a new job application
        router.post('/app/jobApplication/', this.validateAuth, function (req, res) {
            var id = crypto.randomBytes(16).toString("hex");
            console.log(req.body);
            var jsonObj = req.body;
            jsonObj.jobApplicationId = id;
            _this.JobApplications.model.create(jsonObj, function (err) {
                if (err) {
                    console.log('object creation failed');
                    res.send('{"status":"' + 'failed to create job application' + '"}');
                }
                else {
                    console.log('job id from request body is ', req.body.jobId);
                    res.send('{"id":"' + id + '"}');
                    var jobId = req.body.jobId;
                    _this.Jobs.updateJob(null, jobId, { hasApplicants: "Y" });
                }
            });
        });
        //get job applications for a job 
        router.get('/app/jobApplication/job/:jobId', this.validateAuth, function (req, res) {
            var id = req.params.jobId;
            console.log('Query applications for job  with id: ' + id);
            _this.JobApplications.retrieveJobApplications(res, { jobId: id });
        });
        //get a single application
        router.get('/app/jobApplication/:jobApplicationId', this.validateAuth, function (req, res) {
            var id = req.params.jobApplicationId;
            console.log('Query Single application with id: ' + id);
            _this.JobApplications.retrieveJobApplications(res, { jobApplicationId: id });
        });
        //get job applications for a job seeker
        router.get('/app/jobApplication/jobSeeker/:jobSeekerId', this.validateAuth, function (req, res) {
            var id = req.params.jobSeekerId;
            console.log('Query Single application with id: ' + id);
            _this.JobApplications.retrieveJobApplications(res, { jobSeekerId: id });
        });
        //update job application
        router.put('/app/jobApplication/:jobApplicationId', this.validateAuth, function (req, res) {
            _this.JobApplications.model.findOneAndUpdate({ jobApplicationId: req.params.jobApplicationId }, req.body, function (err, jobApp) {
                if (!jobApp)
                    console.log('Could not fetch specified job application');
                else {
                    jobApp.status = req.body.status;
                    jobApp.save(function (err) {
                        if (err) {
                            console.log('error');
                            res.send('Error : Status not updated');
                        }
                        else {
                            console.log('success');
                            res.send('{"jobApplicationId":"' + req.params.jobApplicationId + '", "Response":"Job Application successfully updated"}');
                        }
                    });
                }
            });
        });
        //delete job application
        router["delete"]('/app/jobApplication/:jobApplicationId', this.validateAuth, function (req, res) {
            var id = req.params.jobApplicationId;
            console.log('Query Single application with id: ' + id);
            _this.JobApplications.deleteJobApplications(res, { jobApplicationId: id });
        });
        //Get list of users
        router.get('/app/user/', this.validateAuth, function (req, res) {
            console.log('Query All users');
            _this.Users.retrieveAllUsers(res);
        });
        //Create New User
        router.post('/app/user/', this.validateAuth, function (req, res) {
            var id = crypto.randomBytes(16).toString("hex");
            console.log(req.body);
            var jsonObj = req.body;
            jsonObj.userId = id;
            _this.Users.model.create(jsonObj, function (err) {
                if (err) {
                    console.log('object creation failed');
                }
            });
            res.send('{"id":"' + id + '"}');
        });
        //get a single user
        router.get('/app/user/:userId', this.validateAuth, function (req, res) {
            var id = req.params.userId;
            console.log('Query Single user with id: ' + id);
            _this.Users.retrieveUserDetails(res, { userId: id });
        });
        this.expressApp.use('/', router);
        this.expressApp.use('/app/json/', express.static(__dirname + '/app/json'));
        this.expressApp.use('/images', express.static(__dirname + '/img'));
        //this.expressApp.use('/', express.static(__dirname+'/pages'));
        this.expressApp.use('/', express.static(__dirname + '/AngularDist/job-it-up/'));
    };
    return App;
}());
exports.App = App;
