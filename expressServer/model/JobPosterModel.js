"use strict";
exports.__esModule = true;
exports.JobPosterModel = void 0;
var Mongoose = require("mongoose");
var DataAccess_1 = require("../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
var JobPosterModel = /** @class */ (function () {
    function JobPosterModel() {
        this.createSchema();
        this.createModel();
    }
    JobPosterModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            userId: String,
            jobPosterId: String,
            contactNo: String,
            fname: String,
            lname: String,
            email: String,
            referralCode: String,
            location: String,
            companyName: String,
            picture: String,
            companyLogo: String,
            Overview: String,
            website: String,
            industry: String,
            companySize: String,
            headquarters: String,
            founded: String
        }, { collection: 'jobPoster' });
    };
    JobPosterModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("JobPoster", this.schema);
    };
    JobPosterModel.prototype.retrieveAllJobPosters = function (response) {
        var query = this.model.find({});
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    JobPosterModel.prototype.retrieveJobPosterDetails = function (response, filter) {
        var query = this.model.findOne(filter);
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    JobPosterModel.prototype.deleteJobPoster = function (response, filter) {
        var query = this.model.deleteOne(filter);
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    JobPosterModel.prototype.updateJobPosterDetails = function (response, jobPosterId, body) {
        this.model.findOneAndUpdate({ jobPosterId: jobPosterId }, body, function (err, jobPoster) {
            if (!jobPoster)
                console.log('Unable to fetch specified job poster');
            else {
                if (body.contactNo)
                    jobPoster.contactNo = body.contactNo;
                if (body.fname)
                    jobPoster.fname = body.fname;
                if (body.lname)
                    jobPoster.lname = body.lname;
                if (body.email)
                    jobPoster.email = body.email;
                if (body.referralCode)
                    jobPoster.referralCode = body.referralCode;
                if (body.location)
                    jobPoster.location = body.location;
                if (body.companyName)
                    jobPoster.companyName = body.companyName;
                if (body.picture)
                    jobPoster.picture = body.picture;
                if (body.companyLogo)
                    jobPoster.companyLogo = body.companyLogo;
                if (body.Overview)
                    jobPoster.Overview = body.Overview;
                if (body.website)
                    jobPoster.website = body.website;
                if (body.industry)
                    jobPoster.industry = body.industry;
                if (body.companySize)
                    jobPoster.companySize = body.companySize;
                if (body.headquarters)
                    jobPoster.headquarters = body.headquarters;
                if (body.founded)
                    jobPoster.founded = body.founded;
                jobPoster.save(function (err) {
                    if (err) {
                        console.log('error');
                        response.send('Error : Job Poster details not updated');
                    }
                    else {
                        console.log('success');
                        response.send('{"jobPosterid":"' + jobPosterId + '", "Response":"JobPoster Profile updated"}');
                    }
                });
            }
        });
    };
    return JobPosterModel;
}());
exports.JobPosterModel = JobPosterModel;
