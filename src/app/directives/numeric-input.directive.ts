import { Directive, ElementRef, OnInit, Input } from '@angular/core';
import { validateConfig } from '@angular/router/src/config';

@Directive({
    selector: '[numeric-input]',
    host: {
        '(keypress)': 'checkInput($event)',
        '(keyup)': 'keyUp($event)',
        '(keydown)': 'keyDown($event)',
        '(paste)': 'paste($event)',
    }
})
export class NumericInputDirective implements OnInit {

    @Input() min = 0;
    @Input() max: number;
    @Input() decimals: number;
    keyDownValue = '';

    constructor(private el: ElementRef) { }

    ngOnInit(): void {

        if (isNaN(this.decimals)) {
            this.decimals = 0;
        }
        else {
            this.decimals = Math.abs(Math.floor(this.decimals));
        }
    }

    paste = (event: Event): void => {

        event.preventDefault();
    }

    keyDown = (event: KeyboardEvent): void => {
        //Prevent the arrow down or up from changing the numeric input type from 
        //changing the numer
        if (event.keyCode === 40 || event.keyCode === 38){        
            event.preventDefault();
            return;
        }
        this.keyDownValue = this.el.nativeElement.value;
        console.log('keyDown',event)
    }
    keyUp = (event: KeyboardEvent): void => {
    
        const inputValue = this.el.nativeElement.value;

        if (!isNaN(this.max)) {
            if (!isNaN(inputValue)) {
                const num = Number(inputValue);

                if (num > this.max) {
                    this.el.nativeElement.value = this.keyDownValue;
                }
            }
        }

        //Dont allow negative but in first position
        if (inputValue.indexOf('-') > 0) {
            this.el.nativeElement.value = this.keyDownValue;
        }

    }



    //TODO move this to a serive
    checkNumericKey = (allowNegative: boolean, allowDecimalPrecision: boolean, character: string): boolean => {

        if (!allowNegative && allowDecimalPrecision) {
            return /[0-9\.\ ]/.test(character);
        }

        if (allowNegative && allowDecimalPrecision) {
            return /[0-9\.\-\ ]/.test(character);
        }

        return /[0-9]/.test(character);
    }

    checkInput = (event: KeyboardEvent): void => {


        const value: string = this.el.nativeElement.value;
        const inputChar = String.fromCharCode(event.charCode);


        //Do not allow characters that don't represnt numbers
        //Can this logic be only calculated one and made testable
        const allowNegative = this.min < -0;
        const allowDecimalPrecision = this.decimals > 0;
        if (!this.checkNumericKey(allowNegative, allowDecimalPrecision, inputChar)) {
            event.preventDefault();
            return;
        }

        //don't allow multiple decimals
        if (value.indexOf('.') >= 0 && event.key === '.') {
            event.preventDefault();
            return;
        }

        //don't allow multiple negative sigh
        if (value.indexOf('-') >= 0 && event.key === '-') {
            event.preventDefault();
            return;
        }
    }

    //TODO this might not be needed and/or could be in a servide
    getPattern = (allowNegative: boolean, allowDecimalPrecision: boolean): RegExp => {

        if (!allowDecimalPrecision && !allowNegative) {
            return new RegExp(/[0-9\ ]/);
        }

        if (allowNegative && allowDecimalPrecision) {
            return new RegExp(/^-?[0-9]?\d*(\.\d+)?$/);
        }

        return new RegExp(/[0-9\.\ ]/);

    }
}
