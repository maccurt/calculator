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
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [
    AppComponent,
    TestPadComponent
  ],
  imports: [BrowserModule, AppRouteModule,
    FutureValueRoutingModule, FutureValueModule,
    DirectivesModule, MathModule,
    FormsModule, BsDropdownModule.forRoot()],
  providers: [StockQuoteService],

  bootstrap: [AppComponent]
})
export class AppModule { }
