import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVacanciesComponent } from './view-vacancies.component';

describe('ViewVacanciesComponent', () => {
  let component: ViewVacanciesComponent;
  let fixture: ComponentFixture<ViewVacanciesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewVacanciesComponent]
    });
    fixture = TestBed.createComponent(ViewVacanciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
