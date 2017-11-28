import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureValueStockQouteComponent } from './future-value-stock-qoute.component';

describe('FutureValueStockQouteComponent', () => {
  let component: FutureValueStockQouteComponent;
  let fixture: ComponentFixture<FutureValueStockQouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FutureValueStockQouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FutureValueStockQouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
