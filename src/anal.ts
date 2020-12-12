const pushed = {
    cafes_pushed: [],
    open_contacts_pushed: [],
    open_info_pushed: [],
    menus_pushed: [],
    dishes_pushed: [],
    categories_pushed: [],
};

export const itys = {
    "open-cafe": 100,
    "open-contacts": 101,
    "open-info": 102,
    "open-click-in-header": 103,

    "open-menu": 200,

    "open-category": 300,
    "open-swipe-category": 301,

    "open-dish": 400,
    "open-dish-from-search": 400,
};

function guid() {
    const u = Date.now().toString(16) + Math.random().toString(16) + "0".repeat(16);
    return [u.substr(0, 8), u.substr(8, 4), "4000-8" + u.substr(13, 3), u.substr(16, 12)].join("-");
}

function bloau(str: string) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode(Number(`0x${p1}`));
        }));
}

function atobu(str: string) {
    return decodeURIComponent(atob(str).split("").map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(""));
}

const noAnal = /[?&]no_anal/.test(window.location.search) || process.env.DISABLE_ANAL || localStorage.getItem("__no_anal");

if (noAnal) {
    localStorage.setItem("__no_anal", "on");
}

export function analTID() {
    let tid = localStorage.getItem("__anal_tid");

    const recreate = () => {
        tid = guid();
        localStorage.setItem("__anal_tid", bloau(tid));
    };

    if (!tid) {
        recreate();
    } else {
        try {
            tid = atobu(tid);
        } catch (e) {
            recreate();
        }

        if (!tid.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)) {
            recreate();
        }
    }

    return tid;
}

export function anal(ity: number, iid: number, params = {}) {
    if (noAnal) {
        return Promise.reject(new Error("no anal"));
    }

    try {
        const tid = analTID();

        return fetch(`${process.env.REACT_APP_ANAL_URL || process.env.VUE_APP_ANAL_URL}/${1}/push`, {
            method: "PATCH",
            body: JSON.stringify({
                tid,
                ity,
                iid,
                ...params,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (e) {
        return Promise.reject(e);
    }
}

function analReportOpenCafe(id: number) {
    return anal(100, id);
}

function analReportOpenContacts(id: number) {
    return anal(101, id);
}

function analReportOpenInfo(id: number) {
    return anal(102, id);
}

export function analReportOpenMenu(id: number) {
    return anal(200, id);
}

export function analReportOpenCategory(id: number) {
    return anal(300, id);
}

export function analReportSwipeCategory(id: number) {
    return anal(301, id);
}

export function analReportOpenDish(id: number) {
    return anal(400, id);
}

export function analReportOpenDishFromSearch(id: number) {
    return anal(401, id);
}

export function reportDishWasOpen({dish, fromSearch}: { dish: any, fromSearch: boolean }) {
    // @ts-ignore
    if (dish && pushed.dishes_pushed.indexOf(dish.hash_id) < 0) {
        // @ts-ignore
        pushed.dishes_pushed = [...pushed.dishes_pushed, dish.hash_id];

        if (fromSearch) {
            return analReportOpenDishFromSearch(dish.hash_id);
        } else {
            return analReportOpenDish(dish.hash_id);
        }
    }
}

export function reportCategoryWasOpen({category, swipe = false}: { category: any, swipe: boolean }) {
    // @ts-ignore
    if (category && pushed.categories_pushed.indexOf(category.hash_id) < 0) {
        // @ts-ignore
        pushed.categories_pushed = [...pushed.categories_pushed, category.hash_id];

        if (swipe) {
            return analReportSwipeCategory(category.hash_id);
        } else {
            return analReportOpenCategory(category.hash_id);
        }
    }
}

export function reportMenuWasOpen({menu}: { menu: any }) {
    // @ts-ignore
    if (menu && pushed.menus_pushed.indexOf(menu.hash_id) < 0) {
        // @ts-ignore
        pushed.menus_pushed = [...pushed.menus_pushed, menu.hash_id];

        return analReportOpenMenu(menu.hash_id);
    }
}

export function reportCafeWasOpen({cafe}: { cafe: any }) {
    // @ts-ignore
    if (cafe && pushed.cafes_pushed.indexOf(cafe.hash_id) < 0) {
        // @ts-ignore
        pushed.cafes_pushed = [...pushed.cafes_pushed, cafe.hash_id];

        return analReportOpenCafe(cafe.hash_id);
    }
}

export function reportInfoWasOpen({cafe}: { cafe: any }) {
    // @ts-ignore
    if (cafe && pushed.open_info_pushed.indexOf(cafe.hash_id) < 0) {
        // @ts-ignore
        pushed.open_info_pushed = [...pushed.open_info_pushed, cafe.hash_id];

        return analReportOpenInfo(cafe.hash_id);
    }
}

export function reportContactsWasOpen({cafe}: { cafe: any }) {
    // @ts-ignore
    if (cafe && pushed.open_contacts_pushed.indexOf(cafe.hash_id) < 0) {
        // @ts-ignore
        pushed.open_contacts_pushed = [...pushed.open_contacts_pushed, cafe.hash_id];

        return analReportOpenContacts(cafe.hash_id);
    }
}
