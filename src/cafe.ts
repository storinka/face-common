import localZorage from "./localZorage";

interface GetCafeFromCacheParams {
    id: string;
    updateVersion?: number;
    coreVersion?: number;
    locale?: string;
}

export function getCafeFromCache({id, updateVersion, coreVersion, locale}: GetCafeFromCacheParams) {
    const cafe = localZorage.getItem(`strkcfhid_${id}`);

    if (cafe) {
        if (cafe.update_version == null || cafe.__core_version == null) {
            return null;
        }

        if (updateVersion != null) {
            if (cafe.update_version != updateVersion) {
                return null;
            }
        }

        if (coreVersion != null) {
            if (cafe.__core_version != coreVersion) {
                return null;
            }
        }

        if (locale != null) {
            if (cafe.locale != locale) {
                return null;
            }
        }
    }

    return cafe;
}

export function saveCafeToCache(cafe: any, coreVersion?: number) {
    if (cafe) {
        cafe.__core_version = coreVersion;

        localZorage.setItem(`strkcfhid_${cafe.hash_id}`, cafe);

        if (cafe.slug) {
            localZorage.setItem(`strkcfhid_${cafe.slug}`, cafe);
        }
    }
}

export function removeCafeFromCache(id: string) {
    return localZorage.removeItem(`strkcfhid_${id}`);
}
