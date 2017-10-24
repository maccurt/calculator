import { Directive, ElementRef, OnInit, Input } from '@angular/core';

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

    @Input() max: number;
    @Input() decimals: number;
    keyDownValue = '';

    constructor(private el: ElementRef) { }

    ngOnInit(): void {

        if (isNaN(this.decimals)) {
            this.decimals = 0
        }
        else {
            this.decimals = Math.abs(Math.floor(this.decimals));
        }
    }

    paste = (event: Event): void => {

        event.preventDefault();
    }

    keyUp = (event: KeyboardEvent): void => {

        if (!isNaN(this.max)) {
            if (!isNaN(this.el.nativeElement.value)) {
                var num = Number(this.el.nativeElement.value)

                if (num > this.max) {
                    this.el.nativeElement.value = this.keyDownValue;
                }
            }
        }
    };

    keyDown = (event: KeyboardEvent): void => {
        this.keyDownValue = this.el.nativeElement.value;
        // console.log('value length', this.el.nativeElement.value.length)
        // console.log('selection start', this.el.nativeElement.selectionStart)
    };

    checkInput = (event: KeyboardEvent): void => {

        var value: string = this.el.nativeElement.value;

        let inputChar = String.fromCharCode(event.charCode);
        // TODO you were allowing negatived you don't need know, so removed
        // const pattern = /[0-9\.\-\ ]/;

        var pattern = /[0-9\.\ ]/;
        if (this.decimals === 0) {
            pattern = /[0-9\ ]/;
        }


        if (!pattern.test(inputChar)) {
            // invalid character, prevent input
            event.preventDefault();
            return;
        }

        //don't allow multiple decimals
        if (value.indexOf('.') >= 0 && event.key === '.') {
            event.preventDefault();
            return;
        }
    };
}