import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPosterProfileComponent } from './job-poster-profile.component';

describe('JobPosterProfileComponent', () => {
  let component: JobPosterProfileComponent;
  let fixture: ComponentFixture<JobPosterProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobPosterProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobPosterProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
