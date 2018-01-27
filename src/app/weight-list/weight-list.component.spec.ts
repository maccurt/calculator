import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WeightListComponent } from './weight-list.component';
import { FormsModule } from '@angular/forms';
import { ResponsiveModule } from 'ng2-responsive';
import { WeightService } from 'app/weight-component/weight.service';
import { MathService } from 'app/math/math.service';
import { ISinkerWeightGroup } from 'app/weight-component/weight.types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpClientModule } from '@angular/common/http';

describe('WeightListComponent', () => {
    let component: WeightListComponent;
    let fixture: ComponentFixture<WeightListComponent>;
    let weightService: WeightService;

    const sinkerWeightGroupMock: ISinkerWeightGroup = {
        ounceList: [{ value: 0, text: 'All' }],
        sinkerTypeList: [{ value: 0, text: 'All' }],
        items: [
            {
                title: 'Bank Sinkers',
                results: [{
                    itemId: '182019926630',                    
                    title: '#20 OZ. BANK 20 PCS. LEAD BANK SINKERS FAST SHIPPING 1 DAY',
                    price: 48.95,
                    isFreeShipping: true,
                    include: true,
                    ounce: 20,
                    quantity: 20,
                    // tslint:disable-next-line:max-line-length
                    url: 'http://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=2&toolid=10044&campid=5337817519&customid=1&lgeo=1&vectorid=229466&item=182019926630',
                    postalCode: '02908',
                    location: 'Providence,RI,USA',
                    costPerOunce: 0.12
                }]
            }
        ]
    };


    const mock =


        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [WeightListComponent],
                providers: [WeightService, MathService, HttpClient],
                imports: [FormsModule, ResponsiveModule, HttpClientModule]
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
