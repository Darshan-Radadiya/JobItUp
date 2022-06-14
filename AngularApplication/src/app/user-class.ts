export interface UserClass {
    userId: string,
    userName: string;
    profileType: string,
    ssoId: {type: string, required: true, unique: true},
    email: string
}