import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FutureValueComponent } from 'app/future-value/future-value.component';
import { FutureValueStockQouteComponent } from 'app/future-value/future-value-stock-qoute/future-value-stock-qoute.component';
import { IndexListResolver } from '../stock-quote/index-list.resolver';
const routes: Routes = [
  { path: 'futureValue', component: FutureValueComponent },
  {
    path: 'futureValueStockQoute', component: FutureValueStockQouteComponent, resolve: { indexList: IndexListResolver },
  },
  { path: 'futureValueStockQoute/:mode', component: FutureValueStockQouteComponent, resolve: { indexList: IndexListResolver } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FutureValueRoutingModule { }
