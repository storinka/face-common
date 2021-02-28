import {Discount} from "./discounts";

export const currencySymbols: any = {
    UAH: "₴",
    USD: "$",
    RUB: "₽",
    BYN: "₽",
    PLN: "zł",
    EUR: "€",
}

export const currencyLocalizedNames: any = {
    UAH: {
        uk: "грн",
        ru: "грн",
    },
    RUB: {
        uk: "руб",
        ru: "руб",
    },
    BYN: {
        uk: "руб",
        ru: "руб",
    },
}

export function getCurrencySymbol(code: string, locale: string = "uk") {
    if (currencyLocalizedNames[code]) {
        if (currencyLocalizedNames[code][locale]) {
            return currencyLocalizedNames[code][locale];
        }
    }

    if (currencySymbols[code]) {
        return currencySymbols[code];
    }

    return code;
}

export function getPriceString(currency: string, price: number | string, locale: string = "uk") {
    if (currency === "USD" || currency === "EUR") {
        return `${getCurrencySymbol(currency, locale)}${price}`;
    }

    if (["UAH", "RUB", "BYN"].includes(currency)) {
        if (locale !== "uk" && locale !== "ru") {
            return `${getCurrencySymbol(currency, locale)}${price}`;
        }
    }

    return `${price} ${getCurrencySymbol(currency, locale)}`;
}

export function getPriceWithDiscount(price: number, discount: Discount): number {
    if (!discount) {
        return price;
    }

    let newPrice = price;

    if (discount.type === "percentage") {
        newPrice = price - (price * discount.value / 100);
    } else if (discount.type === "absolute" || discount.type === "diff") {
        newPrice = price - discount.value;
    } else if (discount.type === "value") {
        newPrice = discount.value;
    }

    if (discount.round === 0) {
        return Math.floor(newPrice);
    }

    if (discount.round === 1) {
        return Math.ceil(newPrice);
    }

    return newPrice;
}
