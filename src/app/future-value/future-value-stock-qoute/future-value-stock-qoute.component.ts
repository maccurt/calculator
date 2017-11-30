import { Component, OnInit, ViewChild } from '@angular/core';
import { IIndex, IStockQuote } from 'app/stock-quote/index.type';
import { AbstractControl, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StockQuoteService } from 'app/stock-quote/stock-quote.service';

@Component({
  selector: 'app-future-value-stock-qoute',
  templateUrl: './future-value-stock-qoute.component.html',
  styleUrls: ['./future-value-stock-qoute.component.less']
})
export class FutureValueStockQouteComponent implements OnInit {
  options: any;
  indexList: IIndex[];
  @ViewChild('futureValueForm') form: NgForm;
  isSubmitError = false;
  showInput = true;
  indexSelected: IIndex;
  stockQouteList: IStockQuote[];
  constructor(private route: ActivatedRoute, private stockQouteService: StockQuoteService) { }

  ngOnInit() {
    this.indexList = this.getIndexList();
    this.indexSelected = this.indexList[0];
    this.indexChanged();    
  }

  getIndexList = (): IIndex[] => {
    return this.route.snapshot.data.indexList;
  }

  showSubmitError = () => {
    // const result = !this.form.valid && this.form.submitted && this.isSubmitError;
    // return result;
  }


  indexChanged = (): void => {

    if (!this.indexSelected.qoutes) {
      this.stockQouteService.getIndexQuotes(this.indexSelected.id).subscribe((qoutes: IStockQuote[]) => {
        this.indexSelected.qoutes = qoutes;
        console.log(this.indexSelected.qoutes);
      })
    }

  };

  showValidationError = (control: AbstractControl) => {
    //TODO I wish I could get the form passed in because I want to make this 
    //generic in the future so other controls can use it. Don't fret over it now
    // const showError = control.invalid && (control.touched || this.form.submitted);
    // return showError;
  }
}
