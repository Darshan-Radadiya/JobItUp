import Mongoose = require("mongoose");
import {DataAccess} from './../DataAccess';
import {IUserModel} from '../interfaces/IUserModel';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class UserModel {
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
                userName: String,
                profileType: String,
                ssoId: String,
                email: String
                
            }, {collection: 'user'}
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IUserModel>("User", this.schema);
    }

    public retrieveAllUsers(response:any): any {
        var query = this.model.find({});
        query.exec( (err, itemArray) => {
            response.json(itemArray) ;
        });
    }

    public retrieveUserDetails(response:any, filter:Object) {
        var query = this.model.findOne(filter);
        query.exec( (err, itemArray) => {
            response.json(itemArray);
        });
    }


}
export {UserModel};