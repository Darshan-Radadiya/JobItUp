import { Component, OnInit } from '@angular/core';
import { JobPosterClass } from '../jobposter-class';
import { JobItUpApisService } from '../job-it-up-apis.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-job-poster-edit-profile',
  templateUrl: './job-poster-edit-profile.component.html',
  styleUrls: ['./job-poster-edit-profile.component.css']
})
export class JobPosterEditProfileComponent implements OnInit {
  jobPosterResults!: JobPosterClass;
  isJobPoster: string="Y";
  jobPosterId: string="";
  response_id: string="";
  contactNo: string="";
  location: string="";
  companyName: string="";
  Overview: string="";
  website: string="";
  industry: string="";
  companySize: string="";
  headquarters: string="";
  founded: string="";


  checkoutForm = this.fb.group({
	  contactNo: '',
	  location: '',
	  companyName: '',
	  Overview: '',
	  website: '',
	  industry: '',
	  companySize: '',
	  headquarters: '',
	  founded: ''
  }); 

  constructor(
    private route: ActivatedRoute, 
    private apiService: JobItUpApisService, 
    private http: HttpClient,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.jobPosterId = this.route.snapshot.params['id'];
    console.log("Job Poster ID passed from Job Poster Profile Page is: ", this.jobPosterId);
    
    this.apiService.getJobPosterProfile(this.jobPosterId).subscribe((jobPoster: JobPosterClass) => 
    {
      this.jobPosterResults = jobPoster;
      this.contactNo = jobPoster.contactNo;
      this.location = jobPoster.location;
      this.companyName = jobPoster.companyName;
      this.Overview = jobPoster.Overview;
      this.website = jobPoster.website;
      this.industry = jobPoster.industry;
      this.companySize = jobPoster.companySize;
      this.headquarters = jobPoster.headquarters;
      this.founded = jobPoster.founded;
      console.log('API Service Result for this Job Poster is: ' + JSON.stringify(jobPoster));
    });
  }

  submitForm(Values: any) {
    console.log("job id passed to form group is ", this.jobPosterId)

    this.checkoutForm.patchValue({
      jobPosterId: this.jobPosterId,
    });

    console.log("values.....", this.checkoutForm.value)
  
  
    this.apiService.editJobPosterProfile(this.jobPosterId, this.checkoutForm.value).subscribe((jobPoster: JobPosterClass) => 
    {
      this.response_id = jobPoster.jobPosterId;
      console.log('API Service Result for this Job Poster is: ' + JSON.stringify(jobPoster));
      this.ngOnInit();
    });

  }

  jobPosterLink(id: string): string {
    this.jobPosterId = id;
    console.log(this.jobPosterId);
    return "/jobPosterProfile/" + (id);
  }

}
