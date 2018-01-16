import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, NgForm } from '@angular/forms';
import { MathService } from 'app/math/math.service';
import { WeightService, ICostPerOzResult, ISinkerWeight, ISinkerGroups } from 'app/weight-component/weight.service';

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
  result: ICostPerOzResult;
  isSubmitError = false;
  showResults = false;

  sinkerGroups: ISinkerGroups[];
  constructor(private mathService: MathService, private weightService: WeightService) { }

  ngOnInit() {

    this.quantity = 25;
    this.ounces = 8;
    this.cost = 25.99;
    this.shippingCost = 5;
    this.calculate();

    this.weightService.getWeights().subscribe((sinkerGroups: ISinkerGroups[]) => {
      this.sinkerGroups = sinkerGroups;
    });
  }

  calculate = () => {
    if (this.form.valid) {
      this.result = this.weightService.getCostPerOunce(this.quantity, this.ounces, this.cost, this.shippingCost);
    } else {
      this.isSubmitError = true;
    }

    this.showResults = this.form.valid;
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