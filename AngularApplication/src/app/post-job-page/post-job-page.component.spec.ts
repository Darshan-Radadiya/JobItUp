import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostJobPageComponent } from './post-job-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('PostJobPageComponent', () => {
  let component: PostJobPageComponent;
  let fixture: ComponentFixture<PostJobPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostJobPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostJobPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
