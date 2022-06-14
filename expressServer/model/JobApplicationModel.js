"use strict";
exports.__esModule = true;
exports.JobApplicationModel = void 0;
var Mongoose = require("mongoose");
var DataAccess_1 = require("../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
var JobApplicationModel = /** @class */ (function () {
    function JobApplicationModel() {
        this.createSchema();
        this.createModel();
    }
    JobApplicationModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            jobId: String,
            jobSeekerId: String,
            jobApplicationId: String,
            expectedSalary: String,
            resume: String,
            workAuthorization: String,
            status: String,
            email: String,
            phone: String
        }, { collection: 'jobApplication' });
    };
    JobApplicationModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("JobApplication", this.schema);
    };
    JobApplicationModel.prototype.retrieveJobApplicationDetails = function (response, filter) {
        var query = this.model.findOne(filter);
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    JobApplicationModel.prototype.retrieveJobApplications = function (response, filter) {
        var query = this.model.find(filter);
        query.exec(function (err, itemArray) {
            console.log(itemArray);
            response.json(itemArray);
        });
    };
    JobApplicationModel.prototype.retrieveAllJobApplications = function (response) {
        var query = this.model.find({});
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    JobApplicationModel.prototype.deleteJobApplications = function (response, filter) {
        var query = this.model.deleteOne(filter);
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    JobApplicationModel.prototype.deleteJobApplicationsByJobId = function (response, filter) {
        var query = this.model.deleteMany(filter);
        query.exec(function (err, itemArray) {
        });
    };
    JobApplicationModel.prototype.deleteManyApplications = function (response, filter) {
        var query = this.model.deleteMany(filter);
        query.exec(function (err, itemArray) {
        });
    };
    return JobApplicationModel;
}());
exports.JobApplicationModel = JobApplicationModel;
