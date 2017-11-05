import { Injectable } from '@angular/core';

@Injectable()
export class MathService {

  constructor() {  }

  round = (value: number, digits: number): number => {
    const i = Math.pow(10, digits);
    return Math.round(value * i) / i;
  }

}
