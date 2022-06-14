import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobItUpApisService } from '../job-it-up-apis.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-apply-job-page',
  templateUrl: './apply-job-page.component.html',
  styleUrls: ['./apply-job-page.component.css']
})
export class ApplyJobPageComponent implements OnInit {
  jobId: string = "";
  response_id: string="";
  jobSeekerId: string="";
 // form: FormGroup;

  checkoutForm = this.fb.group({
    fname: '',
    lname: '',
    email: '',
    phone: '',
    jobId: '',
    workAuthorization: '',
    expectedSalary: '',
    resume: '',
    jobSeekerId: '',
    status: ''
  });

  constructor(
    private fb: FormBuilder, 
    private route: ActivatedRoute, 
    private apiService: JobItUpApisService, 
    private http: HttpClient) {}

  ngOnInit(): void {
    this.jobId = this.route.snapshot.params['id'];
    this.jobSeekerId = this.route.snapshot.params['jobSeekerId'];
    console.log("this is id. in apply job cmpt 16:", this.jobId);
  }

  submitForm(Values: any) {
    console.log("job id passed to form group is ", this.jobId)

    this.checkoutForm.patchValue({
      jobId: this.jobId,
      jobSeekerId: this.jobSeekerId,
      status: "Applied"
    });

    console.log("values.....", this.checkoutForm.value)
    this.apiService.createJobApplication(this.checkoutForm.value).subscribe((response) =>{
      this.response_id = response.id;
      console.log(response);
    });
  }

  alljobs(): string {
    console.log("Go back to Homepage from apply jobs page: ", this.jobSeekerId)
    return '/homepage/' + (this.jobSeekerId) + '/Y';
  }
  

}
