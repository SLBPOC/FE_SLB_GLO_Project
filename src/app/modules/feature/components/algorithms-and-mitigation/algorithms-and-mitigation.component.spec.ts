import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorithmsAndMitigationComponent } from './algorithms-and-mitigation.component';

describe('AlgorithmsAndMitigationComponent', () => {
  let component: AlgorithmsAndMitigationComponent;
  let fixture: ComponentFixture<AlgorithmsAndMitigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlgorithmsAndMitigationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlgorithmsAndMitigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
