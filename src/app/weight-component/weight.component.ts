import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, NgForm } from '@angular/forms';
import { MathService } from 'app/math/math.service';
import { WeightService } from 'app/weight-component/weight.service';
import { ICostPerOzResult, ISinkerWeight, ISinkerWeightGroupItem, ISinkerWeightGroup } from 'app/weight-component/weight.types';

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

  sinkerGroups: ISinkerWeightGroupItem[];
  group: ISinkerWeightGroup;
  constructor(private mathService: MathService, private weightService: WeightService) { }


  ngOnInit() {

    this.quantity = 25;
    this.ounces = 8;
    this.cost = 25.99;
    this.shippingCost = 5;
    this.calculate();

    this.weightService.GetSinkerWeightGroup().subscribe((group: ISinkerWeightGroup) => {
      this.sinkerGroups = group.items;
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