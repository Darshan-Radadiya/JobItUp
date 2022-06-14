import { Component, Inject } from '@angular/core';
import { JobSeekerClass } from './jobseeker-class';
import { JobPosterClass } from './jobposter-class';
import { LoginComponent } from './login/login.component';
import { JobItUpApisService } from './job-it-up-apis.service';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserClass } from './user-class';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //hostUrl: string = 'https://jobitup.azurewebsites.net:443/';
  hostUrl: string = 'http://localhost:8080/';
  title = 'jobItUp';
  cookie!: string;
  variable: number=0;
  results!: UserClass;
  userId!: string;
  displayName!: string;
  profileType!: string;
  isJobSeeker!: String;
  jobSeeker!: JobSeekerClass;
  jobPoster!: JobPosterClass;
  jobSeekerId: string="";
  jobPosterId: string="";

  constructor(
    private apiService: JobItUpApisService,
    private route: ActivatedRoute,
    private cookieService: CookieService
    ) {
      this.cookie = this.cookieService.get('connect.sid');
      this.cookie = this.cookie.replace(/[^a-z0-9]/gi,'');
  }

  async ngOnInit() {
    console.log("Ran NgOnInit now");
    console.log("I am the cookie: ",this.cookie);
    }

  // jobSeekerLink(): string {
  //   console.log("User ID from app component: ", this.userId);
  //   return "/jobSeekerProfile/105931877835398004852";// + this.userId;
  // }

  // jobPosterLink(userId: string): string {
  //   return "/jobPosterProfile/" + userId;    
  // }

  public showNavBar = true;


async getUser()
{
    let user: UserClass= await this.apiService.getUser();
    this.results = user;
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

 async toggleNavBar(component:any) {
    if(component instanceof LoginComponent) {
      this.showNavBar = false;
    } 
    else 
    {
      this.showNavBar = true;
      await this.getUser();
    }
  }
}
