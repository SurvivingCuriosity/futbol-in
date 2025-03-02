export const LStorageKeys = {
    ULTIMA_UBICACION: 'ULTIMA_UBICACION'
}

export class LStorage {
    static setItem(key: string, value: unknown) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    static getItem(key: string) {
        return JSON.parse(localStorage.getItem(key) || '{}');
    }

    static removeItem(key: string) {
        localStorage.removeItem(key);
    }
}