
const baseUrl = import.meta.env.VITE_BACKEND_URL;

export function apiUrl(path: string) {
    return new URL(path, baseUrl);
}
