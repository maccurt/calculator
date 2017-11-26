import { TestBed, inject } from '@angular/core/testing';
import { StockQuoteService } from './stock-quote.service';

let service: StockQuoteService;

describe('StockQuoteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StockQuoteService]
    });

    service = TestBed.get(StockQuoteService);
  });

  describe('service', () => {
    it('should behave...', () => {

        expect(service).toBeDefined();

    });
  });
});
