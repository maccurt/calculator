import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { FutureValueRoutingModule } from './future-value-routing.module';
import { FutureValueComponent } from './future-value.component';
import { DirectivesModule } from '../directives/directives.module';
import { FutureValueService } from './future-value.service'
import { MathService } from '../math/math.service';
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import * as highcharts from 'highcharts'
import { BalanceSummaryComponent } from 'app/balance-summary/balance-summary.component';

export function highchartsFactory() {
  highcharts.setOptions({
    lang: {
      thousandsSep: ','
    }
  })
  return highcharts;
}

@NgModule({
  imports: [CommonModule, FutureValueRoutingModule,
    FormsModule, DirectivesModule, ChartModule],
  declarations: [FutureValueComponent, BalanceSummaryComponent],
  providers: [FutureValueService, MathService, {
    provide: HighchartsStatic,
    useFactory: highchartsFactory
  }],
  exports: [BalanceSummaryComponent]

})
export class FutureValueModule { }
