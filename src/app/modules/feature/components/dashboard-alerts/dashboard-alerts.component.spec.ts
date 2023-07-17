import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAlertsComponent } from './dashboard-alerts.component';

describe('DashboardAlertsComponent', () => {
  let component: DashboardAlertsComponent;
  let fixture: ComponentFixture<DashboardAlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardAlertsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
