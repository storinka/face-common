// Adds prefix to given key.
// Use this when you need to store some info for 1 cafe and not share with other cafes.
export function getStorageKeyForCafe(key: string, cafeId: number) {
    return `__strk_${cafeId}_${key}`;
}

const localZorage = {
    setItem(key: string, value: any) {
        if (typeof value === "object") {
            localStorage.setItem(key, JSON.stringify(value));
        } else {
            localStorage.setItem(key, value);
        }
    },
    getItem(key: string) {
        const val = localStorage.getItem(key);

        if (val && (val.startsWith("{") || val.startsWith("["))) {
            return JSON.parse(val);
        }

        return val;
    },
    removeItem(key: string) {
        return localStorage.removeItem(key);
    },
    clear() {
        return localStorage.clear();
    },
};

export default localZorage;
