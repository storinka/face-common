// WIP

export type CartOptions = {
    cafe_id: number;

    type: "delivery" | "takeout";
    payment_type: "online" | "terminal" | "cash";

    customer_name: string;
    customer_phone: string;
    customer_message?: string;

    delivery_address?: DeliveryAddress;
    takeout_address_id?: number;
}

export class DeliveryAddress {
    constructor(
        public short?: string,
        public details?: string,
        public lat?: number,
        public lng?: number,
    ) {
    }
}

export class CartSubItem {
    public item_type: string;
    public item_id: number;
    public quantity: number;

    constructor(
        item_type: string,
        item_id: number,
        quantity: number = 1,
    ) {
        this.item_type = item_type;
        this.item_id = item_id;
        this.quantity = quantity;
    }

    increment() {
        this.quantity++;
    }

    decrement() {
        if (this.quantity > 1) {
            this.quantity--;
        }
    }
}

export class CartItem {
    public item_type: string;
    public item_id: number;
    public quantity: number;
    public subitems: Array<CartSubItem>;

    constructor(
        item_type: string,
        item_id: number,
        quantity: number = 1,
        subitems: Array<CartSubItem>,
    ) {
        this.item_type = item_type;
        this.item_id = item_id;
        this.quantity = quantity;
        this.subitems = subitems;
    }

    increment() {
        this.quantity++;
    }

    decrement() {
        if (this.quantity > 1) {
            this.quantity--;
        }
    }
}

export class Cart {
    public cafe_id: number;

    public type: string;
    public payment_type: string;

    public customer_name: string;
    public customer_phone: string;
    public customer_message?: string;

    public delivery_address?: DeliveryAddress;
    public takeout_address_id?: number;

    public items: Array<CartItem>;

    constructor(options: CartOptions) {
        this.cafe_id = options.cafe_id;

        this.type = options.type;
        this.payment_type = options.payment_type;

        this.customer_name = options.customer_name;
        this.customer_phone = options.customer_phone;
        this.customer_message = options.customer_message;

        if (this.type === "delivery") {
            if (options.delivery_address) {
                this.delivery_address = options.delivery_address;
            } else {
                this.delivery_address = new DeliveryAddress();
            }
        }
        if (this.type === "takeout") {
            this.takeout_address_id = options.takeout_address_id;
        }

        this.items = [];
    }

    public pushItem(newItem: CartItem): void {
        const itemInCart = this.items
            .find(item => item.item_type === newItem.item_type && item.item_id === newItem.item_id);

        if (itemInCart) {
            itemInCart.increment();
        } else {
            this.items = [...this.items, newItem];
        }
    }
}
