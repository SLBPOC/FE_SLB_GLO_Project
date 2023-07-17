import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YesterdayPercentRunComponent } from './yesterday-percent-run.component';

describe('YesterdayPercentRunComponent', () => {
  let component: YesterdayPercentRunComponent;
  let fixture: ComponentFixture<YesterdayPercentRunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YesterdayPercentRunComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YesterdayPercentRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
