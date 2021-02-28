export interface Discount {
    type: string;
    value: number;
    round: number;
    included_menus: number[];
    included_menu_categories: number[];
    excluded_menu_categories: number[];
    included_dishes: number[];
    excluded_dishes: number[];
}

export function getMenuDiscount(menuId: any, discounts: Discount[]) {
    if (!menuId) {
        return null;
    }

    return discounts.find(discount => discount.included_menus.includes(menuId));
}

export function getCategoryDiscount(
    categoryId: number,
    discounts: Discount[],
    menuDiscount: Discount | null = null
) {
    if (!categoryId) {
        return null;
    }

    if (menuDiscount) {
        if (!menuDiscount.excluded_menu_categories.includes(categoryId)) {
            return menuDiscount;
        }
    }

    return discounts.find(discount => {
        const includedInCategories = discount.included_menu_categories.includes(categoryId);
        const excludedInCategories = discount.excluded_menu_categories.includes(categoryId);

        if (includedInCategories && !excludedInCategories) {
            return true;
        }
    });
}

export function getDishDiscount(
    dishId: number,
    discounts: Discount[],
    categoryDiscount: Discount | null = null
) {
    if (!dishId) {
        return null;
    }

    if (categoryDiscount) {
        if (!categoryDiscount.excluded_dishes.includes(dishId)) {
            return categoryDiscount;
        }
    }

    return discounts.find(discount => {
        const includedInDishes = discount.included_dishes.includes(dishId);
        const excludedInDishes = discount.excluded_dishes.includes(dishId);

        if (includedInDishes && !excludedInDishes) {
            return true;
        }
    });
}
