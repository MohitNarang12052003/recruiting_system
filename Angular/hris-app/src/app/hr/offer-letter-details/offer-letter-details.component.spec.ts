import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferLetterDetailsComponent } from './offer-letter-details.component';

describe('OfferLetterDetailsComponent', () => {
  let component: OfferLetterDetailsComponent;
  let fixture: ComponentFixture<OfferLetterDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfferLetterDetailsComponent]
    });
    fixture = TestBed.createComponent(OfferLetterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
