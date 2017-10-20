import { Injectable } from '@angular/core';
import { MathService } from 'app/math/math.service';

@Injectable()
export class FutureValueService {

  constructor(private mathService: MathService) {  }

  monthlyPayments(ratePercent: number, numberOfYears: number, payment: number): number {
    var months: number = numberOfYears * 12;
    var rate = ratePercent / 12;
    return this.futureValue(rate, months, payment);
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
