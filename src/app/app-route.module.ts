import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FutureValueComponent } from 'app/future-value/future-value.component';
import { BalanceSummaryComponent } from 'app/balance-summary/balance-summary.component';
import { TestPadComponent } from 'app/test-pad/test-pad.component';

const routes: Routes = [
  { path: '', component: FutureValueComponent },
  { path: 'test', component: TestPadComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouteModule { }
