import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FutureValueComponent } from './future-value.component';
import { FormsModule } from '@angular/forms';
import { FutureValueService } from '../future-value/future-value.service';
import { MathService } from 'app/math/math.service';
import { CurrencyPipe } from '@angular/common';
import { IFutureValueResult } from './ifuture-value-result';
import { DirectivesModule } from 'app/directives/directives.module';
import { NumericInputDirective } from 'app/directives/numeric-input.directive';
// import { ChartModule } from 'angular2-highcharts';
// import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
// import * as highcharts from 'highcharts';
import { IBalanceSummary } from 'app/future-value/IBalanceSummary.type';
import { BalanceSummaryComponent } from 'app/balance-summary/balance-summary.component';
import { ResponsiveModule } from 'ng2-responsive';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';


// export function highchartsFactory() {
//   highcharts.setOptions({
//     lang: {
//       thousandsSep: ','
//     }
//   });
//   return highcharts;
// }

const routerMock = {

  navigate: null,
  events: {
    subscribe: () => { }
  },
  routeReuseStrategy: {

    shouldReuseRoute: function () {
    }
  }
};

routerMock.navigate = jasmine.createSpy('navigate');

const route = {
  navigate: null,
  params: Observable.of('nothing')
};
route.navigate = jasmine.createSpy('navigate');


describe('FutureValueComponent', () => {
  let component: FutureValueComponent;
  let fixture: ComponentFixture<FutureValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FutureValueComponent, BalanceSummaryComponent],
      imports: [FormsModule, DirectivesModule, ResponsiveModule],
      providers: [FutureValueService, MathService,
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: route, }

      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FutureValueComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  describe('component', () => {

    it('should be created', () => {
      expect(component).toBeTruthy();
    });

    // it('the result should be false', () => {
    //   expect(component.showResults).toBe(false);
    // });

  });

  describe('validateQueryStringParams', () => {

    it('all over max', () => {

      component.validateQueryStringParams('100000', '99.1', '100');
      expect(component.monthlyPayment).toBeNull();
      expect(component.ratePercent).toBeNull();
      expect(component.years).toBeNull();
    });

  });

  describe('click the calculate button', () => {

    // detailItems: Array<IBalanceDetailItem>;
    // principal: number;
    // interest: number;
    // balance: number;
    // paymentTotal: number;
    const result: IBalanceSummary = {
      principal: 99999999, //What do we do with this
      interest: 9999.33,
      balance: 500112.33,
      paymentTotal: 500000.00,
      detailItems: [],
      rateOfReturn: 0
    };
    beforeEach(() => {

      spyOn(component.futureValueService, 'monthlyPaymentsBalanceSummary').and.returnValue(result);
      const calculateButton = fixture.nativeElement.querySelector('#calculate-button');
      calculateButton.click();
      fixture.detectChanges();
    });

    it('should behave...', () => {
      expect(component.futureValueService.monthlyPaymentsBalanceSummary).toHaveBeenCalled();
    });

    it('when I click the calculate button it should call calculate', () => {
      const calculateButton = fixture.nativeElement.querySelector('#calculate-button');
      spyOn(component, 'calculate');
      calculateButton.click();
      expect(component.calculate).toHaveBeenCalled();
    });

    it('it should set component.futureValueResult correctly', () => {
      expect(component.futureValueResult).toBe(result);
    });

    it('the result should be true', () => {
      expect(component.showResults).toBe(true);
    });

    it('future value should be correct', () => {
      fixture.whenStable().then(() => {
        const futureValue = <HTMLDivElement>fixture.nativeElement.querySelector('#future-value');
        expect(futureValue.innerHTML).toBe('$500,112.33');
      });
    });

    it('total payment should be correct',() => {
      fixture.whenStable().then(() => {
        const principal = <HTMLDivElement>fixture.nativeElement.querySelector('#principal');
        expect(principal.innerHTML).toBe('$500,000.00');
      });
    });

    it('interest should be correct', () => {
      fixture.whenStable().then(() => {
        const interest = <HTMLDivElement>fixture.nativeElement.querySelector('#interest');
        expect(interest.innerHTML).toBe('$9,999.33');
      });
    });

  });

  describe('calculate', () => {

    it('when I call calaculate it should call monthly payments with 5,6 ,50', () => {
      component.ratePercent = 5;
      component.years = 6;
      component.monthlyPayment = 50;
      spyOn(component.futureValueService, 'monthlyPaymentsBalanceSummary').and.returnValue({ principal: 0 });
      component.calculate();
      expect(component.futureValueService.monthlyPaymentsBalanceSummary).toHaveBeenCalledWith(5, 6, 50);
    });

    // it('should call createChart with 777,888', () => {
    //   spyOn(component.futureValueService, 'monthlyPaymentsBalanceSummary').and.returnValue({ paymentTotal: 777, interest: 888 });
    //   spyOn(component, 'createChart');
    //   component.calculate();
    //   expect(component.createChart).toHaveBeenCalledWith(777, 888);
    // });

    it('should set isSubmitError to true', () => {
      component.form = <any>{ valid: false, submitted: true };
      component.calculate();
      expect(component.isSubmitError).toBe(true);
    });
  });

  describe('showSubmitError', () => {
    it('form is not submitted and the form NOT valid should be false', () => {
      component.form = <any>{ valid: false, submitted: false };
      expect(component.showSubmitError()).toBe(false);
    });

    it('form is submitted and the form is NOT valid should be true', () => {
      component.form = <any>{ valid: false, submitted: true };
      component.isSubmitError = true;
      expect(component.showSubmitError()).toBe(true);
    });

    it('form is submitted and the form is valid true', () => {
      component.form = <any>{ valid: true, submitted: true };
      expect(component.showSubmitError()).toBe(false);
    });
  });

  describe('showValidationError', () => {
    it('invalid true and touched false should return false', () => {
      const control = { invalid: true, touched: false };
      const result = component.showValidationError(<any>control);
      expect(result).toBe(false);
    });

    it('invalid true and touched true should return true', () => {
      const control = { invalid: true, touched: true };
      const result = component.showValidationError(<any>control);
      expect(result).toBe(true);
    });

    it('invalid false and touched true should return false', () => {
      const control = { invalid: false, touched: true };
      const result = component.showValidationError(<any>control);
      expect(result).toBe(false);
    });
  });

  // describe('handleCalculateEvent', () => {
  //   it('should call createChart ', () => {
  //     spyOn(component, 'createChart');
  //     component.handleCalculateEvent();
  //     expect(component.createChart).toHaveBeenCalled();
  //   });
  // });

  describe('handleShowOriginalInputEvent', () => {
    it('should make showInput = false, showResult = true', () => {
      component.showInput = null;
      component.showResults = null;
      component.handleShowOriginalInputEvent();
      expect(component.showInput).toBe(true);
      expect(component.showResults).toBe(false);
    });
  });
});
