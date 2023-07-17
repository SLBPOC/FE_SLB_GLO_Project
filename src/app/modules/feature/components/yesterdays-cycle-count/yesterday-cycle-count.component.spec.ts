import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YesterdayCycleCountComponent } from './yesterday-cycle-count.component';

describe('YesterdayCycleCountComponent', () => {
  let component: YesterdayCycleCountComponent;
  let fixture: ComponentFixture<YesterdayCycleCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YesterdayCycleCountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YesterdayCycleCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
