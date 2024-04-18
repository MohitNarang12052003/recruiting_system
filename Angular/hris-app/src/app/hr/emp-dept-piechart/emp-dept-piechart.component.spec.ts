import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpDeptPiechartComponent } from './emp-dept-piechart.component';

describe('EmpDeptPiechartComponent', () => {
  let component: EmpDeptPiechartComponent;
  let fixture: ComponentFixture<EmpDeptPiechartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpDeptPiechartComponent]
    });
    fixture = TestBed.createComponent(EmpDeptPiechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
