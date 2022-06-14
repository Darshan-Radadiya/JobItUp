import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPosterEditProfileComponent } from './job-poster-edit-profile.component';

describe('JobPosterEditProfileComponent', () => {
  let component: JobPosterEditProfileComponent;
  let fixture: ComponentFixture<JobPosterEditProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobPosterEditProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobPosterEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
