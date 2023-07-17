import { ComponentFixture, TestBed } from '@angular/core/testing';


describe('ParameterChartComponent', () => {
  let component: YesterdayCycleBarChartComponent;
  let fixture: ComponentFixture<YesterdayCycleBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YesterdayCycleBarChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YesterdayCycleBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
