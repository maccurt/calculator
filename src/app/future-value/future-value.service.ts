import { Injectable } from '@angular/core';
import { MathService } from 'app/math/math.service';
import { IFutureValueResult } from './ifuture-value-result';
import { BalanceSummary, IBalanceSummary, BalanceDetailItem } from './IBalanceSummary.type';
import { IStockQuote } from 'app/stock-quote/index.type';


@Injectable()
export class FutureValueService {

  constructor(private mathService: MathService) { }

  rateOfReturn = (currentValue: number, orignalValue): number => {
    const r = currentValue - orignalValue;
    return this.mathService.round(r / orignalValue * 100, 2);
  }

  monthlyPayments(ratePercent: number, numberOfYears: number, payment: number): number {
    const months: number = numberOfYears * 12;
    const rate = ratePercent / 12;
    return this.futureValue(rate, months, payment);
  }

  monthlyPaymentsWithDetail(ratePercent: number, numberOfYears: number, payment: number): IFutureValueResult {
    const months: number = numberOfYears * 12;
    const rate = ratePercent / 12;

    //TODO Perhaps this math here should be in another service
    //Only remove this if you find you are repeating this code in the future
    const fv = this.futureValue(rate, months, payment);
    const principal = months * payment;
    const interest = this.mathService.round(fv - principal, 2);

    const result: IFutureValueResult = {
      principal: principal,
      interest: interest,
      futureValue: fv
    };

    return result;
  }

  futureValue(ratePercent: number, periods: number, payment: number, isBeginOfPeriod?: boolean): number {

    let fv = 0;
    if (ratePercent !== 0) {
      const rate = ratePercent / 100;
      const multiplier: number = ((Math.pow(1 + rate, periods) - 1) / rate);
      fv = payment * multiplier;
      if (isBeginOfPeriod) {
        fv = fv * (1 + rate);
      }
    } else {
      fv = periods * payment;
    }

    return this.mathService.round(fv, 2);
  }

  rateFactor(ratePercent: number, periods: number, compoundingFrequencyPerPeriod: number): number {
    const rateFactor = Math.pow((1 + (ratePercent / 100 / compoundingFrequencyPerPeriod)),
      compoundingFrequencyPerPeriod * periods);
    return rateFactor;
  }

  // TODO consider renaming this, with amortization or something else
  monthlyPaymentsBalanceSummary(ratePercent: number, numberOfYears: number, periodPayment: number): BalanceSummary {
    const balanceSummary: IBalanceSummary = new BalanceSummary(0, 0, 0, 0);
    let endBalance = 0, beginBalance = 0, interestTotal = 0;
    const rateFactor = this.rateFactor(ratePercent, 1, 12);
    const yearPaymentTotal = periodPayment * 12;
    let paymentTotal = 0;
    const round = this.mathService.round;

    for (let i = 1; i <= numberOfYears; i++) {

      //this is the future value of the previous balance
      const previousBalanceFv = this.mathService.round(beginBalance * rateFactor, 2);
      endBalance = round(previousBalanceFv + this.futureValue(ratePercent / 12, 12, periodPayment, false), 2);
      paymentTotal += yearPaymentTotal;

      const interest = round(endBalance - beginBalance - yearPaymentTotal, 2);

      interestTotal += interest;
      interestTotal = round(interestTotal, 2);

      const detailItem = new BalanceDetailItem(
        i,
        beginBalance,
        periodPayment,
        yearPaymentTotal,
        ratePercent,
        paymentTotal,
        interest,
        interestTotal,
        endBalance);

      detailItem.balanceSummary = balanceSummary;

      balanceSummary.detailItems.push(detailItem);
      beginBalance = endBalance;
    }

    balanceSummary.balance = balanceSummary.detailItems[numberOfYears - 1].endBalance;
    balanceSummary.interest = interestTotal;
    balanceSummary.paymentTotal = periodPayment * 12 * numberOfYears;


    balanceSummary.rateOfReturn = this.rateOfReturn(balanceSummary.balance, balanceSummary.paymentTotal);
    return balanceSummary;
  }

  balanceSummaryStockQuotes = (stockQuoteList: IStockQuote[], monthlyPayment: number): BalanceSummary => {

    const balanceSummary = new BalanceSummary(0, 0, 0, 0);

    balanceSummary.detailItems = [];

    stockQuoteList.forEach((s: IStockQuote) => {
      const bsd = new BalanceDetailItem(s.year, 0, monthlyPayment, 0, s.rateOfReturn, 0, 0, 0, 0);
      balanceSummary.detailItems.push(bsd);
    });
    this.calculateBalanceSummary(balanceSummary);
    return balanceSummary;
  }


  calculateBalanceSummary(balanceSummary: BalanceSummary): void {

    balanceSummary.interest = 0;
    balanceSummary.paymentTotal = 0;
    let previousEndBalance = 0;
    let paymentTotal = 0;

    balanceSummary.detailItems.forEach((item: BalanceDetailItem) => {

      const rateFactor = this.rateFactor(item.ratePercent, 1, 12);

      item.beginBalance = previousEndBalance;
      const beginBalanceFutureValue = this.mathService.round(item.beginBalance * rateFactor, 2);
      item.endBalance = this.mathService.round(
        beginBalanceFutureValue +
        this.futureValue(item.ratePercent / 12, 12, item.periodPayment, false), 2);

      item.yearPaymentTotal = item.periodPayment * 12;

      //The running payment of all items
      paymentTotal += item.yearPaymentTotal;
      item.paymentTotal = paymentTotal;

      // balanceSummary.paymentTotal += item.yearPaymentTotal;
      item.interest = this.mathService.round(item.endBalance - item.beginBalance - item.yearPaymentTotal, 2);


      balanceSummary.interest += item.interest;
      previousEndBalance = item.endBalance;
    });

    balanceSummary.paymentTotal = paymentTotal;
    balanceSummary.balance = balanceSummary.detailItems[balanceSummary.detailItems.length - 1].endBalance;
    balanceSummary.interest = this.mathService.round(balanceSummary.interest, 2);
  }
}
