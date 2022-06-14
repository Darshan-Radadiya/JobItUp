import { Component, OnInit } from '@angular/core';
import { JobSeekerClass } from '../jobseeker-class';
import { HttpClient } from '@angular/common/http';
import { JobItUpApisService } from '../job-it-up-apis.service';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-job-seeker-edit-profile',
  templateUrl: './job-seeker-edit-profile.component.html',
  styleUrls: ['./job-seeker-edit-profile.component.css']
})
export class JobSeekerEditProfileComponent implements OnInit {
  jobSeekerResults!: JobSeekerClass;
  isJobSeeker: string="Y";
  jobSeekerId: string="";
  fname: string="";
  lname: string="";
  bio: string="";
  resume: string="";
  contactNo: string="";
  email: string="";
  location: string="";
  primarySkills: Array<string>=[];
  // primarySkill: Array<string>=[];
  otherSkills:Array<string>=[];
  // otherSkill: Array<string>=[];
  workExperiences!: JobSeekerClass["workExperience"];
  companyName: Array<string>=[];
  role: Array<string>=[];
  fromDate: Array<string>=[];
  toDate: Array<string>=[];
  educations!: JobSeekerClass["education"];
  universityName: Array<string>=[];
  degree: Array<string>=[];
  response_id: string="";

  checkoutForm = this.fb.group({
  primarySkills: [],
  otherSkills: [],
  // otherSkills: ['', Validators.required],
  bio: '',
  resume: '',
  picture: '',
  location: '',
  fname: '',
  lname: '',
  contactNo: '',
  email: '',
  workExperience: this.fb.array([
    this.fb.group({
      companyName: '',
      role: '',
      fromDate: '',
      toDate: ''
    }),
    this.fb.group({
      companyName: '',
      role: '',
      fromDate: '',
      toDate: ''
    })
  ]),
  education: this.fb.array([
    this.fb.group({
      universityName: '',
      degree: '',
      fromDate: '',
      toDate: ''
    }),
    this.fb.group({
      universityName: '',
      degree: '',
      fromDate: '',
      toDate: ''
    })
  ])
  }); 

  constructor(
    private route: ActivatedRoute, 
    private apiService: JobItUpApisService, 
    private http: HttpClient,
    private fb: FormBuilder) {}

  ngOnInit(): void {
    this.jobSeekerId = this.route.snapshot.params['id'];
    console.log("Job Seeker ID passed from Job Seeker Profile Page is: ", this.jobSeekerId);
    
    this.apiService.getJobSeekerProfile(this.jobSeekerId).subscribe((jobSeeker: JobSeekerClass) => 
    {
      console.log('API Service Result for this Job Seeker is: ' + JSON.stringify(jobSeeker));
      this.jobSeekerResults = jobSeeker;
      this.fname = jobSeeker.fname;
      this.lname = jobSeeker.lname;
      this.bio = jobSeeker.bio;
      this.resume = jobSeeker.resume;
      this.contactNo = jobSeeker.contactNo;
      this.email = jobSeeker.email;
      this.location = jobSeeker.location;
      this.primarySkills = jobSeeker.primarySkills;
      this.otherSkills = jobSeeker.otherSkills;
      this.workExperiences = jobSeeker.workExperience;
      this.educations = jobSeeker.education;

      /** Work Experience */ 
      jobSeeker.workExperience.forEach((element, index)=>{
        this.companyName[index] = element.companyName;
        this.role[index] = element.role;
        this.fromDate[index]  = element.fromDate;
        this.toDate[index]  = element.toDate;
      });

      /** Education */ 
      this.educations.forEach((element, index)=>{
        this.universityName[index]  = element.universityName;
        this.degree[index]  = element.degree;
        this.fromDate[index]  = element.fromDate;
        this.toDate[index]   = element.toDate;
      });

    });
  }

  submitForm(Values: any) {
    console.log("job id passed to form group is ", this.jobSeekerId)

    this.checkoutForm.patchValue({
      jobSeekerId: this.jobSeekerId,
    });

    console.log("values.....", this.checkoutForm.value)
    

    this.apiService.editJobSeekerProfile(this.jobSeekerId, this.checkoutForm.value).subscribe((jobSeeker: JobSeekerClass) => 
    {
      this.response_id = jobSeeker.jobSeekerId;
      console.log('API Service Result for this Job Seeker is: ' + JSON.stringify(jobSeeker));
      this.ngOnInit();
    });

  }

  jobSeekerLink(id: string): string {
    this.jobSeekerId = id;
    console.log(this.jobSeekerId);
    return "/jobSeekerProfile/" + (id);
  }

}
