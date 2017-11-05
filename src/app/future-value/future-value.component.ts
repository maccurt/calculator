import { Component, OnInit, ViewChild } from '@angular/core';
import { FutureValueService } from './future-value.service'
import { CurrencyPipe } from '@angular/common';
import { IFutureValueResult } from './ifuture-value-result';
import { NgForm, AbstractControl } from '@angular/forms';
import { ChartModule } from 'angular2-highcharts';


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
  options: any;

  constructor(public futureValueService: FutureValueService) {
    this.futureValueResult = <any>{}
  }

  ngOnInit() {
    // this.monthlyPayment = 50;
    // this.ratePercent = 8.5;
    // this.years = 20;
    // this.calculate();
  }

  calculate = () => {
    if (this.form.valid) {
      this.futureValueResult = this.futureValueService
        .monthlyPaymentsWithDetail(this.ratePercent, this.years, this.monthlyPayment);
      this.isSubmitError = false;
      this.createChart(this.futureValueResult.principal, this.futureValueResult.interest)
    }
    else {
      this.isSubmitError = true;
    }

    this.showResults = this.form.valid;
  }

  createChart = (principal: number, interest: number) => {

    //TODO in the furtue move this to a service of some sort
    const dataLabels = { distance: 5 };

    this.options = {

      title: {
        text: null
      },
      credits: {
        enabled: false
      },
      chart: {
        type: 'pie',
        width: 300,
        height: 180,
        spacing: [5, 1, 1, 1],
        borderWidth: 0,
        borderColor: '#cccccc'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          slicedOffset: 3
        }
      },
      series: [{
        name: ' ',
        data: [{ name: 'Total Payment', y: principal, color: '#0000FF', dataLabels: dataLabels, sliced: true, },
        { name: 'interest', y: interest, color: '#00FF00', dataLabels: dataLabels }],
      }]
    };

  }

  showSubmitError = () => {
    const result = !this.form.valid && this.form.submitted && this.isSubmitError;
    return result;
  }

  showValidationError = (control: AbstractControl) => {
    //TODO I wish I could get the form passed in because I want to make this 
    //generic in the future so other controls can use it. Don't fret over it now
    const showError = control.invalid && (control.touched || this.form.submitted)
    return showError;
  }
}
