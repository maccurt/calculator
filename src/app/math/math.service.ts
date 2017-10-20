import { Injectable } from '@angular/core';

@Injectable()
export class MathService {

  constructor() {

  }

  round = (value: number, digits: number): number => {
    var i = Math.pow(10, digits);
    return Math.round(value * i) / i;
  }

}
