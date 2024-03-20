import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalHolidaysComponent } from './national-holidays.component';

describe('NationalHolidaysComponent', () => {
  let component: NationalHolidaysComponent;
  let fixture: ComponentFixture<NationalHolidaysComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NationalHolidaysComponent]
    });
    fixture = TestBed.createComponent(NationalHolidaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
