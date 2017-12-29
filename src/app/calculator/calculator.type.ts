import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

export class Calculator {
    constructor(router: Router, activatedRoute: ActivatedRoute) {

        // router.routeReuseStrategy.shouldReuseRoute = function () {
        //     return false;
        // };

        // router.events.subscribe((evt) => {
        //     if (evt instanceof NavigationEnd) {
        //         router.navigated = false;
        //         window.scrollTo(0, 0);
        //     }
        // });
    }

    initRoute = ()=> {
        
    }

    getNumericParms = (params: any, parmName: string): number => {
        let value = null;

        if (params[parmName] && !isNaN(params[parmName])) {
            value = params[parmName];
        }
        return value;
    }
}