import Mongoose = require("mongoose");
import {DataAccess} from '../DataAccess';
import {IJobApplicationModel} from '../interfaces/IJobApplicationModel';
import { STATUS_CODES } from "http";

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class JobApplicationModel {
    public schema:any;
    public model:any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                jobId : String,
                jobSeekerId: String,
                jobApplicationId: String,
                expectedSalary: String,
                resume:String,
                workAuthorization:String,
                status: String,
                email: String,
                phone: String
            }, {collection: 'jobApplication'}
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IJobApplicationModel>("JobApplication", this.schema);
    }
   
    public retrieveJobApplicationDetails(response:any, filter:Object) {
        var query = this.model.findOne(filter);
        query.exec( (err, itemArray) => {
            response.json(itemArray);
        });
    }

    public retrieveJobApplications(response:any, filter:Object) {
        var query = this.model.find(filter);
        query.exec( (err, itemArray) => {
            console.log(itemArray);
            response.json(itemArray);
        });
    }
    public retrieveAllJobApplications(response:any): any {
        var query = this.model.find({});
        query.exec( (err, itemArray) => {
            response.json(itemArray) ;
        });
    }

    public deleteJobApplications(response:any, filter:Object) {
        var query = this.model.deleteOne(filter);
        query.exec( (err, itemArray) => {
            response.json(itemArray);
        });
    }

    public deleteJobApplicationsByJobId(response:any, filter:Object) {
        var query = this.model.deleteMany(filter);
        query.exec( (err, itemArray) => {
        });
    }

    public deleteManyApplications(response:any, filter:Object) {
        var query = this.model.deleteMany(filter);
        query.exec( (err, itemArray) => {
        });
    } 
}
export {JobApplicationModel};