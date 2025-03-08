export interface RequestConfig {
    method?: string;
    headers?: Record<string, string>;
    body?: unknown;
  }
  
  export interface BaseClientResponse<T> {
    data: T;
    status: number;
    ok: boolean;
    error?: string;
  }