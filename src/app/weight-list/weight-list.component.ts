import { Component, OnInit } from '@angular/core';
import { WeightService } from 'app/weight-component/weight.service';
import { ISinkerWeightGroup, ICostPerOzResult, ISinkerWeight, ISinkerWeightGroupItem } from 'app/weight-component/weight.types';

@Component({
  selector: 'app-weight-list',
  templateUrl: './weight-list.component.html',
  styleUrls: ['./weight-list.component.less']
})
export class WeightListComponent implements OnInit {

  group: ISinkerWeightGroup;
  filterSinkerWeightGroupItems:ISinkerWeightGroupItem[]
  ounceSelected: string
  constructor(private weightService: WeightService) { }

  ngOnInit() {

    this.weightService.GetSinkerWeightGroup().subscribe((group: ISinkerWeightGroup) => {
      this.group = group;
      this.filterSinkerWeightGroupItems = this.group.items;
    });
  }

  ounceChanged = (ounce: any) => {

    this.filterSinkerWeightGroupItems = this.weightService.filterByOunce(this.group.items, ounce);

  }
}
