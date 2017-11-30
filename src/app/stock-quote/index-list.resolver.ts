import { Injectable } from '@angular/core/';
import { Resolve } from '@angular/router/';
import { StockQuoteService } from 'app/stock-quote/stock-quote.service';
import { IIndex } from 'app/stock-quote/index.type';

@Injectable()
export class IndexListResolver implements Resolve<IIndex[]> {
    constructor(private stockQuoteService: StockQuoteService) {

    }
    resolve() {
        return this.stockQuoteService.getIndexes();
    }
}