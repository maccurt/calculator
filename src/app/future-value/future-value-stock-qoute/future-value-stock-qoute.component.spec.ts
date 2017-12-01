import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FutureValueStockQouteComponent } from './future-value-stock-qoute.component';
import { FormsModule } from '@angular/forms';
import { BalanceSummaryComponent } from 'app/balance-summary/balance-summary.component';
import { ChartModule } from 'angular2-highcharts';
import * as highcharts from 'highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { DirectivesModule } from 'app/directives/directives.module';
import { ActivatedRoute } from '@angular/router';
import { IIndex } from 'app/stock-quote/index.type';
import { indexDebugNode } from '@angular/core/src/debug/debug_node';
import { StockQuoteService } from 'app/stock-quote/stock-quote.service';

export function highchartsFactory() {
  highcharts.setOptions({ lang: { thousandsSep: ',' } });
  return highcharts;
}
describe('FutureValueStockQouteComponent', () => {
  let component: FutureValueStockQouteComponent;
  let fixture: ComponentFixture<FutureValueStockQouteComponent>;

  const indexList: IIndex[] = [];
  indexList.push({ id: 1, name: 'SP 500' });
  const activateResponseMock = {
    snapshot: {
      data: {
        indexList: indexList
      }
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FutureValueStockQouteComponent, BalanceSummaryComponent],
      imports: [FormsModule, ChartModule, DirectivesModule],
      providers: [StockQuoteService, { provide: HighchartsStatic, useFactory: highchartsFactory },
        {
          provide: ActivatedRoute,
          useValue: activateResponseMock
        }]
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

  it('should set SP500 as the selected index', () => {
    fixture.whenStable().then(() => {
      expect(component.indexSelected.name).toBe('SP 500');
    });
  });

  it('the selected index should have qoutes', () => {
    fixture.whenStable().then(() => {
      expect(component.indexSelected.name).toBe('SP 500');

      expect(component.startQuote).toEqual(component.indexSelected.qoutes[0]);
      expect(component.endQuote).toEqual(component.indexSelected.qoutes[88]);
    });
  });

  describe('validateQuoteYear', () => {
    it('start year > end year should not be valid', () => {
      component.startQuote.year = 2015;
      component.endQuote.year = 2014;
      component.validateQoutes();
      expect(component.invalidQuoteYear).toBeTruthy();
    });

    it('start year < end year should not be valid', () => {
      component.startQuote.year = 2013;
      component.endQuote.year = 2014;
      component.validateQoutes();
      expect(component.invalidQuoteYear).toBeFalsy();
    });

    it('start year = end year should not be valid', () => {
      component.startQuote.year = 2014;
      component.endQuote.year = 2014;
      component.validateQoutes();
      expect(component.invalidQuoteYear).toBeFalsy();
    });
  });

});