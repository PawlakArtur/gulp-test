var SPENDING_THRESHOLD = 200;
var TAX_RATE = 0.08;
var PHONE_PRICE = 99.99;
var ACCESSORY_PRICE = 9.99;
var CANT_AFFORD_MSG = "You can't afford this purchase.";
var BUY_PHONE_MSG = "Buying a phone";
var BUY_ACCESSORY_MSG = "Buying accessory";
var bankBalance = 393.91;
var initialAmount = 0;
var calculateTAX;
var formatAmount;
var performPurchase;
calculateTAX = function (amount, tax) {
    return amount * tax;
};
formatAmount = function (amount) {
    var temString = String(amount.toFixed(2));
    return "$" + temString;
};
performPurchase = function (balance, amount) {
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
    if (amount > balance) {
        return CANT_AFFORD_MSG;
    }
};
console.log(performPurchase(bankBalance, initialAmount));
