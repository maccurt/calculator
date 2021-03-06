import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRouteModule } from './app-route.module';
import { FutureValueRoutingModule } from './future-value/future-value-routing.module';
import { FutureValueModule } from 'app/future-value/future-value.module';
import { DirectivesModule } from './directives/directives.module';
import { MathModule } from './math/math.module';
import { StockQuoteService } from './stock-quote/stock-quote.service';
import { BalanceSummaryComponent } from './balance-summary/balance-summary.component';
import { TestPadComponent } from './test-pad/test-pad.component';
import { WeightComponent } from './weight-component/weight.component';
import { Routes } from '@angular/router';
import { FutureValueStockQouteComponent } from 'app/future-value/future-value-stock-qoute/future-value-stock-qoute.component';
import { IndexListResolver } from 'app/stock-quote/index-list.resolver';
import { HttpClientModule } from '@angular/common/http';
import { JsonpModule } from '@angular/http';
import { WeightService } from 'app/weight-component/weight.service';
import { WeightListComponent } from './weight-list/weight-list.component';
import { ScrollToModule } from 'ng2-scroll-to';
import { HomeComponent } from './home/home.component';
import { ResponsiveModule } from 'ng2-responsive';

const routes: Routes = [
  { path: 'weight', component: WeightComponent },
  { path: 'futureValueStockQoute', component: FutureValueStockQouteComponent, resolve: { indexList: IndexListResolver } }
];

@NgModule({
  declarations: [
    AppComponent,
    TestPadComponent,
    WeightComponent,
    WeightListComponent,
    HomeComponent
  ],
  imports: [BrowserModule, AppRouteModule,
    FutureValueRoutingModule, FutureValueModule,
    DirectivesModule, MathModule, ResponsiveModule,
    FormsModule,
    HttpClientModule, JsonpModule,
    ScrollToModule.forRoot()],
  providers: [StockQuoteService, WeightService],

  bootstrap: [AppComponent]
})
export class AppModule { }
