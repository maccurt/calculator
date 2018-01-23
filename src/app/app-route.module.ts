import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FutureValueComponent } from 'app/future-value/future-value.component';
import { BalanceSummaryComponent } from 'app/balance-summary/balance-summary.component';
import { TestPadComponent } from 'app/test-pad/test-pad.component';
import { WeightComponent } from 'app/weight-component/weight.component';
import { WeightListComponent } from 'app/weight-list/weight-list.component';
import { HomeComponent } from 'app/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'weight', component: WeightComponent },
  { path: 'weightList', component: WeightListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouteModule { }
