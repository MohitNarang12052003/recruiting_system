import { TestBed } from '@angular/core/testing';

import { HRGuardService } from './hrguard.service';

describe('HRGuardService', () => {
  let service: HRGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HRGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
