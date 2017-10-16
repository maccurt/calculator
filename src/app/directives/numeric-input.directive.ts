import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
    selector: '[numeric-input]',
    host: { 
        '(keypress)': 'checkInput($event)',
        '(paste)': 'paste($event)',
        }
})
export class NumericInputDirective implements OnInit {

    constructor(private el: ElementRef) {
        console.log('constructor');
    }

    ngOnInit(): void {
        console.log('ngOnInit');
    }

    paste = (event:Event):void => {
        console.log('paste event');
        event.preventDefault();
        
    }
    checkInput = (event: KeyboardEvent): void => {
        console.clear()
        console.log(event);
        console.log(this.el.nativeElement.value)
        var value: string = this.el.nativeElement.value;

        let inputChar = String.fromCharCode(event.charCode);

        const pattern = /[0-9\.\-\ ]/;
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
    }
}