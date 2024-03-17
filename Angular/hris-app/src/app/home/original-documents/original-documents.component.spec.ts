import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OriginalDocumentsComponent } from './original-documents.component';

describe('OriginalDocumentsComponent', () => {
  let component: OriginalDocumentsComponent;
  let fixture: ComponentFixture<OriginalDocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OriginalDocumentsComponent]
    });
    fixture = TestBed.createComponent(OriginalDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
