import {defineComponent, h} from "vue";
import {getPriceString, getPriceWithDiscount} from "../price";
import {Discount} from "../discounts";

const Price = defineComponent({
    props: {
        price: {
            type: Number,
            required: true,
        },
        currency: {
            type: String,
            required: true,
        },
        locale: {
            type: String,
            required: true,
        },
        discount: {
            type: Object,
            required: false,
        },
        map: {
            type: Function,
            default: (price: number) => price,
        },
    },
    computed: {
        priceWithDiscount(): number {
            if (this.discount) {
                return this.map(getPriceWithDiscount(this.price, this.discount as Discount));
            }

            return this.map(this.price);
        },
        priceWithCurrency(): string {
            return getPriceString(this.currency, this.priceWithDiscount, this.locale);
        },
    },
    render() {
        if (this.discount) {
            return [
                h("span", {
                    style: {
                        textDecoration: "line-through",
                        fontSize: "0.8rem"
                    }
                }, this.map(this.price)),
                " ",
                this.priceWithCurrency
            ]
        } else {
            return this.priceWithCurrency;
        }
    }
});

export default Price;
