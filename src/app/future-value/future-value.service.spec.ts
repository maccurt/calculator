import { TestBed, inject } from '@angular/core/testing';
import { FutureValueService } from './future-value.service';
import { MathService } from 'app/math/math.service';
import { BalanceSummary } from 'app/future-value/IBalanceSummary.type';

let futureValueService: FutureValueService;
describe('FutureValueService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FutureValueService, MathService]
    });

    futureValueService = TestBed.get(FutureValueService);
  });

  it('furuteValueService should be created', () => {
    expect(futureValueService).toBeDefined()
  })

  describe('monthlyPayments', () => {
    it('5% 5 years $50 payment', () => {
      const fv = futureValueService.monthlyPayments(5, 5, 50);
      expect(fv).toBe(3400.3)
    })
  })

  describe('monthlyPaymentsWithDetail', () => {
    it('5% 5 years $50 payment', () => {
      const result = futureValueService.monthlyPaymentsWithDetail(5, 5, 50);
      expect(result.futureValue).toBe(3400.3)
      expect(result.principal).toBe(3000)
      expect(result.interest).toBe(400.3)
    })
  })

  describe('futureValue', () => {

    it('negative -12 percent interest should return 1634.02', () => {
      const fv = futureValueService.futureValue(-12 / 12, 12, 250, false);
      expect(fv).toBe(2840.38);
    });
    it('a zero percent interest should return correct', () => {
      const fv = futureValueService.futureValue(0, 12, 50, false);
      expect(fv).toBe(600);
    });

    it('5% 5 years $50 payment isBegin period false should be 3400.3', () => {
      const fv = futureValueService.futureValue(5 / 12, 60, 50, false)
      expect(fv).toBe(3400.3)
    })

    it('5% 5 years $50 payment isBegin period true should be 3414.47 ', () => {
      const fv = futureValueService.futureValue(5 / 12, 60, 50, true)
      expect(fv).toBe(3414.47)
    })
  })

  describe('rateOfReturn', () => {

    it('principal 100, end total 110 should return 10%', () => {
      const rateOfReturn = futureValueService.rateOfReturn(100, 110);
      expect(rateOfReturn).toBe(10);
    });
  });

  describe('monthlyPaymentsBalanceSummary', () => {

    it('5% 1 years $50 payment', () => {
      const result = futureValueService.monthlyPaymentsBalanceSummary(5, 1, 50);
      expect(result.detailItems[0].endBalance).toEqual(613.94);

      // expect(result.balance).toBe(3400.3)
      // expect(result.paymentTotal).toBe(3000)
      // expect(result.interest).toBe(400.3)
    })

  });

  describe('monthlyPaymentsBalanceSummary', () => {
    it('5% 5 years $50 payment', () => {
      const result = futureValueService.monthlyPaymentsBalanceSummary(5, 5, 50);
      expect(result.balance).toBe(3400.29)
      expect(result.paymentTotal).toBe(3000)
      expect(result.interest).toBe(400.29)
    })
  });

  describe('Name of the group', () => {
    it('should behave...', () => {
      const x = futureValueService.monthlyPaymentsBalanceSummary(8.5, 20, 50);
      expect(x.detailItems[0].endBalance).toBe(623.94)
    });
  });
  describe('calculateBalanceSummary', () => {

    let balanceSummary: BalanceSummary;
    beforeEach(() => {
      balanceSummary = futureValueService.monthlyPaymentsBalanceSummary(7, 3, 20);
    })

    describe('baseline', () => {

      it('balance', () => {
        expect(balanceSummary.balance).toEqual(798.60);
      });

      it('should behave...', () => {
        expect(balanceSummary.detailItems.length).toEqual(3)
      });
    })

    describe('no changes a', () => {
      beforeEach(() => {
        futureValueService.calculateBalanceSummary(balanceSummary);
      });

      it('balance', () => {
        expect(balanceSummary.balance).toEqual(798.60);
      });

      it('balance', () => {
        expect(balanceSummary.interest).toEqual(78.6);
      });

      // describe("index 0", function () {

      //     it('begin balance', function () {
      //         expect(balanceSummary.detailItems[0].beginBalance).toEqual(0);
      //     });

      //     it('yearPaymentTotal', function () {
      //         expect(balanceSummary.detailItems[0].yearPaymentTotal).toEqual(240);
      //     });

      //     it('paymentTotal', function () {
      //         expect(balanceSummary.detailItems[0].paymentTotal).toEqual(240);
      //     });

      //     it('interest', function () {
      //         expect(balanceSummary.detailItems[0].interest).toEqual(9.30);
      //     });

      //     it('endBalance', function () {
      //         expect(balanceSummary.detailItems[0].endBalance).toEqual(249.30);
      //     });
      // });

      // describe("index 1", function () {

      //     it('begin balance', function () {
      //         expect(balanceSummary.detailItems[1].beginBalance).toEqual(249.30);
      //     });

      //     it('yearPaymentTotal', function () {
      //         expect(balanceSummary.detailItems[1].yearPaymentTotal).toEqual(240);
      //     });

      //     it('paymentTotal', function () {
      //         expect(balanceSummary.detailItems[1].paymentTotal).toEqual(480);
      //     });

      //     it('interest', function () {
      //         expect(balanceSummary.detailItems[1].interest).toEqual(27.32);
      //     });

      //     it('endBalance', function () {
      //         expect(balanceSummary.detailItems[1].endBalance).toEqual(516.62);
      //     });
      // });

      // describe("index 2", function () {

      //     it('begin balance', function () {
      //         expect(balanceSummary.detailItems[2].beginBalance).toEqual(516.62);
      //     });

      //     it('yearPaymentTotal', function () {
      //         expect(balanceSummary.detailItems[2].yearPaymentTotal).toEqual(240);
      //     });

      //     it('paymentTotal', function () {
      //         expect(balanceSummary.detailItems[2].paymentTotal).toEqual(720);
      //     });

      //     it('interest', function () {
      //         expect(balanceSummary.detailItems[2].interest).toEqual(46.65);
      //     });

      //     it('endBalance', function () {
      //         expect(balanceSummary.detailItems[2].endBalance).toEqual(803.27);
      //     });
      // });

    });

    describe('changes the interest rate on the first item to 8%', () => {
      beforeEach(() => {
        balanceSummary.detailItems[0].ratePercent = 8;
        futureValueService.calculateBalanceSummary(balanceSummary);
      });

      describe('index 0', () => {
        it('endBalance', () => {
          expect(balanceSummary.detailItems[0].endBalance).toEqual(249.00);
        });

        it('interest', () => {
          expect(balanceSummary.detailItems[0].interest).toEqual(9);
        });
      });

      describe('index 1', () => {
        it('beginBalance', () => {
          expect(balanceSummary.detailItems[1].beginBalance).toEqual(249);
        });

        it('endBalance', () => {
          expect(balanceSummary.detailItems[1].endBalance).toEqual(514.85);
        });

        it('interest', () => {
          expect(balanceSummary.detailItems[1].interest).toEqual(25.85);
        });
      });

      describe('index 2', () => {
        it('endBalance', () => {
          expect(balanceSummary.detailItems[2].endBalance).toEqual(799.92);
        });
      });
    });

    describe('change the period payment to 100 on the first item', () => {
      beforeEach(() => {
        balanceSummary.detailItems[0].periodPayment = 100;
        futureValueService.calculateBalanceSummary(balanceSummary);
      });

      describe('index 0', () => {
        it('interest', () => {
          expect(balanceSummary.detailItems[0].interest).toEqual(39.26);
        });

        it('endBalance', () => {
          expect(balanceSummary.detailItems[0].endBalance).toEqual(1239.26);
        });

        it('yearPaymentTotal', () => {
          expect(balanceSummary.detailItems[0].yearPaymentTotal).toEqual(1200);
        });

        it('paymentTotal', () => {
          expect(balanceSummary.detailItems[0].paymentTotal).toEqual(1200);
        });
      });

    });
  });
})
