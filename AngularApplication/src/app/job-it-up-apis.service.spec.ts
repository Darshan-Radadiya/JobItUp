import { TestBed } from '@angular/core/testing';

import { JobItUpApisService } from './job-it-up-apis.service';

describe('JobItUpApisService', () => {
  let service: JobItUpApisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobItUpApisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
