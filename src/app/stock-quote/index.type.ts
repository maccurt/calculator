export interface IIndex {
   id:number;
   name:string;
   qoutes?:IStockQuote[]
}

export interface IStockQuote {
    year: number;
    rateOfReturn: number;
  }