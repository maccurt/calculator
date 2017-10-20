import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FutureValueComponent } from './future-value.component';
import { FormsModule } from '@angular/forms';
import {FutureValueService} from '../future-value/future-value.service'
import { MathService } from 'app/math/math.service';

describe('FutureValueComponent', () => {
  let component: FutureValueComponent;
  let fixture: ComponentFixture<FutureValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FutureValueComponent ],
      imports:[FormsModule],
      providers:[FutureValueService,MathService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FutureValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
