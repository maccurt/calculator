    import { TestBed, inject } from '@angular/core/testing';

import { MathService } from './math.service';

const mathService = new MathService();
describe('MathService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MathService]
    });
  });

  it('should be created', inject([MathService], (service: MathService) => {
    expect(service).toBeTruthy();
  }));

  describe('round', () => {

    it('1.224 rounded to 2 digits should be 1.24', () => {
      const result = mathService.round(1.244, 2);
      expect(result).toBe(1.24);
    });

    it('1.225 rounded to 2 digits should be 1.25', () => {
      const result = mathService.round(1.245, 2);
      expect(result).toBe(1.25);
    });
  });
});
