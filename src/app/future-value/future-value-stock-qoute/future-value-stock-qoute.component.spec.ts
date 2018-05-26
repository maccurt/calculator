import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FutureValueStockQouteComponent } from './future-value-stock-qoute.component';
import { FormsModule } from '@angular/forms'; 
import { By } from '@angular/platform-browser';
import { BalanceSummaryComponent } from 'app/balance-summary/balance-summary.component';
import { DirectivesModule } from 'app/directives/directives.module';
import { ActivatedRoute, Router } from '@angular/router';
import { IIndex } from 'app/stock-quote/index.type';
import { indexDebugNode } from '@angular/core/src/debug/debug_node';
import { StockQuoteService } from 'app/stock-quote/stock-quote.service';
import { MathService } from 'app/math/math.service';
import { FutureValueService } from 'app/future-value/future-value.service';
import { ResponsiveModule } from 'ng2-responsive';
import { Observable } from 'rxjs/Observable';


// export function highchartsFactory() {
//   highcharts.setOptions({ lang: { thousandsSep: ',' } });
//   return highcharts;
// }
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

  class MockRouter {
    navigate = jasmine.createSpy('navigate');
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FutureValueStockQouteComponent, BalanceSummaryComponent],
      imports: [FormsModule,  DirectivesModule, ResponsiveModule],
      providers: [MathService, FutureValueService,
        StockQuoteService,        
        { provide: ActivatedRoute, useValue: activateResponseMock },
        { provide: Router, useClass: MockRouter }]
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


    describe('setSelectedQuotes', () => {

      describe('invalidQuoteYear = true', () => {

        beforeEach(() => {
          component.invalidQuoteYear = true;
          spyOn(component, 'validateQoutes');
          component.setSelectedQuotes();
        });

        it('reateOfReturnAverage should be 0', () => {
          expect(component.rateOfReturnAverage).toBe(0);
        });

        it('yearsSelected should be 0', () => {
          expect(component.yearsSelected).toBe(0);
        });

      });

    });

    describe('invalid year message', () => {

      it('should show error message when invalid qoute year is true', async(() => {
        component.invalidQuoteYear = true;
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          const errorSpan = <HTMLSpanElement>fixture.debugElement.query(By.css('#invalidYearMessage')).nativeElement;
          expect(errorSpan).toBeDefined();
          expect(errorSpan.innerHTML).toEqual('Start Year Can Not Be Greater Than The End Year');
        });
      }));
    });


    describe('startQuoteChanged', () => {

      it('when invoked should call setSeletedQoutes', () => {
        spyOn(component, 'setSelectedQuotes');
        component.startQuoteChanged();
        expect(component.setSelectedQuotes).toHaveBeenCalled();
      });

    });

    describe('endQuoteChanged', () => {

      it('when invoked should call setSeletedQoutes', () => {
        spyOn(component, 'setSelectedQuotes');
        component.endQuoteChanged();
        expect(component.setSelectedQuotes).toHaveBeenCalled();
      });

    });

    describe('start qoute select', () => {

      it('should call startQuoteChanged ', async(() => {
        fixture.whenStable().then(() => {
          const startYearSelect = <HTMLSelectElement>fixture.debugElement.query(By.css('#startQuote')).nativeElement;
          expect(startYearSelect).toBeDefined();
          spyOn(component, 'startQuoteChanged');
          startYearSelect.value = '1: Object';
          startYearSelect.dispatchEvent(new Event('change'));
          expect(component.startQuoteChanged).toHaveBeenCalled();
        });
      }));
    });

    describe('end qoute select', () => {

      it('should call startQuoteChanged ', async(() => {
        fixture.whenStable().then(() => {
          const startYearSelect = <HTMLSelectElement>fixture.debugElement.query(By.css('#endQuote')).nativeElement;
          expect(startYearSelect).toBeDefined();
          spyOn(component, 'endQuoteChanged');
          startYearSelect.value = '1: Object';
          startYearSelect.dispatchEvent(new Event('change'));
          expect(component.endQuoteChanged).toHaveBeenCalled();
        });
      }));
    });

    describe('calculate', () => {

      beforeEach(() => {

      });

      beforeEach(() => {
        spyOn(component.futureValueService, 'balanceSummaryStockQuotes');
      });

      describe('form is invalid', () => {
        beforeEach(() => {
          component.isSubmitError = false;
          component.form = <any>{ valid: false };
          component.calculate();
        });

        it('is submit error should be true', () => {
          expect(component.isSubmitError).toBeTruthy();
        });

        it('show results should be false', () => {
          expect(component.showResults).toBeFalsy();
        });

        it('it should not call balanceSummaryStockQuotes', () => {
          expect(component.futureValueService.balanceSummaryStockQuotes).not.toHaveBeenCalled();
        });
      });

      describe('form is valid', () => {
        beforeEach(() => {
          component.monthlyPayment = 1234.43;
          component.isSubmitError = false;
          component.form = <any>{ valid: true };
          component.calculate();
        });

        it('is submit error should be false', () => {
          expect(component.isSubmitError).toBeFalsy();
        });

        it('show results should be true', () => {
          expect(component.showResults).toBeTruthy();
        });

        it('it should not call balanceSummaryStockQuotes', () => {

          expect(component.futureValueService.balanceSummaryStockQuotes)
            .toHaveBeenCalledWith(component.stockQuoteListSelected, component.monthlyPayment);
        });
      });

    });

    describe('stockIndexChanged', () => {

      it('when qoutes is empty array it should call setIndexQuotes', () => {

        component.stockIndexList[0].qoutes = [];
        spyOn(component, 'setIndexQoutes');
        component.stockIndexChanged();
        expect(component.setIndexQoutes).toHaveBeenCalled();

      });

      it('when qoutes is undefined it should call setIndexQuotes', () => {

        component.stockIndexList[0].qoutes = undefined;
        spyOn(component, 'setIndexQoutes');
        component.stockIndexChanged();
        expect(component.setIndexQoutes).toHaveBeenCalled();

      });

      it('when qoutes is null it should call setIndexQuotes', () => {
        component.stockIndexList[0].qoutes = null;
        spyOn(component, 'setIndexQoutes');
        component.stockIndexChanged();
        expect(component.setIndexQoutes).toHaveBeenCalled();
      });

      it('when qoutes has elements it NOT should call setIndexQuotes', () => {
        spyOn(component, 'setIndexQoutes');
        component.stockIndexChanged();
        expect(component.setIndexQoutes).not.toHaveBeenCalled();
      });

    });
  });
});