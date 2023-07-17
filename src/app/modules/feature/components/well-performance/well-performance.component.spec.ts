import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellPerformanceComponent } from './well-performance.component';

describe('WellPerformanceComponent', () => {
  let component: WellPerformanceComponent;
  let fixture: ComponentFixture<WellPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WellPerformanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WellPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
