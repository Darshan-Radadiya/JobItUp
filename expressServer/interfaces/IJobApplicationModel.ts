import Mongoose = require("mongoose");

interface IJobApplicationModel extends Mongoose.Document {
      jobId : string;
      jobSeekerId: string;
	  jobApplicationId: string;
	  expectedSalary: string;
      resume:string;
	  workAuthorization:string;
	  status: string;
	  email: string;
	  phone: string;	  
}
export {IJobApplicationModel};


