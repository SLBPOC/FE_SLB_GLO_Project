import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationSummaryComponent } from './classification-summary.component';

describe('ClassificationSummaryComponent', () => {
  let component: ClassificationSummaryComponent;
  let fixture: ComponentFixture<ClassificationSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassificationSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassificationSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
