import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextRoundEmailComponent } from './next-round-email.component';

describe('NextRoundEmailComponent', () => {
  let component: NextRoundEmailComponent;
  let fixture: ComponentFixture<NextRoundEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NextRoundEmailComponent]
    });
    fixture = TestBed.createComponent(NextRoundEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
