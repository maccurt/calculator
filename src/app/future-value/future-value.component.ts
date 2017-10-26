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
  isSubmitError = false;

  constructor(public futureValueService: FutureValueService) {
    this.futureValueResult = <any>{}
  }

  ngOnInit() { }

  calculate = () => {
    if (this.form.valid) {
      this.futureValueResult = this.futureValueService
        .monthlyPaymentsWithDetail(this.ratePercent, this.years, this.monthlyPayment);
      this.isSubmitError = false;
    }
    else {
      this.isSubmitError = true;
    }

    this.showResults = this.form.valid;
  }

  showSubmitError = () => {
    var result = !this.form.valid && this.form.submitted && this.isSubmitError;
    return result;
  }

  showValidationError = (control: AbstractControl) => {
    //TODO I wish I could get the form passed in because I want to make this 
    //generic in the future so other controls can use it. Don't fret over it now
    var showError = control.invalid && (control.touched || this.form.submitted)
    return showError;
  }
}