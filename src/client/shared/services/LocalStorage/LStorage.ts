export const LStorageKeys = {
    ULTIMAS_UBICACIONES: 'ULTIMAS_UBICACIONES',
    ULTIMOS_SPOTS_VISTOS: 'ULTIMOS_SPOTS_VISTOS',
}

export class LStorage {
    static setItem(key: string, value: unknown) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    static getItem(key: string) {
        return JSON.parse(localStorage.getItem(key) || 'null');
    }

    static removeItem(key: string) {
        localStorage.removeItem(key);
    }
}