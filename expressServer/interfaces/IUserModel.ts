import Mongoose = require("mongoose");

interface IUserModel extends Mongoose.Document {
   
    userId: string,
    userName: string;
    profileType: string,
    ssoId: {type: string, required: true, unique: true},
    email: string
   
}
export {IUserModel};