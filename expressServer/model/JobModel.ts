import Mongoose = require("mongoose");
import {DataAccess} from '../DataAccess';
import {IJobModel} from '../interfaces/IJobModel';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class JobModel {


    public schema:any;
    public model:any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                title: String,
                skills: [String],
                domain: String,
                jobId: String,
                jobPosterId: String,
                location: String,
                description: String,
                salary: String,
                applyDeadline:String,
                startDate:String,
                endDate:String,
                experienceNeeded:String,
                hasApplicants:String
            }, {collection: 'job'}
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IJobModel>("Jobs", this.schema);
    }

    public retrieveAllJobs(response:any): any {
        var query = this.model.find({});
        query.exec( (err, itemArray) => {
            response.json(itemArray) ;
        });
    }

    public retrieveJobsByJobPoster(response:any, filter:Object) {
        var query = this.model.find(filter);
        query.exec( (err, itemArray) => {
            console.log(itemArray);
            response.json(itemArray);
        });
    }

    public retrieveJobsWithApplicants(response:any, filter:Object) {
        var query = this.model.find(filter);
        console.log('Query  ' + query);
        query.exec( (err, itemArray) => {
            console.log("search results " + itemArray);
            response.json(itemArray);
        });
    }

    public retrieveJobDetails(response:any, filter:Object) {
        var query = this.model.findOne(filter);
        console.log('Query  ' + query);
        query.exec( (err, itemArray) => {
            response.json(itemArray);
        });
    }

    public retrieveJobsBySearch(response:any, filter:Object) {
        var query = this.model.find(filter);
        console.log('Search Query  ' + query);
        
        query.exec( (err, itemArray) => {
            console.log("search results "+itemArray);
            response.json(itemArray);
        });
    }

    public deleteJob(response:any, filter:Object) {
        var query = this.model.deleteOne(filter);
        query.exec( (err, itemArray) => {
            response.json(itemArray);
        });
    }

    public deleteManyJobs(response:any, filter:Object) {
        var query = this.model.deleteMany(filter);
        query.exec( (err, itemArray) => {
        });
    }  

    public updateJob(response:any, jobId :any, body: any) {
        this.model.findOneAndUpdate({jobId: jobId}, body, function (err, job)  {   
            if (!job)
            console.log('Could not fetch specified job');
            else {
                if(body.skills)
                job.skills = body.skills;  
                if(body.title)
                job.title = body.title; 
                if(body.domain) 
                job.domain = body.domain;  
                if(body.location)
                job.location = body.location;  
                if(body.salary)
                job.salary = body.salary;  
                if(body.applyDeadline)
                job.applyDeadline = body.applyDeadline;  
                if(body.startDate)
                job.startDate = body.startDate;  
                if(body.endDate)
                job.endDate = body.endDate;  
                if(body.experienceNeeded)
                job.experienceNeeded = body.experienceNeeded;  
            
                job.save(function(err) {
                    if (err){
                    console.log('error');
                    //response.send('Error : Job not updated');
                    }
                    else
                    {
                    console.log('success')
                    response.send('{"jobId":"' + jobId + '", "Response":"Job Details updated"}');
                    //response.send('Job object updated');
                    }
              });
            }
          });

    }
    
}
export {JobModel};