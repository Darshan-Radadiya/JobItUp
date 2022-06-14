import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { JobClass } from './job-class';
import { JobSeekerClass } from './jobseeker-class';
import { JobPosterClass } from './jobposter-class';
import { Form, FormGroup } from '@angular/forms';
import { UserClass } from './user-class';

@Injectable({
  providedIn: 'root'
})
export class JobItUpApisService {

    // hostUrl: string = 'https://jobitup.azurewebsites.net:443/';
  hostUrl: string = 'http://localhost:8080/';
  // jobPosterId!: string;
  constructor(private http: HttpClient) { }

  getJobs(isJobSeeker: string, jobPosterId: String) {
    if (isJobSeeker == 'Y') {
      return this.http.get<JobClass[]>(this.hostUrl + 'app/job');
    }
    else{
    return this.http.get<JobClass[]>(this.hostUrl + 'app/job/jobposter/' + jobPosterId);
    }
  }

  async getUser():Promise<UserClass>
  {
    const result = await this.http.get<any>(this.hostUrl + 'app/current/').toPromise();
    console.log("Inside get User service - async await - ", result);
    return result;
  }

  getCurrentUser() {

    console.log("getting user");
    
    return this.http.get<any>(this.hostUrl + 'user/current/' );
    
    }

  getSpecificJob(id: string) {
    return this.http.get<any>(this.hostUrl + 'app/job/' + id);
  }

  getSpecificJobPoster(id: string) {
    return this.http.get<any>(this.hostUrl + 'app/jobposter/' + id);
  }

  createJobApplication(checkoutForm: FormData) {
    return this.http.post<any>(this.hostUrl + 'app/jobApplication/', checkoutForm);

  }
  createJobPost(checkoutForm: FormData) {
    return this.http.post<any>(this.hostUrl + 'app/job/', checkoutForm);
  }

  deleteJob(id: string) {

    return this.http.delete<number>(this.hostUrl + "app/job/" + id);

  }

  getJobSeekerProfile(id: string) {
    return this.http.get<JobSeekerClass>(this.hostUrl + 'app/jobseeker/' + id);
  }

  editJobSeekerProfile(jobSeekerId: string, checkoutForm: FormData) {
    return this.http.put<JobSeekerClass>(this.hostUrl + 'app/jobseeker/' + jobSeekerId, checkoutForm);
  }

  updateJobPost(checkoutForm: FormData, id: string) {
    console.log(checkoutForm);
    return this.http.put<any>(this.hostUrl + 'app/job/' + id, checkoutForm);
  }
  getJobSeekerAppliedJobs(id: string) {
    return this.http.get<any>(this.hostUrl + 'app/jobApplication/jobseeker/' + id);
  }

  deleteJobApplication(id: string) {
    return this.http.delete<number>(this.hostUrl + "app/jobApplication/" + id);
  }

  getJobPosterProfile(id: string) {
    return this.http.get<JobPosterClass>(this.hostUrl + 'app/jobposter/' + id);
  }

  editJobPosterProfile(jobPosterId: string, checkoutForm: FormData) {
    return this.http.put<JobPosterClass>(this.hostUrl + 'app/jobposter/' + jobPosterId, checkoutForm);
  }

  jobApplicationsByJobId(jobId: string) {
    return this.http.get<any>(this.hostUrl + 'app/jobApplication/job/' + jobId);
  }

  public updateApplicationStatus(jobApplicationId: string, status: object) {
    return this.http.put<any>(this.hostUrl + 'app/jobApplication/' + jobApplicationId,status);
  }

  searchJobs(isJobSeeker: string, jobPosterId: String, checkoutForm: FormGroup) {
    let params = new HttpParams();
    if (checkoutForm.get('title')?.value != '') {
      params = params.append('title', checkoutForm.get('title')?.value);
    }
    if (checkoutForm.get('domain')?.value != '' && checkoutForm.get('domain')?.value != 'Select Domain') {
      params = params.append('domain', checkoutForm.get('domain')?.value);
    }
    if (checkoutForm.get('location')?.value != '') {
      params = params.append('location', checkoutForm.get('location')?.value);
    }
    if (checkoutForm.get('startDate')?.value != '') {
      params = params.append('startDate', checkoutForm.get('startDate')?.value);
    }
    if (checkoutForm.get('endDate')?.value != '') {
      params = params.append('endDate', checkoutForm.get('endDate')?.value);
    }
    if (isJobSeeker == 'Y') {
      return this.http.get<JobClass[]>(this.hostUrl + "app/jobs", { params: params });
    } else {
      return this.http.get<JobClass[]>(this.hostUrl + "app/jobposter/" + jobPosterId + "/jobs", { params: params });
    }
  }
}
