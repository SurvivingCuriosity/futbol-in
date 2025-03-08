import { BaseClientResponse, RequestConfig } from "./types/Client";

export class BaseClient {
  static defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };

  static async request<T>(
    url: string,
    config: RequestConfig = {}
  ): Promise<BaseClientResponse<T>> {
    const { method = "GET", headers, body } = config;

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
      // Si no es JSON o produce error, crea un objeto vacío o maneja el caso
      data = {} as T;
    }

    const response: BaseClientResponse<T> = {
      data,
      status: res.status,
      ok: res.ok,
    };

    if (!res.ok) {
      const errorCandidate = (data as unknown as { error?: string }).error;
      response.error = errorCandidate || "Request failed";
    }

    return response;
  }
}
