import { Component, OnInit } from '@angular/core';
import { FutureValueService } from './future-value.service'


@Component({
  selector: 'app-future-value',
  templateUrl: './future-value.component.html',
  styleUrls: ['./future-value.component.css']
})
export class FutureValueComponent implements OnInit {

  ratePercent:number;
  years:number;
  payment:number;


  constructor(public futureValueService: FutureValueService) { }

  ngOnInit() {
  }

  calculate = () => {
    this.futureValueService.monthlyPayments(this.ratePercent,this.years,this.payment)
  }

}
