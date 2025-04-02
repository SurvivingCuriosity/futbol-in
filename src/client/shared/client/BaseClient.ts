import { BaseClientResponse, RequestConfig } from "./types/Client";

// Puedes conservar el tipo BaseClientResponse si lo deseas,
// aunque con esta forma podrías devolver un 'T' si 'res.ok'
// y lanzar un objeto con la data de error si 'res.ok' es false.
export class BaseClient {
  static defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };

  static async request<T>(
    url: string,
    config: RequestConfig = {}
  ): Promise<BaseClientResponse<T>> {
    const { method = "POST", headers, body } = config;

    const mergedHeaders = {
      ...this.defaultHeaders,
      ...headers,
    };

    const fetchConfig: RequestInit = {
      method,
      headers: mergedHeaders,
    };

    if (body !== undefined) {
      fetchConfig.body = JSON.stringify(body);
    }

    const res = await fetch(url, fetchConfig);

    let data: T;
    try {
      const jsonData = (await res.json()) as unknown;
      data = jsonData as T;
    } catch {
      // Si no es JSON o produce error, crea un objeto vacío
      data = {} as T;
    }

    // Construimos un objeto con info de la respuesta
    const response: BaseClientResponse<T> = {
      data,
      status: res.status,
      ok: res.ok,
    };

    // Si la respuesta NO es ok, lanzamos un objeto que contenga
    // toda la data (por ej. type, errors...) para manejarlo en el catch
    if (!res.ok) {
      throw {
        status: res.status,
        data, // Esto puede incluir { type: 'VALIDATION_ERROR', errors: [...] }, etc.
      };
    }

    // Si es ok, retornamos la data (o el objeto 'response' si lo prefieres)
    return response;
  }
}
