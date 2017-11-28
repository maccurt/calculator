import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FutureValueComponent } from 'app/future-value/future-value.component';
import { FutureValueStockQouteComponent } from 'app/future-value/future-value-stock-qoute/future-value-stock-qoute.component';

const routes: Routes = [
  { path: 'futureValue', component: FutureValueComponent },
  { path: 'futureValueStockQoute', component: FutureValueStockQouteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FutureValueRoutingModule { }
