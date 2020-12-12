import CyrillicToTranslit from "cyrillic-to-translit-js";

export function searchInCafe(query: string, cafe: any): Array<any> {
    if (query.trim() === "" || !cafe) {
        return [];
    }

    const cyrillic = cafe.locale === "uk" || cafe.locale === "ru";
    const translit = cyrillic ? new CyrillicToTranslit({preset: cafe.locale}) : new CyrillicToTranslit();

    const queryLower = query.toLowerCase();
    const queryTranslit = translit.transform(queryLower);
    const queryTranslitReverse = translit.reverse(queryLower);

    const allCategories = cafe.menus.flatMap((menu: any) => menu.categories);

    const searchByCategories = allCategories.filter((category: any) => {
        const lower = category.name.toLowerCase();

        return lower.includes(queryLower) || lower.includes(queryTranslit) || lower.includes(queryTranslitReverse);
    });

    const searchByCategoriesIds = searchByCategories.map((category: any) => category.hash_id);

    const searchByCategoriesNon = allCategories.filter((category: any) => {
        return !searchByCategoriesIds.includes(category.hash_id);
    });

    const searchDishes = searchByCategoriesNon.map((category: any) => {
        return {
            ...category,
            dishes: category.dishes.filter((dish: any) => {
                const lower = dish.name.toLowerCase();

                return lower.includes(queryLower) || lower.includes(queryTranslit) || lower.includes(queryTranslitReverse);
            }),
        };
    }).filter((category: any) => category.dishes.length > 0);

    return [...searchByCategories, ...searchDishes];
}
