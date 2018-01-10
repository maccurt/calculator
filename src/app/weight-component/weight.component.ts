import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, NgForm } from '@angular/forms';
import { MathService } from 'app/math/math.service';

@Component({
  selector: 'app-weight-component',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.less']
})
export class WeightComponent implements OnInit {
  @ViewChild('weightForm') form: NgForm;
  quantity: number;
  ounces: number;
  cost: number;
  shippingCost: number;
  costPerOz: number;
  isSubmitError = false;
  ouncesTotal = 0
  costTotal = 0;
  constructor(private mathService: MathService) { }

  ngOnInit() {

    this.quantity = 25;
    this.ounces = 8;
    this.cost = 25.99
    this.shippingCost = 5
    this.costPerOz;

    this.ouncesTotal = 0;
  }

  calculate = () => {

    //TODO move this to a service...
    const totalOunces = this.mathService.round(this.quantity * this.ounces, 2)
    const totalCost = this.mathService.round(this.cost + this.shippingCost, 2);
    const costPerOz = this.mathService.round(totalCost / totalOunces, 2);
    console.log('cost per oz', costPerOz);
    this.costPerOz = costPerOz;
    this.costTotal = totalCost;

  }

  showSubmitError = () => {
    const result = !this.form.valid && this.form.submitted && this.isSubmitError;
    return result;
  }

  showValidationError = (control: AbstractControl) => {
    const showError = control.invalid && (control.touched || this.form.submitted);
    return showError;
  }

}