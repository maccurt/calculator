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
  
  export interface ISinkerWeightGroupItem {
    title: string;
    results: ISinkerWeight[];
  }
  
  export interface ISinkerWeightGroup {
    ounceList: number[];
    items: ISinkerWeightGroupItem[]
  }