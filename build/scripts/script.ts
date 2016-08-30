const SPENDING_THRESHOLD:number = 200;
const TAX_RATE:number = 0.08;
const PHONE_PRICE:number = 99.99;
const ACCESSORY_PRICE:number = 9.99;

const CANT_AFFORD_MSG:string = "You can't afford this purchase.";
const BUY_PHONE_MSG:string = "Buying a phone";
const BUY_ACCESSORY_MSG:string = "Buying accessory";

var bankBalance:number = 393.91;
var initialAmount:number = 0;

var calculateTAX: (amount:number, tax:number) => number;
var formatAmount: (amount:number) => string;
var performPurchase: (balance:number, amount:number) => string;

calculateTAX = function (amount:number, tax:number) {
    return amount * tax;
}

formatAmount = function (amount:number) {
    let temString:string = String(amount.toFixed(2));
    return "$" + temString;
}

performPurchase = function (balance:number, amount:number) {
    while (amount < balance) {
        amount = amount + PHONE_PRICE;
        console.log(BUY_PHONE_MSG);
        if (amount < SPENDING_THRESHOLD) {
            amount = amount + ACCESSORY_PRICE;
            console.log(BUY_ACCESSORY_MSG);
        }
    }
    amount = amount + calculateTAX(amount, TAX_RATE);
    console.log("Your purchase: " + formatAmount(amount));
    if(amount > balance) {
        return CANT_AFFORD_MSG;
    }
}

console.log(performPurchase(bankBalance, initialAmount));