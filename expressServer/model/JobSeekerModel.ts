import Mongoose = require("mongoose");
import { DataAccess } from '../DataAccess';
import { IJobSeekerModel } from "../interfaces/IJobSeekerModel";

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class JobSeekerModel {


    public schema: any;
    public model: any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {

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
                    }],
                workExperience: [
                    {
                        workExperienceId: String,
                        companyName: String,
                        role: String,
                        fromDate: String,
                        toDate: String,
                    }]
            }, { collection: 'jobSeeker' }
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IJobSeekerModel>("JobSeeker", this.schema);
    }

    public retrieveAllJobSeekers(response: any): any {
        var query = this.model.find({});
        query.exec((err, itemArray) => {
            response.json(itemArray);
        });
    }
    public retrieveJobSeekerDetails(response: any, filter: Object) {
        var query = this.model.findOne(filter);
        query.exec((err, itemArray) => {
            response.json(itemArray);
        });
    }

    public updateJobSeekerProfile(response: any, jobSeekerId: any, body: any) {
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
                        console.log('success')
                        response.send('{"jobSeekerId":"' + jobSeekerId + '", "Response":"Job Seeker Profile updated"}');
                    }
                });
            }
        });
    }

    public updateJobSeekerWorkExperience(response: any, jobSeekerId: any, workExperienceId: any, body: any) {
        this.model.findOneAndUpdate({ jobSeekerId: jobSeekerId }, body, function (err, jobSeeker) {

            const workExperienceToString = JSON.stringify(jobSeeker.workExperience);
            const parseWorkExperience = JSON.parse(workExperienceToString);
            const lengthOfWorkExp = Object.keys(parseWorkExperience).length;

            for (let i = 1; i < lengthOfWorkExp; i++) {

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
                            console.log('success work exp. updated for', jobSeeker.fname)
                            response.send('Work Exp. updated');
                        }
                    });
                }
                else {
                    console.log("error", err);
                }
            }
        });
    }

    public updateJobSeekerEducation(response: any, jobSeekerId: any, educationId: any, body: any) {
        this.model.findOneAndUpdate({ jobSeekerId: jobSeekerId }, body, function (err, jobSeeker) {

            const educationToString = JSON.stringify(jobSeeker.education);
            const parseEducation = JSON.parse(educationToString);
            const lengthOfEducation = Object.keys(parseEducation).length;

            console.log("educationToString", educationToString)
            console.log("parseEducation", parseEducation)
            console.log("lengthOfEducation", lengthOfEducation)

            for (let i = 1; i < lengthOfEducation; i++) {

                if (parseEducation[i].educationId == educationId) {
                    console.log(parseEducation[i])
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
    }

    public deleteJobSeeker(response: any, filter: Object) {
        var query = this.model.deleteOne(filter);
        query.exec((err, itemArray) => {
            response.json(itemArray);
        });
    }
}
export { JobSeekerModel };