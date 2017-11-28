import { Component, OnInit, ViewChild } from '@angular/core';
import { IIndex } from 'app/stock-quote/index.type';
import { AbstractControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-future-value-stock-qoute',
  templateUrl: './future-value-stock-qoute.component.html',
  styleUrls: ['./future-value-stock-qoute.component.less']
})
export class FutureValueStockQouteComponent implements OnInit {
  indexList: IIndex[];
  @ViewChild('futureValueForm') form: NgForm;
  isSubmitError = false;
  showInput =true;
  indexSelected:IIndex
  constructor() { }

  ngOnInit() {
    this.indexList = [];
    this.indexList.push({ id: 1, name: 'SP 500' })
    this.indexSelected = this.indexList[0];
  }

  showSubmitError = () => {
    // const result = !this.form.valid && this.form.submitted && this.isSubmitError;
    // return result;
  }

  indexChanged = ():void => {  }

  showValidationError = (control: AbstractControl) => {
    //TODO I wish I could get the form passed in because I want to make this 
    //generic in the future so other controls can use it. Don't fret over it now
    // const showError = control.invalid && (control.touched || this.form.submitted);
    // return showError;
  }
}
