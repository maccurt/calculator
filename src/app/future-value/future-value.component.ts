import { Component, OnInit } from '@angular/core';
import { FutureValueService } from './future-value.service'
import { CurrencyPipe } from '@angular/common';
import { IFutureValueResult } from './ifuture-value-result';


@Component({
  selector: 'app-future-value',
  templateUrl: './future-value.component.html',
  styleUrls: ['./future-value.component.less']
})
export class FutureValueComponent implements OnInit {

  ratePercent: number;
  years: number;
  monthlyPayment: number;
  futureValueResult: IFutureValueResult;
  showResults = false;


  constructor(public futureValueService: FutureValueService) { 
    this.futureValueResult = <any> {  }
  }

  ngOnInit() {
  }

  calculate = () => {
    this.futureValueResult = this.futureValueService
      .monthlyPaymentsWithDetail(this.ratePercent, this.years, this.monthlyPayment);

      this.showResults = true;
  }

  
}