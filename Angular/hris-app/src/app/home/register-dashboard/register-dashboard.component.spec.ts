import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterDashboardComponent } from './register-dashboard.component';

describe('RegisterDashboardComponent', () => {
  let component: RegisterDashboardComponent;
  let fixture: ComponentFixture<RegisterDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterDashboardComponent]
    });
    fixture = TestBed.createComponent(RegisterDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
