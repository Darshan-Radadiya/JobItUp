var chai = require('chai');
var chaiHttp = require('chai-http');
var async = require('async');

var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

var http = require('http');
chai.use(chaiHttp);

describe('Post Job result', function () {

    var requestResult;
    var response;

    before(function (done) {
   //   chai.request("http://localhost:8080")
        chai.request("https://jobitup.azurewebsites.net/")
            .post("/api/job")
            .send({title: "Ux designer 2",skills : "javascript, java",domain : "Software industry", jobId :"1", jobPosterId :"2", location :"seattle", description :"This is a Ux designing job", salary :"15k", applydeadline :"07/12/2022",
            startDate :"06/13/2022", endDate :"06/18/2022", experienceNeeded : "2 years", hasApplicants : "N"})
            .end(function (err, res) {
                requestResult = res.body;
                response = res.text;
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(response).to.be.a.string;
                done();
            });
    });


    it('the job post response has the key id', function(){
        
        expect(response).to.contain('{"id":"');
	});

    it('Job post response has key id and response length is greater than zero', function(){
      
        expect(response).to.contain('{"id":"').and.to.have.length.above(0);                    
    });

});
