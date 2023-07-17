import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellTreeSearchComponent } from './well-tree-search.component';

describe('WellTreeSearchComponent', () => {
  let component: WellTreeSearchComponent;
  let fixture: ComponentFixture<WellTreeSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WellTreeSearchComponent]
    });
    fixture = TestBed.createComponent(WellTreeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
