import { Injectable, group } from '@angular/core';
import { MathService } from 'app/math/math.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export interface ICostPerOzResult {
  costTotal: number;
  ounceTotal: number;
  costPerOunce: number;
}

export interface ISinkerWeight {
  itemId: string;
  title: string;
  url: string;
  price: number;
  ounce: number;
  quantity: number;
  ounceTotal: number;
  costPerOunce: number;
}

export interface ISinkerGroups {
  title: string;
  results: ISinkerWeight[];
}

@Injectable()
export class WeightService {

  constructor(private mathService: MathService) {

  }

  getCostPerOunce = (quantity: number, ounces: number, cost: number, shippingCost: number): ICostPerOzResult => {

    //TODO move this to a service...
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

  getWeights = (): Observable<ISinkerGroups[]> => {

    // tslint:disable-next-line:quotemark    



    const weightObject: ISinkerGroups[] = JSON.parse(this.getData());

    weightObject.forEach((groups: ISinkerGroups) => {

      groups.results.forEach(weight => {
        const result = this.getCostPerOunce(weight.quantity, weight.ounce, weight.price, 0);
        weight.costPerOunce = result.costPerOunce;
        weight.ounceTotal = result.ounceTotal;
      });

    });

    return Observable.of(weightObject);
  }

  getData = () => {
    // tslint:disable-next-line:max-line-length
    const data = '[{"title":"No Roll Sinkers","results":[{"itemId":"182821404384","groupTitle":"No Roll Sinkers","title":"(10) 8oz Slip No Roll Sinkers \\\"FREE SHIPPING\\\" ","price":"17.49","isFreeShipping":true,"include":true,"ounce":8.0,"quantity":10.0,"url":"http://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=2&toolid=10044&campid=5337817519&customid=1&lgeo=1&vectorid=229466&item=182821404384"},{"itemId":"172918691378","groupTitle":"No Roll Sinkers","title":"(20) 8oz Slip No Roll Sinkers \\\"FREE SHIPPING\\\" ","price":"25.99","isFreeShipping":true,"include":true,"ounce":8.0,"quantity":20.0,"url":"http://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=2&toolid=10044&campid=5337817519&customid=1&lgeo=1&vectorid=229466&item=172918691378"},{"itemId":"182821391570","groupTitle":"No Roll Sinkers","title":"(30) 8oz Slip No Roll Sinkers \\\"FREE SHIPPING\\\" ","price":"34.99","isFreeShipping":true,"include":true,"ounce":8.0,"quantity":30.0,"url":"http://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=2&toolid=10044&campid=5337817519&customid=1&lgeo=1&vectorid=229466&item=182821391570"},{"itemId":"182821405130","groupTitle":"No Roll Sinkers","title":"(25) 8oz Slip No Roll Sinkers \\\"FREE SHIPPING\\\" ","price":"31.99","isFreeShipping":true,"include":true,"ounce":8.0,"quantity":25.0,"url":"http://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=2&toolid=10044&campid=5337817519&customid=1&lgeo=1&vectorid=229466&item=182821405130"},{"itemId":"142644346816","groupTitle":"No Roll Sinkers","title":"10lbs 8oz No-Roll Weights (20 weights) Lead Fishing Sinkers Bulk","price":"36.99","isFreeShipping":true,"include":true,"ounce":8.0,"quantity":20.0,"url":"http://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=2&toolid=10044&campid=5337817519&customid=1&lgeo=1&vectorid=229466&item=142644346816"},{"itemId":"142644346812","groupTitle":"No Roll Sinkers","title":"20lbs 8oz No-Roll Weights (40 weights) Lead Fishing Sinkers Bulk","price":"55.0","isFreeShipping":true,"include":true,"ounce":8.0,"quantity":40.0,"url":"http://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=2&toolid=10044&campid=5337817519&customid=1&lgeo=1&vectorid=229466&item=142644346812"}]},{"title":"Pyramid Sinkers","results":[{"itemId":"122776932540","groupTitle":"Pyramid Sinkers","title":"8oz Pyramid Sinkers  20count!!!!","price":"27.99","isFreeShipping":true,"include":true,"ounce":8.0,"quantity":20.0,"url":"http://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=2&toolid=10044&campid=5337817519&customid=1&lgeo=1&vectorid=229466&item=122776932540"},{"itemId":"122806305968","groupTitle":"Pyramid Sinkers","title":"8oz Pyramid Sinkers  10count!!!!","price":"18.99","isFreeShipping":true,"include":true,"ounce":8.0,"quantity":10.0,"url":"http://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=2&toolid=10044&campid=5337817519&customid=1&lgeo=1&vectorid=229466&item=122806305968"},{"itemId":"142644346773","groupTitle":"Pyramid Sinkers","title":"10lbs 8oz Pyramid Weights (20 weights) Lead Fishing Sinkers Bulk","price":"30.0","isFreeShipping":true,"include":true,"ounce":8.0,"quantity":20.0,"url":"http://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=2&toolid=10044&campid=5337817519&customid=1&lgeo=1&vectorid=229466&item=142644346773"},{"itemId":"142644346748","groupTitle":"Pyramid Sinkers","title":"10lbs 8oz Pyramid Weights (20 weights) Lead Fishing Sinkers Bulk","price":"30.0","isFreeShipping":true,"include":true,"ounce":8.0,"quantity":20.0,"url":"http://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=2&toolid=10044&campid=5337817519&customid=1&lgeo=1&vectorid=229466&item=142644346748"},{"itemId":"112568132236","groupTitle":"Pyramid Sinkers","title":"8 oz pyramid fishing sinkers 20 pack","price":"30.0","isFreeShipping":true,"include":true,"ounce":8.0,"quantity":20.0,"url":"http://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=2&toolid=10044&campid=5337817519&customid=1&lgeo=1&vectorid=229466&item=112568132236"}]}]';
    return data;
  }
}