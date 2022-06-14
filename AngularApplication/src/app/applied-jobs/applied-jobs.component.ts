import { Component, OnInit } from '@angular/core';
import { JobClass } from '../job-class';
import { JobItUpApisService } from '../job-it-up-apis.service';
import { JobPosterClass } from '../jobposter-class';
import { JobApplicationClass } from '../jobseeker-jobapplication';

@Component({
  selector: 'app-applied-jobs',
  templateUrl: './applied-jobs.component.html',
  styleUrls: ['./applied-jobs.component.css'],
})
export class AppliedJobsComponent implements OnInit {

  isJobSeeker!: String;
  jobSeekerId: string = "";
  jobPosterId: string = "";
  jobId: string = "";
  selectedJobIdToDelete!: JobApplicationClass;


  status: String = "";
  companyName: Array<String> = [];
  endDate: Array<String> = [];
  startDate: Array<String> = [];
  JobType: Array<String> = [];
  jobRole: Array<String> = [];

  public results: Array<JobApplicationClass> = [];

  constructor(
    private apiService: JobItUpApisService,
  ) { }

  ngOnInit(): void {
    this.isJobSeeker = 'Y';
    this.jobSeekerId = '1';

    this.apiService.getJobSeekerAppliedJobs(this.jobSeekerId).subscribe((result: JobApplicationClass[]) => {
      console.log("The list of applied jobs are: ",result);
      result.forEach((element, index) => {
        this.results = result;
        this.jobId = result[index].jobId;

        this.status = result[index].status;

        this.apiService.getSpecificJob(this.jobId).subscribe((poster: JobClass) => {
          this.jobPosterId = poster.jobPosterId;

          this.JobType[index] = poster.domain;
          this.endDate[index] = poster.endDate
          this.startDate[index] = poster.startDate
          this.jobRole[index] = poster.title;

          this.apiService.getSpecificJobPoster(this.jobPosterId).subscribe((poster: JobPosterClass) => {
            this.companyName[index] = poster.companyName
          })
        });
      });
    });
  }

  deleteBtn(newValue: JobApplicationClass, index: number) {

    if (confirm('Are you sure to delete Application?')) {

      this.selectedJobIdToDelete = newValue
      console.log('delete pressed....for this job ', newValue.jobApplicationId);

      this.apiService.deleteJobApplication(newValue.jobApplicationId).subscribe(() => {
        alert("Application deleted successfully");
        window.location.reload();
      })

    }
    else {
      alert("Operation canceled")
      window.location.reload();
    }
  }

}

