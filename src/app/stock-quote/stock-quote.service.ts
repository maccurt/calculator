import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export interface IStokeQuote {
  year: number;
  rateOfReturn: number;
}

@Injectable()
export class StockQuoteService {

  constructor() { }

  createStockQuote = (year: number, rateOfReturn: number): IStokeQuote => {
    return {
      year: year,
      rateOfReturn: rateOfReturn
    };
  }
  sp500Years = (year: number, years: number): Observable<IStokeQuote[]> => {
    return this.sp500();
  }
  sp500 = (): Observable<IStokeQuote[]> => {

    const list: IStokeQuote[] = [];
    //TODO when we have a service put this in the API
    //http://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/histretSP.html
    //https://seekingalpha.com/instablog/605212-robert-allan-schwartz/4831186-annual-returns-s-and-p-500-1928-2015
    list.push(this.createStockQuote(1928, 43.81));
    list.push(this.createStockQuote(1929, -8.30));
    list.push(this.createStockQuote(1930, -25.12));
    list.push(this.createStockQuote(1931, -43.84));
    list.push(this.createStockQuote(1932, -8.64));
    list.push(this.createStockQuote(1933, 49.98));
    list.push(this.createStockQuote(1934, -1.19));
    list.push(this.createStockQuote(1935, 46.74));
    list.push(this.createStockQuote(1936, 31.94));
    list.push(this.createStockQuote(1937, -35.34));
    list.push(this.createStockQuote(1938, 29.28));
    list.push(this.createStockQuote(1939, -1.10));
    list.push(this.createStockQuote(1940, -10.67));
    list.push(this.createStockQuote(1941, -12.77));
    list.push(this.createStockQuote(1942, 19.17));
    list.push(this.createStockQuote(1943, 25.06));
    list.push(this.createStockQuote(1944, 19.03));
    list.push(this.createStockQuote(1945, 35.82));
    list.push(this.createStockQuote(1946, -8.43));
    list.push(this.createStockQuote(1947, 5.20));
    list.push(this.createStockQuote(1948, 5.70));
    list.push(this.createStockQuote(1949, 18.30));
    list.push(this.createStockQuote(1950, 30.81));
    list.push(this.createStockQuote(1951, 23.68));
    list.push(this.createStockQuote(1952, 18.15));
    list.push(this.createStockQuote(1953, -1.21));
    list.push(this.createStockQuote(1954, 52.56));
    list.push(this.createStockQuote(1955, 32.60));
    list.push(this.createStockQuote(1956, 7.44));
    list.push(this.createStockQuote(1957, -10.46));
    list.push(this.createStockQuote(1958, 43.72));
    list.push(this.createStockQuote(1959, 12.06));
    list.push(this.createStockQuote(1960, 0.34));
    list.push(this.createStockQuote(1961, 26.64));
    list.push(this.createStockQuote(1962, -8.81));
    list.push(this.createStockQuote(1963, 22.61));
    list.push(this.createStockQuote(1964, 16.42));
    list.push(this.createStockQuote(1965, 12.40));
    list.push(this.createStockQuote(1966, -9.97));
    list.push(this.createStockQuote(1967, 23.80));
    list.push(this.createStockQuote(1968, 10.81));
    list.push(this.createStockQuote(1969, -8.24));
    list.push(this.createStockQuote(1970, 3.56));
    list.push(this.createStockQuote(1971, 14.22));
    list.push(this.createStockQuote(1972, 18.76));
    list.push(this.createStockQuote(1973, -14.31));
    list.push(this.createStockQuote(1974, -25.90));
    list.push(this.createStockQuote(1975, 37.00));
    list.push(this.createStockQuote(1976, 23.83));
    list.push(this.createStockQuote(1977, -6.98));
    list.push(this.createStockQuote(1978, 6.51));
    list.push(this.createStockQuote(1979, 18.52));
    list.push(this.createStockQuote(1980, 31.74));
    list.push(this.createStockQuote(1981, -4.70));
    list.push(this.createStockQuote(1982, 20.42));
    list.push(this.createStockQuote(1983, 22.34));
    list.push(this.createStockQuote(1984, 6.15));
    list.push(this.createStockQuote(1985, 31.24));
    list.push(this.createStockQuote(1986, 18.49));
    list.push(this.createStockQuote(1987, 5.81));
    list.push(this.createStockQuote(1988, 16.54));
    list.push(this.createStockQuote(1989, 31.48));
    list.push(this.createStockQuote(1990, -3.06));
    list.push(this.createStockQuote(1991, 30.23));
    list.push(this.createStockQuote(1992, 7.49));
    list.push(this.createStockQuote(1993, 9.97));
    list.push(this.createStockQuote(1994, 1.33));
    list.push(this.createStockQuote(1995, 37.20));
    list.push(this.createStockQuote(1996, 22.68));
    list.push(this.createStockQuote(1997, 33.10));
    list.push(this.createStockQuote(1998, 28.34));
    list.push(this.createStockQuote(1999, 20.89));
    list.push(this.createStockQuote(2000, -9.03));
    list.push(this.createStockQuote(2001, -11.85));
    list.push(this.createStockQuote(2002, -21.97));
    list.push(this.createStockQuote(2003, 28.36));
    list.push(this.createStockQuote(2004, 10.74));
    list.push(this.createStockQuote(2005, 4.83));
    list.push(this.createStockQuote(2006, 15.61));
    list.push(this.createStockQuote(2007, 5.48));
    list.push(this.createStockQuote(2008, -36.55));
    list.push(this.createStockQuote(2009, 25.94));
    list.push(this.createStockQuote(2010, 14.82));
    list.push(this.createStockQuote(2011, 2.10));
    list.push(this.createStockQuote(2012, 15.89));
    list.push(this.createStockQuote(2013, 32.15));
    list.push(this.createStockQuote(2014, 13.52));
    list.push(this.createStockQuote(2015, 1.36));
    list.push(this.createStockQuote(2016, 11.74));
    return Observable.of(list);

  }

}
