import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FutureValueComponent } from './future-value.component';
import { FormsModule } from '@angular/forms';
import { FutureValueService } from '../future-value/future-value.service'
import { MathService } from 'app/math/math.service';
import { CurrencyPipe } from '@angular/common';
import { IFutureValueResult } from './ifuture-value-result';

describe('FutureValueComponent', () => {
  let component: FutureValueComponent;
  let fixture: ComponentFixture<FutureValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FutureValueComponent],
      imports: [FormsModule],
      providers: [FutureValueService, MathService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FutureValueComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  it('the result should be false', () => {
    expect(component.showResults).toBe(false)
  })

  it('when I click the calculate button it should call calculate', () => {
    var calculateButton = fixture.nativeElement.querySelector('#calculate-button');
    spyOn(component, 'calculate');
    calculateButton.click();
    expect(component.calculate).toHaveBeenCalled();
  });

  describe('click the calculate button', () => {

    var result: IFutureValueResult = {
      principal: 500000.00,
      interest: 9999.33,
      futureValue: 500112.33
    }
    beforeEach(() => {

      spyOn(component.futureValueService, 'monthlyPaymentsWithDetail').and.returnValue(result)
      var calculateButton = fixture.nativeElement.querySelector('#calculate-button');
      calculateButton.click();
      fixture.detectChanges();
    })

    it('it should set component.futureValueResult correctly', () => {
      expect(component.futureValueResult).toBe(result)
    });

    it('the result should be true', () => {
      expect(component.showResults).toBe(true)
    })

    it('it should set the resulting html correctly', () => {
      var futureValue = <HTMLDivElement>fixture.nativeElement.querySelector('#future-value');
      expect(futureValue.innerHTML).toBe('$500,112.33')

      var principal = <HTMLDivElement>fixture.nativeElement.querySelector('#principal');
      expect(principal.innerHTML).toBe('$500,000.00')

      var interest = <HTMLDivElement>fixture.nativeElement.querySelector('#interest');
      expect(interest.innerHTML).toBe('$9,999.33')
    });
  });

  it('when I call calaculate it should call monthly payments with 5,6 ,50', () => {
    component.ratePercent = 5;
    component.years = 6
    component.monthlyPayment = 50;
    spyOn(component.futureValueService, 'monthlyPaymentsWithDetail')
    component.calculate()
    expect(component.futureValueService.monthlyPaymentsWithDetail).toHaveBeenCalledWith(5, 6, 50);
  });

  describe('showSubmitError', () => {
    it('form is not submitted and the form NOT valid should be false', () => {
      component.form = <any>{ valid: false, submitted: false }
      expect(component.showSubmitError()).toBe(false);
    });

    it('form is submitted and the form is NOT valid should be true', () => {
      component.form = <any>{ valid: false, submitted: true }
      expect(component.showSubmitError()).toBe(true);
    });

    it('form is submitted and the form is valid true', () => {
      component.form = <any>{ valid: true, submitted: true }
      expect(component.showSubmitError()).toBe(false);
    });
  });

  describe('showValidationError', () => {
    it('invalid true and touched false should return false', () => {
      var control = { invalid: true, touched: false }
      var result = component.showValidationError(<any>control)
      expect(result).toBe(false)
    });

    it('invalid true and touched true should return true', () => {
      var control = { invalid: true, touched: true }
      var result = component.showValidationError(<any>control)
      expect(result).toBe(true)
    });

    it('invalid false and touched true should return false', () => {
      var control = { invalid: false, touched: true }
      var result = component.showValidationError(<any>control)
      expect(result).toBe(false)
    });

  });
});