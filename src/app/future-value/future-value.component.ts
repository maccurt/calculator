import { Component, OnInit } from '@angular/core';
import { FutureValueService } from './future-value.service'


@Component({
  selector: 'app-future-value',
  templateUrl: './future-value.component.html',
  styleUrls: ['./future-value.component.css']
})
export class FutureValueComponent implements OnInit {


  constructor(futureValueService: FutureValueService) { }

  ngOnInit() {
  }

  calculate = () => {

  }

}
