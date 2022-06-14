import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobClass } from '../job-class';
import { JobItUpApisService } from '../job-it-up-apis.service';
import { JobSeekerClass } from '../jobseeker-class';
import { JobApplicationClass } from '../jobseeker-jobapplication';

@Component({
  selector: 'app-view-applicants',
  templateUrl: './view-applicants.component.html',
  styleUrls: ['./view-applicants.component.css'],
})
export class ViewApplicantsComponent implements OnInit {
  jobId: string = '';

  selectedApplication!: JobApplicationClass;

  jobApplication: Array<object> = [];

  applied_for: Array<string> = [];
  applicantName: Array<string> = [];
  status: Array<string> = [];
  email: Array<string> = [];
  phone: Array<string> = [];
  resume: Array<string> = [];

  public results: Array<JobClass> = [];
  public jobApplications: Array<JobApplicationClass> = [];
  public JobSeekerProfiles: Array<JobSeekerClass> = [];

  constructor(
    private apiService: JobItUpApisService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.jobId = this.route.snapshot.params['id'];
    this.apiService
      .jobApplicationsByJobId(this.jobId)
      .subscribe((jobApplications: JobApplicationClass[]) => {
        this.jobApplication = jobApplications;
        console.log(this.jobApplication);
        jobApplications.forEach((ele, index) => {
          this.apiService
            .getJobSeekerProfile(jobApplications[index].jobSeekerId)
            .subscribe((JobSeeker: JobSeekerClass) => {
              this.applicantName[index] =
                JobSeeker.fname + ' ' + JobSeeker.lname;
              this.email[index] = jobApplications[index].email;
              this.phone[index] = jobApplications[index].phone;
              this.status[index] = jobApplications[index].status;
            });
          this.apiService
            .getSpecificJob(jobApplications[index].jobId)
            .subscribe((job: JobClass) => {
              this.applied_for[index] = job.title;
            });
        });
      });
  }


  acceptBtn(newValue: any) {
    console.log(newValue)

    if (confirm('Are you sure to accept job application?')) {
      this.selectedApplication = newValue

      const body = { "status": "Accepted" }
      this.apiService.updateApplicationStatus(newValue.jobApplicationId, body).subscribe(() => { 
        console.log('API Service Result for this Job Seeker is: ');
        console.log("first", body)
        alert("Application accepted successfully");
        this.ngOnInit();
      });
    }
    else {
      alert("Operation canceled")
      this.ngOnInit();
    }
  }

  rejectBtn(newValue: any) {

    if (confirm('Are you sure to reject job application?')) {

      this.selectedApplication = newValue
      const body = { "status": "Rejected" }
      console.log("first", body)
      this.apiService.updateApplicationStatus(newValue.jobApplicationId, body).subscribe(() => {
        alert("Application rejected successfully");
        this.ngOnInit();
      })
    }
    else {
      alert("Operation canceled")
      this.ngOnInit();
    }
  }

}
