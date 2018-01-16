import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WeightComponent } from './weight.component';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MathService } from 'app/math/math.service';
import { WeightService } from 'app/weight-component/weight.service';


describe('WeightComponentComponent', () => {
  let component: WeightComponent;
  let fixture: ComponentFixture<WeightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WeightComponent],
      providers: [MathService,WeightService],
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
