import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRouteModule } from './app-route.module';
import { FutureValueRoutingModule } from './future-value/future-value-routing.module';
import { FutureValueModule } from 'app/future-value/future-value.module';
import { DirectivesModule } from './directives/directives.module';
import { MathModule } from './math/math.module';
import { StockQuoteService } from './stock-quote/stock-quote.service';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [BrowserModule, AppRouteModule, FutureValueRoutingModule, FutureValueModule,
    DirectivesModule, MathModule],
  providers: [StockQuoteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
