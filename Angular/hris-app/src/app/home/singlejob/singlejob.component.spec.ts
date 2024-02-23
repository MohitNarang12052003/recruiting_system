import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglejobComponent } from './singlejob.component';

describe('SinglejobComponent', () => {
  let component: SinglejobComponent;
  let fixture: ComponentFixture<SinglejobComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SinglejobComponent]
    });
    fixture = TestBed.createComponent(SinglejobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
