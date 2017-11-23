export interface IBalanceSummary {
    detailItems: Array<IBalanceDetailItem>;
    principal: number;
    interest: number;
    balance: number;
    paymentTotal: number;
    rateOfReturn: number;
}

export interface IBalanceDetailItem {
    period: number;
    beginBalance: number;
    periodPayment: number;
    yearPaymentTotal: number;
    ratePercent: number;
    paymentTotal: number;
    interest: number;
    interestTotal: number;
    endBalance: number;
    balanceSummary: IBalanceSummary;
}

export class BalanceSummary implements IBalanceSummary {
    detailItems: Array<IBalanceDetailItem>;
    rateOfReturn = 0; //TODO should this come in the constructor
    constructor(public principal: number, public paymentTotal: number, public interest: number, public balance: number) {
        this.detailItems = [];
    }
}


export class BalanceDetailItem implements IBalanceDetailItem {
    balanceSummary: IBalanceSummary; //This is the parent for the detail item. TODO should it be in the constructor?
    constructor(
        public period: number,
        public beginBalance: number,
        public periodPayment: number,
        public yearPaymentTotal: number,
        public ratePercent: number,
        public paymentTotal: number,
        public interest: number,
        public interestTotal: number,
        public endBalance: number

    ) { }
}
