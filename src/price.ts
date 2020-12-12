export const currencySymbols: any = {
    UAH: "₴",
    USD: "$",
    RUB: "₽",
    BYN: "₽",
    PLN: "zł",
    EUR: "€",
}

export function cc2n(code: string, locale: string = "uk") {
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

export function getPriceString(currency: string, price: string, locale: string = "uk") {
    if (currency === "USD" || currency === "EUR") {
        return `${cc2n(currency)} ${price}`;
    }

    if (["UAH", "RUB", "BYN"].includes(currency)) {
        if (locale !== "uk" && locale !== "ru") {
            return `${cc2n(currency)} ${price}`;
        }
    }

    return `${price} ${cc2n(currency)}`;
}
