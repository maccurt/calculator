import { Component, OnInit, ViewChild } from '@angular/core';
import { IIndex } from 'app/stock-quote/index.type';
import { AbstractControl, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.indexList = this.getIndexList();
    this.indexSelected = this.indexList[0];
  }

  getIndexList = (): IIndex[] => {
    return this.route.snapshot.data.indexList;
  }

  showSubmitError = () => {
    // const result = !this.form.valid && this.form.submitted && this.isSubmitError;
    // return result;
  }

  indexChanged = (): void => { };

  showValidationError = (control: AbstractControl) => {
    //TODO I wish I could get the form passed in because I want to make this 
    //generic in the future so other controls can use it. Don't fret over it now
    // const showError = control.invalid && (control.touched || this.form.submitted);
    // return showError;
  }
}
