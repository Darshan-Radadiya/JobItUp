import { Component, OnInit } from '@angular/core';
import { JobPosterClass } from '../jobposter-class';
import { HttpClient } from '@angular/common/http';
import { JobItUpApisService } from '../job-it-up-apis.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-poster-profile',
  templateUrl: './job-poster-profile.component.html',
  styleUrls: ['./job-poster-profile.component.css']
})
export class JobPosterProfileComponent implements OnInit {
  jobPosterResults!: JobPosterClass;
  jobPosterId: string="";
  isJobPoster: string="Y";
  contactNo: string="";
  location: string="";
  companyName: string="";
  companyLogo: string= "";
  Overview: string="";
  website: string="";
  industry: string="";
  companySize: string="";
  headquarters: string="";
  founded: string="";

  constructor(
    private route: ActivatedRoute, 
    private apiService: JobItUpApisService, 
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.jobPosterId = this.route.snapshot.params['id'];
    console.log("Job Poster ID passed from Landing Page is: ", this.jobPosterId);
    this.apiService.getJobPosterProfile(this.jobPosterId).subscribe((jobPoster: JobPosterClass) => 
    {
      this.jobPosterResults = jobPoster;
      this.contactNo = jobPoster.contactNo;
      this.location = jobPoster.location;
      this.companyName = jobPoster.companyName;
      this.companyLogo = jobPoster.companyLogo;
      this.Overview = jobPoster.Overview;
      this.website = jobPoster.website;
      this.industry = jobPoster.industry;
      this.companySize = jobPoster.companySize;
      this.headquarters = jobPoster.headquarters;
      this.founded = jobPoster.founded;
      console.log('API Service Result for this Job Poster is: ' + JSON.stringify(jobPoster));
    });
  }

 //split the description string using new line to preserve format
 getDescription(desc: string): string[] 
 {
  return desc.split("\n");
 }
  jobPosterEditLink(id: string): string {
    this.jobPosterId = id;
    console.log(this.jobPosterId);
    return "/jobPosterEditProfile/" + (id);
    }

}
