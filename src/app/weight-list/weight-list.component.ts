import { Component, OnInit } from '@angular/core';
import { WeightService, ISinkerWeight, ISinkerGroup } from 'app/weight-component/weight.service';

@Component({
  selector: 'app-weight-list',
  templateUrl: './weight-list.component.html',
  styleUrls: ['./weight-list.component.less']
})
export class WeightListComponent implements OnInit {

  weightGroupList: ISinkerGroup[];
  constructor(private weightService: WeightService) { }

  ngOnInit() {

    this.weightService.getWeights().subscribe((weightGroupList: ISinkerGroup[]) => {

      this.weightGroupList = weightGroupList;
    });

  }
}
