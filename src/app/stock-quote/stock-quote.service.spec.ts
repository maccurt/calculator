import { TestBed, inject } from '@angular/core/testing';
import { StockQuoteService } from './stock-quote.service';
import { IStockQuote } from 'app/stock-quote/index.type';
import { MathService } from 'app/math/math.service';

let service: StockQuoteService;

describe('StockQuoteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StockQuoteService, MathService]
    });

    service = TestBed.get(StockQuoteService);
  });

  describe('service', () => {
    it('should behave...', () => {
      expect(service).toBeDefined();
    });
  });

  describe('rateOfReturnAverage', () => {
    it('should return average of 10', () => {

      const quotes: IStockQuote[] = [];
      quotes.push({ year: 2014, rateOfReturn: 10 });
      quotes.push({ year: 2015, rateOfReturn: 10 });
      quotes.push({ year: 2016, rateOfReturn: 10 });
      quotes.push({ year: 2017, rateOfReturn: 10 });

      const avg = service.rateOfReturnAverage(quotes);
      expect(avg).toBe(10);
    });

    it('should return average of 7.5', () => {
      const quotes: IStockQuote[] = [];
      quotes.push({ year: 2014, rateOfReturn: 5 });
      quotes.push({ year: 2015, rateOfReturn: 10 });
      const avg = service.rateOfReturnAverage(quotes);
      expect(avg).toBe(7.5);
    });

    it('should return average of 4.8', () => {
      const quotes: IStockQuote[] = [];
      quotes.push({ year: 2014, rateOfReturn: 4.3 });
      quotes.push({ year: 2015, rateOfReturn: 5.3 });
      const avg = service.rateOfReturnAverage(quotes);
      expect(avg).toBe(4.8);
    });

  });

  describe('Name of the group', () => {
    const quotes: IStockQuote[] = [];
    quotes.push({ year: 2014, rateOfReturn: 10 });
    quotes.push({ year: 2015, rateOfReturn: 10 });
    quotes.push({ year: 2016, rateOfReturn: 10 });
    quotes.push({ year: 2017, rateOfReturn: 10 });
    it('2015 to 2016 shoudl return 2', () => {
      const slice = service.getQuoteListSlice(quotes, 2015, 2016);
      expect(slice.length).toBe(2);
      expect(slice[0]).toBe(quotes[1]);
      expect(slice[1]).toBe(quotes[2]);
    });

    it('2016 to 2015 shoudl return empty list', () => {
      const slice = service.getQuoteListSlice(quotes, 2016, 2015);
      expect(slice.length).toBe(0);
    });

    it('2014 to 2018 shoudl return empty list', () => {
      const slice = service.getQuoteListSlice(quotes, 2014, 2018);
      expect(slice.length).toBe(0);
    });

    it('2015 to 2018 shoudl return empty list', () => {
      const slice = service.getQuoteListSlice(quotes, 2015, 2018);
      expect(slice.length).toBe(0);
    });

    it('2013 to 2016 shoudl return empty list', () => {
      const slice = service.getQuoteListSlice(quotes, 2013, 2016);
      expect(slice.length).toBe(0);
    });

  });
  describe('findIndex', () => {
    it('2016 should be at index 1', () => {

      const quotes: IStockQuote[] = [];
      quotes.push({ year: 2015, rateOfReturn: 10 });
      quotes.push({ year: 2016, rateOfReturn: 10 });
      quotes.push({ year: 2017, rateOfReturn: 10 });
      quotes.push({ year: 2018, rateOfReturn: 10 });
      const index = service.findIndex(quotes, 2016);
      expect(index).toBe(1);
    });
  });
});
