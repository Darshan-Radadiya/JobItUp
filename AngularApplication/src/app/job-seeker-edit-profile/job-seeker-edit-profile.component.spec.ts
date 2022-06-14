import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSeekerEditProfileComponent } from './job-seeker-edit-profile.component';

describe('JobSeekerEditProfileComponent', () => {
  let component: JobSeekerEditProfileComponent;
  let fixture: ComponentFixture<JobSeekerEditProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobSeekerEditProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobSeekerEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
