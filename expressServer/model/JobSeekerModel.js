"use strict";
exports.__esModule = true;
exports.JobSeekerModel = void 0;
var Mongoose = require("mongoose");
var DataAccess_1 = require("../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
var JobSeekerModel = /** @class */ (function () {
    function JobSeekerModel() {
        this.createSchema();
        this.createModel();
    }
    JobSeekerModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            userId: String,
            jobSeekerId: String,
            bio: String,
            resume: String,
            picture: String,
            location: String,
            fname: String,
            lname: String,
            contactNo: String,
            email: String,
            referralCode: String,
            primarySkills: [String],
            otherSkills: [String],
            education: [
                {
                    educationId: String,
                    universityName: String,
                    degree: String,
                    fromDate: String,
                    toDate: String
                }
            ],
            workExperience: [
                {
                    workExperienceId: String,
                    companyName: String,
                    role: String,
                    fromDate: String,
                    toDate: String
                }
            ]
        }, { collection: 'jobSeeker' });
    };
    JobSeekerModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("JobSeeker", this.schema);
    };
    JobSeekerModel.prototype.retrieveAllJobSeekers = function (response) {
        var query = this.model.find({});
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    JobSeekerModel.prototype.retrieveJobSeekerDetails = function (response, filter) {
        var query = this.model.findOne(filter);
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    JobSeekerModel.prototype.updateJobSeekerProfile = function (response, jobSeekerId, body) {
        this.model.findOneAndUpdate({ jobSeekerId: jobSeekerId }, body, function (err, jobSeekerProfile) {
            if (!jobSeekerProfile)
                console.log('Could not fetch specified jobSeekerProfile');
            else {
                if (body.bio)
                    jobSeekerProfile.skills = body.bio;
                if (body.resume)
                    jobSeekerProfile.title = body.resume;
                if (body.picture)
                    jobSeekerProfile.domain = body.picture;
                if (body.location)
                    jobSeekerProfile.location = body.location;
                if (body.fname)
                    jobSeekerProfile.salary = body.fname;
                if (body.lname)
                    jobSeekerProfile.applyDeadline = body.lname;
                if (body.contactNo)
                    jobSeekerProfile.startDate = body.contactNo;
                if (body.email)
                    jobSeekerProfile.endDate = body.email;
                if (body.referralCode)
                    jobSeekerProfile.referralCode = body.referralCode;
                if (body.primarySkills)
                    jobSeekerProfile.primarySkills = body.primarySkills;
                if (body.otherSkills)
                    jobSeekerProfile.otherSkills = body.otherSkills;
                jobSeekerProfile.save(function (err) {
                    if (err) {
                        console.log('error');
                        response.send('Error in: Status update');
                    }
                    else {
                        console.log('success');
                        response.send('{"jobSeekerId":"' + jobSeekerId + '", "Response":"Job Seeker Profile updated"}');
                    }
                });
            }
        });
    };
    JobSeekerModel.prototype.updateJobSeekerWorkExperience = function (response, jobSeekerId, workExperienceId, body) {
        this.model.findOneAndUpdate({ jobSeekerId: jobSeekerId }, body, function (err, jobSeeker) {
            var workExperienceToString = JSON.stringify(jobSeeker.workExperience);
            var parseWorkExperience = JSON.parse(workExperienceToString);
            var lengthOfWorkExp = Object.keys(parseWorkExperience).length;
            for (var i = 1; i < lengthOfWorkExp; i++) {
                if (parseWorkExperience[i].workExperienceId == workExperienceId) {
                    if (body.role) {
                        parseWorkExperience[i].role = body.role;
                        jobSeeker.workExperience = parseWorkExperience;
                    }
                    if (body.companyName) {
                        parseWorkExperience[i].companyName = body.companyName;
                        jobSeeker.workExperience = parseWorkExperience;
                    }
                    if (body.fromDate) {
                        parseWorkExperience[i].fromDate = body.fromDate;
                        jobSeeker.workExperience = parseWorkExperience;
                    }
                    if (body.toDate) {
                        parseWorkExperience[i].toDate = body.toDate;
                        jobSeeker.workExperience = parseWorkExperience;
                    }
                    jobSeeker.save(function (err) {
                        if (err) {
                            console.log('error');
                            response.send("error");
                        }
                        else {
                            console.log('success work exp. updated for', jobSeeker.fname);
                            response.send('Work Exp. updated');
                        }
                    });
                }
                else {
                    console.log("error", err);
                }
            }
        });
    };
    JobSeekerModel.prototype.updateJobSeekerEducation = function (response, jobSeekerId, educationId, body) {
        this.model.findOneAndUpdate({ jobSeekerId: jobSeekerId }, body, function (err, jobSeeker) {
            var educationToString = JSON.stringify(jobSeeker.education);
            var parseEducation = JSON.parse(educationToString);
            var lengthOfEducation = Object.keys(parseEducation).length;
            console.log("educationToString", educationToString);
            console.log("parseEducation", parseEducation);
            console.log("lengthOfEducation", lengthOfEducation);
            for (var i = 1; i < lengthOfEducation; i++) {
                if (parseEducation[i].educationId == educationId) {
                    console.log(parseEducation[i]);
                    if (body.universityName) {
                        parseEducation[i].universityName = body.universityName;
                        jobSeeker.education = parseEducation;
                    }
                    if (body.degree) {
                        parseEducation[i].degree = body.degree;
                        jobSeeker.education = parseEducation;
                    }
                    if (body.fromDate) {
                        parseEducation[i].fromDate = body.fromDate;
                        jobSeeker.education = parseEducation;
                    }
                    if (body.toDate) {
                        parseEducation[i].toDate = body.toDate;
                        jobSeeker.education = parseEducation;
                    }
                    jobSeeker.save(function (err) {
                        if (err) {
                            console.log('error', err);
                            response.send("error");
                        }
                        else {
                            console.log('success: Education updated for', jobSeeker.fname);
                            response.send('Education updated');
                        }
                    });
                }
                else {
                    console.log("error", err);
                }
            }
        });
    };
    JobSeekerModel.prototype.deleteJobSeeker = function (response, filter) {
        var query = this.model.deleteOne(filter);
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    return JobSeekerModel;
}());
exports.JobSeekerModel = JobSeekerModel;
