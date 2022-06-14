import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomepageComponent } from './homepage/homepage.component';
import { HttpClientModule } from '@angular/common/http';
import { ApplyJobPageComponent } from './apply-job-page/apply-job-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostJobPageComponent } from './post-job-page/post-job-page.component';
import { AppliedJobsComponent } from './applied-jobs/applied-jobs.component';
import { JobSeekerProfileComponent } from './job-seeker-profile/job-seeker-profile.component';
import { JobSeekerEditProfileComponent } from './job-seeker-edit-profile/job-seeker-edit-profile.component';
import { JobPosterProfileComponent } from './job-poster-profile/job-poster-profile.component';
import { JobPosterEditProfileComponent } from './job-poster-edit-profile/job-poster-edit-profile.component';
import { ViewApplicantsComponent } from './view-applicants/view-applicants.component';
import { LoginComponent } from './login/login.component';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ApplyJobPageComponent,
    PostJobPageComponent,
    AppliedJobsComponent,
    JobSeekerProfileComponent,
    JobSeekerEditProfileComponent,
    JobPosterProfileComponent,
    JobPosterEditProfileComponent,
    ViewApplicantsComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,    //added here too
    ReactiveFormsModule //added here too
  ],
  providers: [
    CookieService,
  ],
  bootstrap: [AppComponent],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AppModule { }
