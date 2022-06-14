import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyJobPageComponent } from './apply-job-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('ApplyJobPageComponent', () => {
  let component: ApplyJobPageComponent;
  let fixture: ComponentFixture<ApplyJobPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyJobPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyJobPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
