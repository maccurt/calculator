import { Injectable, group } from '@angular/core';
import { MathService } from 'app/math/math.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import * as lodash from "lodash";
import { single } from 'rxjs/operator/single';
import { ICostPerOzResult, ISinkerWeight, ISinkerWeightGroupItem, ISinkerWeightGroup } from 'app/weight-component/weight.types';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WeightService {

  constructor(private mathService: MathService, private httpClient: HttpClient) {

  }

  getCostPerOunce = (quantity: number, ounces: number, cost: number, shippingCost: number): ICostPerOzResult => {

    const ounceTotal = this.mathService.round(quantity * ounces, 2);
    const costTotal = this.mathService.round(cost + shippingCost, 2);
    const costPerOz = this.mathService.round(costTotal / ounceTotal, 2);

    const result: ICostPerOzResult = {
      costTotal: costTotal,
      ounceTotal: ounceTotal,
      costPerOunce: costPerOz
    };

    return result;
  }

  filterByOunce = (items: ISinkerWeightGroupItem[], ounce: number): ISinkerWeightGroupItem[] => {

    let filterItems: ISinkerWeightGroupItem[] = [];

    items.forEach((sinkerWeightGroupItem: ISinkerWeightGroupItem) => {

      const sinkers: ISinkerWeight[] = lodash.filter(sinkerWeightGroupItem.results, (sinker: ISinkerWeight) => {
        return sinker.ounce === ounce
      });

      const groupItem: ISinkerWeightGroupItem = {
        title: sinkerWeightGroupItem.title,
        results: sinkers
      };

      filterItems.push(groupItem);

    })

    return filterItems;
  }


  GetSinkerWeightGroup = (): Observable<ISinkerWeightGroup> => {

    return this.httpClient
      .get<ISinkerWeightGroup>("http://localhost/CalculatorRest/api/SinkerWeightGroup")
    //.get<ISinkerWeightGroup>("https://profitdreamercalculatorapi.azurewebsites.net/api/SinkerWeightGroup")    
  }
}