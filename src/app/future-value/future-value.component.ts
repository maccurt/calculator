import { Component, OnInit, ViewChild } from '@angular/core';
import { FutureValueService } from './future-value.service';
import { CurrencyPipe } from '@angular/common';
import { IFutureValueResult } from './ifuture-value-result';
import { NgForm, AbstractControl } from '@angular/forms';
import { ChartModule } from 'angular2-highcharts';
import { BalanceSummary, IBalanceDetailItem } from 'app/future-value/IBalanceSummary.type';
import { detachEmbeddedView } from '@angular/core/src/view/view_attach';
import { BalanceSummaryComponent } from '../balance-summary/balance-summary.component';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Calculator } from 'app/calculator/calculator.type';

interface IParams {
  monthlyPayment: number;
}


@Component({
  selector: 'app-future-value',
  templateUrl: './future-value.component.html',
  styleUrls: ['./future-value.component.less']
})

export class FutureValueComponent extends Calculator implements OnInit {
  @ViewChild('futureValueForm') form: NgForm;
  ratePercent: number;
  years: number;
  monthlyPayment: number;
  futureValueResult: BalanceSummary;
  showResults = false;
  isSubmitError = false;
  showInput = true;
  options: any;

  constructor(public futureValueService: FutureValueService, router: Router,
    private activatedRoute: ActivatedRoute) {
    super(router, activatedRoute);
    this.futureValueResult = <any>{};
  }

  ngOnInit() {

    this.activatedRoute.params.subscribe((params) => {

      const monthlyPayment = this.getNumericParms(params, 'monthlyPayment');
      const ratePercent = this.getNumericParms(params, 'rate');
      const years = this.getNumericParms(params, 'years');
      this.validateQueryStringParams(monthlyPayment, ratePercent, years);
    });
  }

  validateQueryStringParams = (monthlyPayment: any, ratePercent: any, years: any) => {


    if (monthlyPayment && !isNaN(monthlyPayment) && monthlyPayment >= 1 && monthlyPayment <= 99999) {
      this.monthlyPayment = monthlyPayment
    }
    else {
      this.monthlyPayment = null;
    }

    if (ratePercent && !isNaN(ratePercent) && ratePercent >= 0 && ratePercent <= 99) {

      this.ratePercent = ratePercent
    } else {
      this.ratePercent = null;
    }

    if (years && !isNaN(years) && years >= 1 && years <= 99) {
      this.years = years
    }
    else {
      this.years = null;
    }
  }

  calculate = () => {

    if (this.form.valid) {
      this.futureValueResult = this.futureValueService
        .monthlyPaymentsBalanceSummary(this.ratePercent, this.years, this.monthlyPayment);
      this.createChart(this.futureValueResult.paymentTotal, this.futureValueResult.interest);
      this.showInput = false;
    }
    else {
      this.isSubmitError = true;
    }

    this.showResults = this.form.valid;
  }

  handleShowOriginalInputEvent = (): void => {
    this.showInput = true;
    this.showResults = false;
  }

  handleCalculateEvent = (): void => {
    this.createChart(this.futureValueResult.paymentTotal, this.futureValueResult.interest);
  }

  //TODO fix this so you just pass in the object and not the individal numbers
  //Are you sure, perhaps it should be more generic, this should be in a service later
  //so it won't know about principal, etc.. just 2 numbers
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
        { name: 'Interest', y: interest, color: '#00FF00', dataLabels: dataLabels }],
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
    const showError = control.invalid && (control.touched || this.form.submitted);
    return showError;
  }
}