import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WeightListComponent } from './weight-list.component';
import { FormsModule } from '@angular/forms';
import { ResponsiveModule } from 'ng2-responsive';
import { WeightService } from 'app/weight-component/weight.service';
import { MathService } from 'app/math/math.service';
import { ISinkerWeightGroup } from 'app/weight-component/weight.types';
import { HttpClient } from 'selenium-webdriver/http';
import { Observable } from 'rxjs/Observable';

describe('WeightListComponent', () => {
    let component: WeightListComponent;
    let fixture: ComponentFixture<WeightListComponent>;
    let weightService: WeightService;

    let sinkerWeightGroupMock: ISinkerWeightGroup = {
        ounceList: [{ value: 0, text: 'All' }],
        sinkerTypeList: [{ value: 0, text: 'All' }],
        items: []
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WeightListComponent],
            providers: [WeightService, MathService, HttpClient],
            imports: [FormsModule, ResponsiveModule]
        })
            .compileComponents();
        weightService = TestBed.get(WeightService);
        spyOn(weightService, 'GetSinkerWeightGroup').and.returnValue(Observable.of(sinkerWeightGroupMock));
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WeightListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
