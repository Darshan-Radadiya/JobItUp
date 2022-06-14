import Mongoose = require("mongoose");

interface IJobModel extends Mongoose.Document {
    title: string;
    skills:string[];
    domain: string;
    jobId: string;
    jobPosterId: string;
    location: string;
    description: string;
    salary: string;
    applyDeadline:string;
	startDate:string;
	endDate:string;
	experienceNeeded:string;
    hasApplicants:String
}
export {IJobModel};