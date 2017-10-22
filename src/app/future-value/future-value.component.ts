import { Component, OnInit, ViewChild } from '@angular/core';
import { FutureValueService } from './future-value.service'
import { CurrencyPipe } from '@angular/common';
import { IFutureValueResult } from './ifuture-value-result';
import { NgForm, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-future-value',
  templateUrl: './future-value.component.html',
  styleUrls: ['./future-value.component.less']
})
export class FutureValueComponent implements OnInit {
  @ViewChild('futureValueForm') form: NgForm;
  ratePercent: number;
  years: number;
  monthlyPayment: number;
  futureValueResult: IFutureValueResult;
  showResults = false;

  constructor(public futureValueService: FutureValueService) {
    this.futureValueResult = <any>{}
  }

  ngOnInit() { }

  calculate = () => {
    if (this.form.valid) {
      this.futureValueResult = this.futureValueService
        .monthlyPaymentsWithDetail(this.ratePercent, this.years, this.monthlyPayment);
    }

    this.showResults = this.form.valid;
  }

  showSubmitError = () => {
    var result = !this.form.valid && this.form.submitted;
    return result;
  }

  showValidationError = (control: AbstractControl) => {    
    var showError = control.invalid && control.touched;
    return showError;
  }
}