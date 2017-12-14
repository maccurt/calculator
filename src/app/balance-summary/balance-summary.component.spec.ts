import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgForm, AbstractControl, FormsModule } from '@angular/forms';
import { BalanceSummaryComponent } from './balance-summary.component';
import { NumericInputDirective } from 'app/directives/numeric-input.directive';
import { DirectivesModule } from 'app/directives/directives.module';
import { FutureValueService } from 'app/future-value/future-value.service';
import { MathService } from 'app/math/math.service';
import { ResponsiveModule } from 'ng2-responsive';

describe('BalanceSummaryComponent', () => {
  let component: BalanceSummaryComponent;
  let fixture: ComponentFixture<BalanceSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BalanceSummaryComponent],
      imports: [FormsModule, DirectivesModule, ResponsiveModule],
      providers: [FutureValueService, MathService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // describe('updateDetail', () => {
  //   it('should behave...', () => {
  //     component.updateDetail();
  //   });
  // });

});
