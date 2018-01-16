import { TestBed, inject } from '@angular/core/testing';

import { WeightService, ICostPerOzResult, ISinkerWeight, ISinkerGroups } from './weight.service';
import { MathService } from 'app/math/math.service';

describe('WeightService', () => {

  let service: WeightService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeightService, MathService]
    });
    service = TestBed.get(WeightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Cost per oz', () => {

    let result: ICostPerOzResult;

    describe('$25 cost 8 oz $25.99 cost $5 S&H', () => {
      beforeEach(() => {
        result = service.getCostPerOunce(25, 8, 25.99, 5);
      });

      it('ounceTotal', () => {
        expect(result.ounceTotal).toBe(200);

      });
      it('costTotal should be 30.99', () => {
        expect(result.costTotal).toBe(30.99);
      });

      it('cost per oz should be .15', () => {
        expect(result.costPerOunce).toBe(.15);
      });
    });

    describe('$25 cost 8 oz $25.99 cost FREE S&H', () => {
      beforeEach(() => {
        result = service.getCostPerOunce(25, 8, 25.99, 0);
      });

      it('ounceTotal', () => {
        expect(result.ounceTotal).toBe(200);

      });
      it('costTotal should be 25.99', () => {
        expect(result.costTotal).toBe(25.99);
      });

      it('cost per oz should be .13', () => {
        expect(result.costPerOunce).toBe(.13);
      });
    });

  });

  describe('get weights', () => {

    it('should behave...', () => {

      service.getWeights().subscribe((data: ISinkerGroups[]) => { 
        
        console.log(data[1].title);
        

      });

    });

  });
});
