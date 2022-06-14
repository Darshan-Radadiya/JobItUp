import Mongoose = require("mongoose");
import {DataAccess} from '../DataAccess';
import { IJobPosterModel } from "../interfaces/IJobPosterModel";

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class JobPosterModel {


    public schema:any;
    public model:any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                
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
            }, {collection: 'jobPoster'}
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IJobPosterModel>("JobPoster", this.schema);
    }

    public retrieveAllJobPosters(response:any): any {
        var query = this.model.find({});
        query.exec( (err, itemArray) => {
            response.json(itemArray) ;
        });
    }
    public retrieveJobPosterDetails(response:any, filter:Object) {
        var query = this.model.findOne(filter);
        query.exec( (err, itemArray) => {
            response.json(itemArray);
        });
    }

    public deleteJobPoster(response:any, filter:Object) {
        var query = this.model.deleteOne(filter);
        query.exec( (err, itemArray) => {
        response.json(itemArray);
        });
    }

    public updateJobPosterDetails(response:any, jobPosterId :any, body: any) {
        this.model.findOneAndUpdate({jobPosterId: jobPosterId}, body, function (err, jobPoster)  {   
            if (!jobPoster)
            console.log('Unable to fetch specified job poster');
            else {
                if(body.contactNo)
                jobPoster.contactNo = body.contactNo;  
                if(body.fname)
                jobPoster.fname = body.fname; 
                if(body.lname) 
                jobPoster.lname = body.lname;  
                if(body.email)
                jobPoster.email = body.email;  
                if(body.referralCode)
                jobPoster.referralCode = body.referralCode;  
                if(body.location)
                jobPoster.location = body.location;  
                if(body.companyName)
                jobPoster.companyName = body.companyName;  
                if(body.picture)
                jobPoster.picture = body.picture;  
                if(body.companyLogo)
                jobPoster.companyLogo = body.companyLogo;  
                if(body.Overview)
                jobPoster.Overview = body.Overview;  
                if(body.website)
                jobPoster.website = body.website;  
                if(body.industry)
                jobPoster.industry = body.industry; 
                if(body.companySize)
                jobPoster.companySize = body.companySize;
                if(body.headquarters)
                jobPoster.headquarters = body.headquarters;
                if(body.founded)
                jobPoster.founded = body.founded;
            
                jobPoster.save(function(err) {
                    if (err){
                    console.log('error');
                    response.send('Error : Job Poster details not updated');
                    }
                    else
                    {
                    console.log('success')
                    response.send('{"jobPosterid":"' + jobPosterId + '", "Response":"JobPoster Profile updated"}');
                    }
              });
            }
          });
    }

}
export {JobPosterModel};