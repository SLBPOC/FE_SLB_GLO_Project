import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterChartComponent } from './parameter-chart.component';

describe('ParameterChartComponent', () => {
  let component: ParameterChartComponent;
  let fixture: ComponentFixture<ParameterChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParameterChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParameterChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
