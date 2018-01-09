import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-weight-component',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.less']
})
export class WeightComponent implements OnInit {
  @ViewChild('weightForm') form: NgForm;
  quantity:number;
  ounces:number;
  cost:number;
  shippingCost:number;
  constructor() { }

  ngOnInit() {

    this.quantity = 25;
    this.ounces = 8;
    this.cost = 25.99
    this.shippingCost = 5
  }

  
  showValidationError = (control: AbstractControl) => {
    const showError = control.invalid && (control.touched || this.form.submitted);
    return showError;
  }

}
