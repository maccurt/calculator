import { TestBed, inject } from '@angular/core/testing';
import { WeightService } from './weight.service';
import { ICostPerOzResult, ISinkerWeight, ISinkerWeightGroupItem, ISinkerWeightGroup } from './weight.types';
import { MathService } from 'app/math/math.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

describe('WeightService', () => {

    let service: WeightService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [WeightService, MathService, HttpClient],
            imports: [HttpClientModule]
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


    describe('Name of the group', () => {

        it('should behave...', () => {

            const items = [
                {
                    results: [{ costPerOunce: 0.11, isBestDeal: null }, { costPerOunce: 0.12, isBestDeal: true },
                    { costPerOunce: 0.11, isBestDeal: undefined }]
                },
                {
                    results: [{ costPerOunce: 0.12, isBestDeal: true }, { costPerOunce: 0.11, isBestDeal: undefined }]
                }
            ];

            service.setBestDeal(<any>items);
            expect(items[0].results[0].isBestDeal).toBe(true);
            expect(items[0].results[1].isBestDeal).toBe(false);
            expect(items[0].results[2].isBestDeal).toBe(true);
            expect(items[1].results[0].isBestDeal).toBe(false);
            expect(items[1].results[1].isBestDeal).toBe(true);

        });

    });

});