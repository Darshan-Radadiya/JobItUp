export interface JobSeekerClass {
    userId: string,
    jobSeekerId: string,
    bio: string,
    resume: string,
    picture: string,
    location: string,
    fname: string,
    lname: string,
    contactNo: string,
    email: string,
    referralCode: string,
    primarySkills: string[],
    otherSkills: string[],
    education: 
    [ {
        educationId: string,
		universityName: string,
		degree: string,
		fromDate: string,
		toDate: string}
    ],
    workExperience:
    [{
        workExperienceId: string,
        companyName: string,
        role: string,
        fromDate: string,
        toDate: string}
    ]
}