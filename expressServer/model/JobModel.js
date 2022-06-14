"use strict";
exports.__esModule = true;
exports.JobModel = void 0;
var Mongoose = require("mongoose");
var DataAccess_1 = require("../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
var JobModel = /** @class */ (function () {
    function JobModel() {
        this.createSchema();
        this.createModel();
    }
    JobModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            title: String,
            skills: [String],
            domain: String,
            jobId: String,
            jobPosterId: String,
            location: String,
            description: String,
            salary: String,
            applyDeadline: String,
            startDate: String,
            endDate: String,
            experienceNeeded: String,
            hasApplicants: String
        }, { collection: 'job' });
    };
    JobModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("Jobs", this.schema);
    };
    JobModel.prototype.retrieveAllJobs = function (response) {
        var query = this.model.find({});
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    JobModel.prototype.retrieveJobsByJobPoster = function (response, filter) {
        var query = this.model.find(filter);
        query.exec(function (err, itemArray) {
            console.log(itemArray);
            response.json(itemArray);
        });
    };
    JobModel.prototype.retrieveJobsWithApplicants = function (response, filter) {
        var query = this.model.find(filter);
        console.log('Query  ' + query);
        query.exec(function (err, itemArray) {
            console.log("search results " + itemArray);
            response.json(itemArray);
        });
    };
    JobModel.prototype.retrieveJobDetails = function (response, filter) {
        var query = this.model.findOne(filter);
        console.log('Query  ' + query);
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    JobModel.prototype.retrieveJobsBySearch = function (response, filter) {
        var query = this.model.find(filter);
        console.log('Search Query  ' + query);
        query.exec(function (err, itemArray) {
            console.log("search results " + itemArray);
            response.json(itemArray);
        });
    };
    JobModel.prototype.deleteJob = function (response, filter) {
        var query = this.model.deleteOne(filter);
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    JobModel.prototype.deleteManyJobs = function (response, filter) {
        var query = this.model.deleteMany(filter);
        query.exec(function (err, itemArray) {
        });
    };
    JobModel.prototype.updateJob = function (response, jobId, body) {
        this.model.findOneAndUpdate({ jobId: jobId }, body, function (err, job) {
            if (!job)
                console.log('Could not fetch specified job');
            else {
                if (body.skills)
                    job.skills = body.skills;
                if (body.title)
                    job.title = body.title;
                if (body.domain)
                    job.domain = body.domain;
                if (body.location)
                    job.location = body.location;
                if (body.salary)
                    job.salary = body.salary;
                if (body.applyDeadline)
                    job.applyDeadline = body.applyDeadline;
                if (body.startDate)
                    job.startDate = body.startDate;
                if (body.endDate)
                    job.endDate = body.endDate;
                if (body.experienceNeeded)
                    job.experienceNeeded = body.experienceNeeded;
                job.save(function (err) {
                    if (err) {
                        console.log('error');
                        //response.send('Error : Job not updated');
                    }
                    else {
                        console.log('success');
                        response.send('{"jobId":"' + jobId + '", "Response":"Job Details updated"}');
                        //response.send('Job object updated');
                    }
                });
            }
        });
    };
    return JobModel;
}());
exports.JobModel = JobModel;
