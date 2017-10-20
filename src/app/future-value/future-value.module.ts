import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { FutureValueRoutingModule } from './future-value-routing.module';
import { FutureValueComponent } from './future-value.component';
import { DirectivesModule } from '../directives/directives.module';
import { FutureValueService } from './future-value.service'
import { MathService } from '../math/math.service'

@NgModule({
  imports: [CommonModule, FutureValueRoutingModule, FormsModule, DirectivesModule],
  declarations: [FutureValueComponent],
  providers: [FutureValueService, MathService]
})
export class FutureValueModule { }
