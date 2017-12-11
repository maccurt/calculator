import { Component, OnInit, ViewChild } from '@angular/core';
import { IIndex, IStockQuote } from 'app/stock-quote/index.type';
import { AbstractControl, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StockQuoteService } from 'app/stock-quote/stock-quote.service';
import { IBalanceSummary } from 'app/future-value/IBalanceSummary.type';
import { FutureValueService } from 'app/future-value/future-value.service';

@Component({
  selector: 'app-future-value-stock-qoute',
  templateUrl: './future-value-stock-qoute.component.html',
  styleUrls: ['./future-value-stock-qoute.component.less']
})
export class FutureValueStockQouteComponent implements OnInit {
  yearsSelected: number;
  showResults = false;
  monthlyPayment: number;
  rateOfReturnAverage: number;
  options: any;
  stockIndexList: IIndex[];
  @ViewChild('futureValueForm') form: NgForm;
  isSubmitError = false;
  showInput = true;
  indexSelected: IIndex;
  stockQuoteListSelected: IStockQuote[];
  startQuote: IStockQuote;
  endQuote: IStockQuote;
  invalidQuoteYear = false;
  balanceSummary: IBalanceSummary;

  constructor(public route: ActivatedRoute,
    public stockQouteService: StockQuoteService, public futureValueService: FutureValueService) { }

  ngOnInit() {
    this.stockIndexList = this.getIndexList();
    this.indexSelected = this.stockIndexList[0];
    this.setIndexQoutes();
    this.setSelectedQuotes();
  }

  getIndexList = (): IIndex[] => {
    return this.route.snapshot.data.indexList;
  }

  showSubmitError = () => {
    const result = !this.form.valid && this.form.submitted && this.isSubmitError;
    return result;
  }

  setIndexQoutes = () => {
    this.stockQouteService.getIndexQuotes(this.indexSelected.id).subscribe((qoutes: IStockQuote[]) => {
      this.indexSelected.qoutes = qoutes;
      this.startQuote = this.indexSelected.qoutes[0];
      this.endQuote = this.indexSelected.qoutes[this.indexSelected.qoutes.length - 1];
    });
  }

  startQuoteChanged = () => {
    this.setSelectedQuotes();
  }

  endQuoteChanged = () => {
    this.setSelectedQuotes();
  }

  setSelectedQuotes = () => {
    this.validateQoutes();
    if (!this.invalidQuoteYear) {
      this.stockQuoteListSelected = this.stockQouteService
        .getQuoteListSlice(this.indexSelected.qoutes, this.startQuote.year, this.endQuote.year);
      this.rateOfReturnAverage = this.stockQouteService.rateOfReturnAverage(this.stockQuoteListSelected);
      this.yearsSelected = this.stockQuoteListSelected.length;
    }
    else {
      this.rateOfReturnAverage = 0;
      this.yearsSelected = 0;
    }
  }

  validateQoutes = () => {
    this.invalidQuoteYear = (this.startQuote.year > this.endQuote.year);
  }

  stockIndexChanged = (): void => {

    if (!this.indexSelected.qoutes || this.indexSelected.qoutes.length === 0) {
      this.setIndexQoutes();
    }
  }

  calculate = (): void => {

    if (this.form.valid) {
      this.balanceSummary = this.futureValueService
        .balanceSummaryStockQuotes(this.stockQuoteListSelected, this.monthlyPayment);
      this.showResults = true;
      this.showInput = false;
    } else {
      this.isSubmitError = true;
    }

    this.showResults = this.form.valid;
  }

  showValidationError = (control: AbstractControl) => {
    const showError = control.invalid && (control.touched || this.form.submitted);
    return showError;
  }

  handleShowOriginalInputEvent = () => {
    this.showInput = true;
    this.showResults = false;
  }

  handleCalculateEvent = (event: any): void => {
    //console.log('handleCalculateEvent');
  }
}