import { TestBed } from '@angular/core/testing';

import { NationalHolidaysService } from './national-holidays.service';

describe('NationalHolidaysService', () => {
  let service: NationalHolidaysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NationalHolidaysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
