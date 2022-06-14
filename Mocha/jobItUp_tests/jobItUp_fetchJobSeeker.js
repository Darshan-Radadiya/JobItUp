var chai = require('chai');
var chaiHttp = require('chai-http');
var async = require('async');

var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

var http = require('http');
chai.use(chaiHttp);

describe('Test fetch all jobs', function () {

	var requestResult;
	var response;
		 
    before(function (done) {
        /*Make Node Server route call */
     //   chai.request("http://localhost:8080")
        chai.request("https://jobitup.azurewebsites.net/")
			.get("/api/jobseeker/1")
			.end(function (err, res) {
				requestResult = res.body;
				response = res;
                expect(err).to.be.null;
                expect(res).to.have.status(200);
				done();
			});
        });
    
    /*Check response body */
    it('API should return Job Seeker JSON', function (){
		expect(response).to.have.status(200);
        expect(response).to.be.json;
        expect(response.body).to.be.an('object');
		expect(response).to.have.headers;
        expect(response.body).to.not.be.a.string;
        expect(response.body).to.include.keys('jobSeekerId');
    });

    /*Checking all keys being present */
	it('The Job Seeker JSON should have all keys (at root json)', function(){
        expect(requestResult).to.include.keys('primarySkills');
        expect(requestResult).to.include.keys('otherSkills');
        expect(requestResult).to.include.keys('_id');
        expect(requestResult).to.include.keys('userId');
        expect(requestResult).to.include.keys('jobSeekerId');
        expect(requestResult).to.include.keys('bio');
        expect(requestResult).to.include.keys('resume');
        expect(requestResult).to.include.keys('picture');
        expect(requestResult).to.include.keys('location');
        expect(requestResult).to.include.keys('fname');
        expect(requestResult).to.include.keys('lname');
        expect(requestResult).to.include.keys('contactNo');
        expect(requestResult).to.include.keys('email');
        expect(requestResult).to.include.keys('referralCode');
        expect(requestResult).to.include.keys('education');
        expect(requestResult).to.include.keys('workExperience');
    });
        
    /*Checking Nested json properties to be present */
    it('The Job Seeker JSON should have all properties (in nested arrays)', function(){
            expect(response.body).to.satisfy(
                function (body) {
                    for (var i = 0; i < body.length; i++) {
                        expect(body.education[i]).to.have.nested.property('educationId');
                        expect(body.education[i]).to.have.nested.property('universityName');
                        expect(body.education[i]).to.have.nested.property('degree');
                        expect(body.education[i]).to.have.nested.property('fromDate');
                        expect(body.education[i]).to.have.nested.property('toDate');

                        expect(body.workExperience[i]).to.have.nested.property('workExperienceId');
                        expect(body.workExperience[i]).to.have.nested.property('companyName');
                        expect(body.workExperience[i]).to.have.nested.property('role');
                        expect(body.workExperience[i]).to.have.nested.property('fromDate');
                        expect(body.workExperience[i]).to.have.nested.property('toDate');
                    }
                    return true;
                })
    });

    /*Checking field value lengths of the root json fields */
    it('The Job Seeker JSON should have expected field lengths (at root json)', function(){
        expect(requestResult).to.have.property('primarySkills').to.have.length.above(0);
        expect(requestResult).to.have.property('otherSkills').to.have.length.above(0);
        expect(requestResult).to.have.property('_id').to.have.length.above(0);
        expect(requestResult).to.have.property('userId').to.have.length.above(0);
        expect(requestResult).to.have.property('jobSeekerId').to.have.length.above(0);
        expect(requestResult).to.have.property('bio').to.have.length.above(0);
        expect(requestResult).to.have.property('resume').to.have.length.above(0);
        expect(requestResult).to.have.property('picture').to.have.length.above(0);
        expect(requestResult).to.have.property('location').to.have.length.above(0);
        expect(requestResult).to.have.property('fname').to.have.length.above(0);
        expect(requestResult).to.have.property('lname').to.have.length.above(0);
        expect(requestResult).to.have.property('contactNo').to.have.length.above(0);
        expect(requestResult).to.have.property('email').to.have.length.above(0);
        expect(requestResult).to.have.property('referralCode').to.have.length.above(0);
        expect(requestResult).to.have.property('education').to.have.length.above(0);
        expect(requestResult).to.have.property('workExperience').to.have.length.above(0);
        });

    /*Checking field value lengths of the nested json */
    it('The Job Seeker JSON should have expected value lengths (in nested arrays)', function(){
            expect(response.body).to.satisfy(
                function (body) {
                    for (var i = 0; i < body.length; i++) {
                        expect(body.education[i]).to.have.nested.property('educationId').to.have.length.above(0);
                        expect(body.education[i]).to.have.nested.property('universityName').to.have.length.above(0);
                        expect(body.education[i]).to.have.nested.property('degree').to.have.length.above(0);
                        expect(body.education[i]).to.have.nested.property('fromDate').to.have.length.above(0);
                        expect(body.education[i]).to.have.nested.property('toDate').to.have.length.above(0);

                        expect(body.workExperience[i]).to.have.nested.property('workExperienceId').to.have.length.above(0);
                        expect(body.workExperience[i]).to.have.nested.property('companyName').to.have.length.above(0);
                        expect(body.workExperience[i]).to.have.nested.property('role').to.have.length.above(0);
                        expect(body.workExperience[i]).to.have.nested.property('fromDate').to.have.length.above(0);
                        expect(body.workExperience[i]).to.have.nested.property('toDate').to.have.length.above(0);
                    }
                    return true;
                })
        });

    /*Checking types of fields in root response json */
    it('The Job Seeker JSON should have expected property types (at root level)', function(){
        expect(requestResult).to.have.property('primarySkills').that.is.a('array');
        expect(requestResult).to.have.property('otherSkills').that.is.a('array');
        expect(requestResult).to.have.property('_id').that.is.a('string');
        expect(requestResult).to.have.property('userId').that.is.a('string');
        expect(requestResult).to.have.property('jobSeekerId').that.is.a('string');
        expect(requestResult).to.have.property('bio').that.is.a('string');
        expect(requestResult).to.have.property('resume').that.is.a('string');
        expect(requestResult).to.have.property('picture').that.is.a('string');
        expect(requestResult).to.have.property('location').that.is.a('string');
        expect(requestResult).to.have.property('fname').that.is.a('string');
        expect(requestResult).to.have.property('lname').that.is.a('string');
        expect(requestResult).to.have.property('contactNo').that.is.a('string');
        expect(requestResult).to.have.property('email').that.is.a('string');
        expect(requestResult).to.have.property('referralCode').that.is.a('string');
        expect(requestResult).to.have.property('education').that.is.a('array');
        expect(requestResult).to.have.property('workExperience').that.is.a('array');
        });

    /*Checking types of nested json fields in nested response json */
    it('The Job Seeker JSON should have expected property types (in nested arrays)', function(){
        expect(response.body).to.satisfy(
            function (body) {
                for (var i = 0; i < body.length; i++) {
                    expect(body.education[i]).to.have.nested.property('educationId').that.is.a('string');
                    expect(body.education[i]).to.have.nested.property('universityName').that.is.a('string');
                    expect(body.education[i]).to.have.nested.property('degree').that.is.a('string');
                    expect(body.education[i]).to.have.nested.property('fromDate').that.is.a('string');
                    expect(body.education[i]).to.have.nested.property('toDate').that.is.a('string');

                    expect(body.workExperience[i]).to.have.nested.property('workExperienceId').that.is.a('string');
                    expect(body.workExperience[i]).to.have.nested.property('companyName').that.is.a('string');
                    expect(body.workExperience[i]).to.have.nested.property('role').that.is.a('string');
                    expect(body.workExperience[i]).to.have.nested.property('toDate').that.is.a('string');
                    expect(body.workExperience[i]).to.have.nested.property('toDate').that.is.a('string');
                }
                return true;
            })
        });
});