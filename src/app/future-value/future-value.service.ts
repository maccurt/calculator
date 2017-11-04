import { Injectable } from '@angular/core';
import { MathService } from 'app/math/math.service'
import { IFutureValueResult } from './ifuture-value-result'


@Injectable()
export class FutureValueService {

  constructor(private mathService: MathService) { }

  rateOfReturn = (principal: number, endTotal): number => {
    let r =  endTotal - principal;
    return this.mathService.round(r / principal * 100, 2);
  }

  monthlyPayments(ratePercent: number, numberOfYears: number, payment: number): number {
    var months: number = numberOfYears * 12;
    var rate = ratePercent / 12;
    return this.futureValue(rate, months, payment);
  }

  monthlyPaymentsWithDetail(ratePercent: number, numberOfYears: number, payment: number): IFutureValueResult {
    var months: number = numberOfYears * 12;
    var rate = ratePercent / 12;

    //TODO Perhaps this math here should be in another service
    //Only remove this if you find you are repeating this code in the future
    var fv = this.futureValue(rate, months, payment);
    var principal = months * payment;
    var interest = this.mathService.round(fv - principal, 2);

    var result: IFutureValueResult = {
      principal: principal,
      interest: interest,
      futureValue: fv
    }

    return result;
  }

  futureValue(ratePercent: number, periods: number, payment: number, isBeginOfPeriod?: boolean): number {

    let rate = ratePercent / 100;
    let multiplier: number = ((Math.pow(1 + rate, periods) - 1) / rate);
    let fv: number = payment * multiplier;
    if (isBeginOfPeriod) {
      fv = fv * (1 + rate);
    }
    return this.mathService.round(fv, 2);
  }


}
