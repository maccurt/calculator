import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { FutureValueService } from './future-value.service'
import { CurrencyPipe } from '@angular/common';
import { NgForm, AbstractControl } from '@angular/forms';
import { IBalanceSummary, IBalanceDetailItem } from 'app/future-value/IBalanceSummary.type';
import { FutureValueService } from 'app/future-value/future-value.service';

@Component({
  selector: 'app-balance-summary',
  templateUrl: './balance-summary.component.html',
  styleUrls: ['./balance-summary.component.less']
})
export class BalanceSummaryComponent implements OnInit {
  @Input() summary: IBalanceSummary;
  @Output() showOriginalInputEvent = new EventEmitter();
  @Output() calculateEvent = new EventEmitter();
  constructor(private futureValueService: FutureValueService) { }

  ngOnInit() {
      
   }

  showOriginalInput = (): void => {    
    this.showOriginalInputEvent.emit();
  }

  updateDetail = (detail: IBalanceDetailItem) => {

    detail.ratePercent = this.forceNumber(detail.ratePercent);
    detail.periodPayment = this.forceNumber(detail.periodPayment);
    this.futureValueService.calculateBalanceSummary(this.summary);
    this.calculateEvent.emit();
  }

  //TODO perhaps this should be in the numeric input
  //so you don't have to do this all the time
  forceNumber = (value: number): number => {
    let newValue = 0;
    if (value.toString() !== '' && !isNaN(value)) {
      newValue = parseFloat(value.toString());
    }
    return newValue;
  }

}
