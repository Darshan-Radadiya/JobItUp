import { Component, OnInit } from '@angular/core';
import { JobClass } from '../job-class';
import { JobPosterClass } from '../jobposter-class';
import { JobItUpApisService } from '../job-it-up-apis.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserClass } from '../user-class';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  results: Array<JobClass> = [];
  companyLogo: Array<String>= [];
  companyName: Array<String>= [];
  jobId!: string ;
  selectedJob!: JobClass;
  selectedCompanyLogo!: String;
  selectedCompanyName!: String;
  isJobSeeker!: string;
  jobPosterId!: String;
  jobSeekerId!: String;

  userresults!: UserClass;
  userId!: string;
  displayName!: string;
  profileType!: string;

  checkoutForm = this.fb.group({
    title: '',
    domain: 'Select Domain',
    location: '',
    startDate: '',
    endDate: ''
  });
  constructor(
    private fb: FormBuilder,
    private apiService: JobItUpApisService,
    private route: ActivatedRoute
    ) {

  }

  async ngOnInit() {
    this.isJobSeeker = this.route.snapshot.params['isJobSeeker'];
    if(this.isJobSeeker == "N")
    {
      this.jobPosterId = this.route.snapshot.params['id'];
    }
    else
    {
      this.jobSeekerId = this.route.snapshot.params['id'];
    }
    // this.isJobSeeker='N';
    // if(this.isJobSeeker == "Y")
    // {
    this.apiService.getJobs(this.isJobSeeker, this.jobPosterId).subscribe((result: JobClass[]) => {
      console.log("The response for all jobs is",result);
      this.results = result;
      this.selectedJob = result[0];
      console.log("job results:" + this.results);

      //setting company logo at each index
      result.forEach((element, index) => {
     
        this.apiService.getSpecificJobPoster(element.jobPosterId).subscribe((poster: JobPosterClass) => 
          { 
            this.companyLogo[index] = poster.companyLogo
            this.companyName[index] = poster.companyName
            console.log('company logo path at index ' + [index] + ' is ' + (this.companyLogo[index]));
            console.log('company name path at index ' + [index] + ' is ' + (this.companyName[index]));
            //to display the first job details when page is loaded
            if(index==0){
            this.selectedCompanyLogo=this.companyLogo[index];
            this.selectedCompanyName=this.companyName[index];
            }
          });
        });
      });
      await this.getUser();
    // }
  }

  async getUser()
  {
      let user: UserClass= await this.apiService.getUser();
      this.userresults = user;
      this.userId = user.userId;
      this.displayName = user.userName;
      this.profileType = user.profileType;
      console.log ('After get User API call -User ID is ', this.userId, "displayName is ", this.displayName, "profileType is ", this.profileType);

      if(this.profileType == 'JP')
      {
        this.isJobSeeker = 'N';
      }
      else{
        this.isJobSeeker = 'Y';
      } 
  }

  link(index: string): string {
    console.log('Job Seeker: ',this.jobSeekerId, 'applying to Job ID: ', index);
    return "/applyjob/" + (index) + '/' + this.jobSeekerId;
  }
  editJobLink(index: string): string {
    this.jobId = index;
    console.log("Going to edit job id: ", index, " posted by job poster: ", this.jobPosterId);
    return "/editjob/" + (this.jobPosterId) + '/' + index;
  }
  listClick(newValue: JobClass,index: number) {

    //setting the selected job to model
    this.selectedJob = newValue;
    this.selectedCompanyLogo=this.companyLogo[index];
    this.selectedCompanyName=this.companyName[index];
  }

  //split the description string using new line to preserve format
  getDescription(desc: string): string[] {
    return desc.split("\n");
  }

  search(){
    console.log("Values from HTML are.....", this.checkoutForm.value)
    this.apiService.searchJobs(this.isJobSeeker, this.jobPosterId,this.checkoutForm).subscribe((result: JobClass[]) => {   
      this.results = result;
      this.selectedJob = result[0];
      console.log("job results:" + this.results);
if(result!=null){
      //setting company logo at each index
      result.forEach((element, index) => {
     
        this.apiService.getSpecificJobPoster(element.jobPosterId).subscribe((poster: JobPosterClass) => 
          { 
            this.companyLogo[index] = poster.companyLogo
            this.companyName[index] = poster.companyName
            console.log('company logo path at index ' + [index] + ' is ' + (this.companyLogo[index]));
            console.log('company name path at index ' + [index] + ' is ' + (this.companyName[index]));
            //to display the first job details when page is loaded
            if(index==0){
            this.selectedCompanyLogo=this.companyLogo[index];
            this.selectedCompanyName=this.companyName[index];
            }
          });
        }); 
      }  
    });
  }
  viewApplicants(index:string): string {
    // this.jobPosterId = "1";
    this.jobId = index;
    return "/viewApplicants/" + (this.jobId);
  }
}