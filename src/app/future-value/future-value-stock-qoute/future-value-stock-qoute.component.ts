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
  indexList: IIndex[];
  @ViewChild('futureValueForm') form: NgForm;
  isSubmitError = false;
  showInput = true;
  indexSelected: IIndex;
  // stockQuoteList: IStockQuote[];
  stockQuoteListSelected: IStockQuote[];
  startQuote: IStockQuote;
  endQuote: IStockQuote;
  invalidQuoteYear = false;
  balanceSummary: IBalanceSummary;

  constructor(private route: ActivatedRoute,
    private stockQouteService: StockQuoteService, private futureValueService: FutureValueService) { }

  ngOnInit() {
    this.indexList = this.getIndexList();
    this.indexSelected = this.indexList[0];
    this.setIndexQoutes();
    this.setSelectedQuotes();
  }

  getIndexList = (): IIndex[] => {
    return this.route.snapshot.data.indexList;
  }

  showSubmitError = () => {
    // const result = !this.form.valid && this.form.submitted && this.isSubmitError;
    // return result;
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
    this.stockQuoteListSelected = this.stockQouteService
      .getQuoteListSlice(this.indexSelected.qoutes, this.startQuote.year, this.endQuote.year);
    this.rateOfReturnAverage = this.stockQouteService.rateOfReturnAverage(this.stockQuoteListSelected);
    this.yearsSelected = this.stockQuoteListSelected.length;
  }

  validateQoutes = () => {
    this.invalidQuoteYear = (this.startQuote.year > this.endQuote.year);
  }

  indexChanged = (): void => {

    if (!this.indexSelected.qoutes) {
      this.setIndexQoutes();
    }
  }

  calculate = (): void => {

    //You have to figure out how to force angular to keep it a number
    const payment = parseFloat(this.monthlyPayment.toString());
    this.balanceSummary = this.futureValueService
      .balanceSummaryStockQuotes(this.stockQuoteListSelected, payment);
    console.log(this.balanceSummary);
    this.showResults = true;
    this.showInput = false;
  }

  showValidationError = (control: AbstractControl) => {
    //TODO I wish I could get the form passed in because I want to make this 
    //generic in the future so other controls can use it. Don't fret over it now
    // const showError = control.invalid && (control.touched || this.form.submitted);
    // return showError;
  }
}
