import { TestBed, inject } from '@angular/core/testing';
import { FutureValueService } from './future-value.service';
import { MathService } from 'app/math/math.service';

var futureValueSerive: FutureValueService;
describe('FutureValueService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FutureValueService, MathService]
    });

    futureValueSerive = TestBed.get(FutureValueService);
  });

  it('furuteValueService should be created', () => {
    expect(futureValueSerive).toBeDefined()
  })

  describe('monthlyPayments', () => {
    it('5% 5 years $50 payment', () => {
      var fv = futureValueSerive.monthlyPayments(5, 5, 50);
      expect(fv).toBe(3400.3)
    })
  })

  describe('futureValue', () => {
    
    it('5% 5 years $50 payment isBegin period false should be 3400.3', () => {
      var fv = futureValueSerive.futureValue(5/12,60,50,false)
      expect(fv).toBe(3400.3)
    })

    it('5% 5 years $50 payment isBegin period true should be 3414.47 ', () => {
      var fv = futureValueSerive.futureValue(5/12,60,50,true)
      expect(fv).toBe(3414.47)
    })
  })
});