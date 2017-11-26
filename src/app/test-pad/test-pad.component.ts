import { Component, OnInit } from '@angular/core';
import { BalanceSummary } from 'app/future-value/IBalanceSummary.type';
import { FutureValueService } from 'app/future-value/future-value.service';

@Component({
  selector: 'app-test-pad',
  templateUrl: './test-pad.component.html',
  styleUrls: ['./test-pad.component.less']
})
export class TestPadComponent implements OnInit {
  balanceSummary: BalanceSummary;
  constructor(public futureValueSerive: FutureValueService) { }

  ngOnInit() {
    this.balanceSummary = this.futureValueSerive.monthlyPaymentsBalanceSummary(12, 20, 250);
  }

}
