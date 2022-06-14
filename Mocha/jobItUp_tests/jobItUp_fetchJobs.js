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
        //chai.request("http://localhost:8080")
        chai.request("https://jobitup.azurewebsites.net/")
			.get("/api/job")
			.end(function (err, res) {
				requestResult = res.body;
				response = res;
                expect(err).to.be.null;
                expect(res).to.have.status(200);
				done();
			});
        });
    
    /*Checking the response and its body*/
    it('API should return a list of all jobs', function (){
		expect(response).to.have.status(200);
        expect(response).to.be.json; 
        expect(response).to.be.an('object');
        expect(response.body).to.be.an('array').to.have.length.above(0);
		expect(response).to.have.headers;
        expect(response.body).to.not.be.a.string;
    });

    /*Checking keys for the jobs array */
	it('The first array of the job array should have all keys', function(){
        expect(requestResult[0]).to.include.keys('skills');
        expect(requestResult[0]).to.include.keys('title');
        expect(requestResult[0]).to.include.keys('domain');
        expect(requestResult[0]).to.include.keys('jobId');
        expect(requestResult[0]).to.include.keys('jobPosterId');
        expect(requestResult[0]).to.include.keys('location');
        expect(requestResult[0]).to.include.keys('description');
        expect(requestResult[0]).to.include.keys('salary');
        expect(requestResult[0]).to.include.keys('applyDeadline');
        expect(requestResult[0]).to.include.keys('startDate');
        expect(requestResult[0]).to.include.keys('endDate');
        expect(requestResult[0]).to.include.keys('experienceNeeded');
        expect(requestResult[0]).to.include.keys('hasApplicants');
	});

    /*Checking expected properties for all arrays */
	it('All arrays of jobs should have the expected properties', function(){
		expect(response.body).to.satisfy(
			function (body) {
				for (var i = 0; i < body.length; i++) {
					expect(body[i]).to.have.property('skills');
					expect(body[i]).to.have.property('title');
					expect(body[i]).to.have.property('domain');
                    expect(body[i]).to.have.property('jobId');
                    expect(body[i]).to.have.property('jobPosterId');
                    expect(body[i]).to.have.property('location');
                    expect(body[i]).to.have.property('description');
                    expect(body[i]).to.have.property('salary');
                    expect(body[i]).to.have.property('applyDeadline');
                    expect(body[i]).to.have.property('startDate');
                    expect(body[i]).to.have.property('endDate');
                    expect(body[i]).to.have.property('experienceNeeded');
                    expect(body[i]).to.have.property('hasApplicants');
                }
                return true;
            })
        });

    /*Checking property value lengths of all arrays */
    it('All arrays of jobs should have the expected property value lengths', function(){
        expect(response.body).to.satisfy(
			function (body) {
				for (var i = 0; i < body.length; i++) {
                    expect(body[i]).to.have.property('skills').to.have.length.above(0);
                    expect(body[i]).to.have.property('title').to.have.length.above(0);
                    expect(body[i]).to.have.property('domain').to.have.length.above(0);
                    expect(body[i]).to.have.property('jobId').to.have.length.above(0);
                    expect(body[i]).to.have.property('jobPosterId').to.have.length.above(0);
                    expect(body[i]).to.have.property('location').to.have.length.above(0);
                    expect(body[i]).to.have.property('description').to.have.length.above(0);
                    expect(body[i]).to.have.property('salary').to.have.length.above(0);
                    expect(body[i]).to.have.property('applyDeadline').to.have.length.above(0);
                    expect(body[i]).to.have.property('startDate').to.have.length.above(0);
                    expect(body[i]).to.have.property('endDate').to.have.length.above(0);
                    expect(body[i]).to.have.property('experienceNeeded').to.have.length.above(0);
                    expect(body[i]).to.have.property('hasApplicants').to.have.length.above(0);
                    }
                    return true;
                    })
                });

    /** Checking property types */
    it('All arrays of jobs should have the expected field types', function(){
        expect(response.body).to.satisfy(
            function (body) {
                for (var i = 0; i < body.length; i++) {
                    expect(body[i]).to.have.property('skills').that.is.a('array');
					expect(body[i]).to.have.property('title').that.is.a('string');
					expect(body[i]).to.have.property('domain').that.is.a('string');
                    expect(body[i]).to.have.property('jobId').that.is.a('string');
                    expect(body[i]).to.have.property('jobPosterId').that.is.a('string');
                    expect(body[i]).to.have.property('location').that.is.a('string');
                    expect(body[i]).to.have.property('description').that.is.a('string');
                    expect(body[i]).to.have.property('salary').that.is.a('string');
                    expect(body[i]).to.have.property('applyDeadline').that.is.a('string');
                    expect(body[i]).to.have.property('startDate').that.is.a('string');
                    expect(body[i]).to.have.property('endDate').that.is.a('string');
                    expect(body[i]).to.have.property('experienceNeeded').that.is.a('string');
                    expect(body[i]).to.have.property('hasApplicants').that.is.a('string');
				}
				return true;
			});
	});	
});