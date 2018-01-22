import { Component, OnInit } from '@angular/core';
import { WeightService } from 'app/weight-component/weight.service';
import {
  ISinkerWeightGroup, ICostPerOzResult,
  ISinkerWeight, ISinkerWeightGroupItem, IValueText, ISortBy
} from 'app/weight-component/weight.types';
import * as lodash from 'lodash';
@Component({
  selector: 'app-weight-list',
  templateUrl: './weight-list.component.html',
  styleUrls: ['./weight-list.component.less']
})
export class WeightListComponent implements OnInit {

  group: ISinkerWeightGroup;
  filterSinkerWeightGroupItems: ISinkerWeightGroupItem[];
  ounceSelected: IValueText;
  sinkerTypeSelected: IValueText;
  sortByList: ISortBy[];
  sortBySelected: ISortBy;
  sortByDirectionList: IValueText[];
  sortByDirectionSelected: IValueText;
  constructor(private weightService: WeightService) { }

  ngOnInit() {

    this.sortByList = [
      { value: 1, text: 'Cost Per Oz', field: 'costPerOunce' },
      { value: 2, text: 'Oz', field: 'ounce' },
      { value: 3, text: 'Price', field: 'price' },
      { value: 4, text: 'Quantity', field: 'quantity' }
    ];
    this.sortBySelected = this.sortByList[0];

    this.sortByDirectionList = [
      { value: 1, text: 'Lowest To Highest' },
      { value: 2, text: 'Highest To Lowest' }
    ];
    this.sortByDirectionSelected = this.sortByDirectionList[0];

    this.weightService.GetSinkerWeightGroup().subscribe((group: ISinkerWeightGroup) => {
      this.group = group;
      this.filterSinkerWeightGroupItems = this.group.items;
      this.ounceSelected = this.group.ounceList[0];
      this.sinkerTypeSelected = this.group.sinkerTypeList[0];      

      this.sortList();
    });
  }

  ounceChanged = (ounce: IValueText) => {

    if (ounce.value === 0) {
      this.filterSinkerWeightGroupItems = this.group.items;
    }
    else {
      this.filterSinkerWeightGroupItems = this.weightService.filterByOunce(this.group.items, parseInt(ounce.text, 10));
    }
  }

  sinkerTypeChanged = (sinkerType: IValueText) => {

  }

  showOnlyThisType = (sinkerWeightGroupItem: ISinkerWeightGroupItem): boolean => {
    if (this.sinkerTypeSelected.value === 0) {
      return true;
    }
    return (this.sinkerTypeSelected.text === sinkerWeightGroupItem.title);
  }

  sortByChanged = (sortBy: IValueText) => {
    this.sortList();
  }

  sortByDirectionChanged = (sortByDirection: IValueText) => {
    this.sortList();
  }

  sortList = (): void => {

    this.filterSinkerWeightGroupItems.forEach((item: ISinkerWeightGroupItem) => {

      let direction = 'asc';
      if (this.sortByDirectionSelected.value === 2) {
        direction = 'desc';
      }

      item.results = lodash.orderBy(item.results, [this.sortBySelected.field], [direction]);
      console.log('sorted');
    });
  }
}