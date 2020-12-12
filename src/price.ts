export const currencySymbols: any = {
    UAH: "₴",
    USD: "$",
    RUB: "₽",
    BYN: "₽",
    PLN: "zł",
    EUR: "€",
}

export function getCurrencySymbol(code: string, locale: string = "uk") {
    if (locale === "uk" || locale === "ru") {
        if (code === "UAH") {
            return "грн";
        } else if (code === "RUB" || code === "BYN") {
            return "руб";
        }
    }

    if (currencySymbols[code]) {
        return currencySymbols[code];
    }

    return "XXX";
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


export function getPriceWithDiscount(price: number, discount: any): number {
    if (!discount) {
        return price;
    }

    if (discount.type === "percentage") {
        const newPrice = price - price * discount.value / 100;

        if (discount.round === 0) {
            return Math.floor(newPrice);
        }

        if (discount.round === 1) {
            return Math.ceil(newPrice);
        }

        return newPrice;
    }

    return price - discount.value;
}
