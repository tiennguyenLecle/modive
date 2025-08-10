type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: any;
};

export class BaseApiClient {
  protected baseUrl: string;
  protected defaultHeaders: Headers;

  constructor(baseUrl: string, defaultHeaders: HeadersInit = {}) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = new Headers(defaultHeaders);
  }

  protected async handleResponse<T>(
    response: Response,
    context: { method: HttpMethod; url: string }
  ): Promise<T> {
    if (!response.ok) {
      let parsedBody: unknown = undefined;
      try {
        parsedBody = await response.clone().json();
      } catch (_) {
        try {
          parsedBody = await response.text();
        } catch (_) {
          parsedBody = undefined;
        }
      }

      const bodyHasMessage =
        typeof parsedBody === 'object' &&
        parsedBody !== null &&
        'message' in (parsedBody as Record<string, unknown>);

      const messageFromBody = bodyHasMessage
        ? (parsedBody as Record<string, unknown>).message
        : undefined;

      const errorMessage =
        (typeof messageFromBody === 'string' && messageFromBody) ||
        `HTTP ${response.status} ${response.statusText}`;

      throw new ApiError({
        status: response.status,
        statusText: response.statusText,
        url: context.url || response.url,
        method: context.method,
        body: parsedBody,
        message: errorMessage,
      });
    }

    if (
      response.status === 204 ||
      response.headers.get('Content-Length') === '0'
    ) {
      return undefined as T;
    }

    return response.json() as T;
  }

  protected async request<T>(
    method: HttpMethod,
    url: string,
    options: RequestOptions = {}
  ): Promise<T> {
    // Start with a copy of the default headers
    const headers = new Headers(this.defaultHeaders);

    let bodyToSend: BodyInit | null = null;

    if (options.body) {
      if (options.body instanceof FormData) {
        // For FormData, let fetch set the Content-Type header automatically
        bodyToSend = options.body;
      } else {
        // For JSON, explicitly set the Content-Type and stringify the body
        headers.set('Content-Type', 'application/json');
        bodyToSend = JSON.stringify(options.body);
      }
    }

    // Merge any per-request headers, overwriting defaults if necessary
    if (options.headers) {
      new Headers(options.headers).forEach((value, key) => {
        headers.set(key, value);
      });
    }

    const fullUrl = `${this.baseUrl}${url}`;

    try {
      const response = await fetch(fullUrl, {
        method,
        ...options,
        headers,
        body: bodyToSend,
      });
      return this.handleResponse<T>(response, { method, url: fullUrl });
    } catch (error) {
      console.error(`API request failed for ${method} ${fullUrl}:`, error);
      if (error instanceof ApiError) {
        throw error;
      }
      // Wrap unknown/network errors into ApiError for consistent handling
      throw new ApiError({
        status: 0,
        statusText: 'NetworkError',
        url: fullUrl,
        method,
        body: undefined,
        message: error instanceof Error ? error.message : 'Network error',
      });
    }
  }

  public get<T>(url: string, options?: RequestOptions) {
    return this.request<T>('GET', url, options);
  }

  public post<T>(url: string, options?: RequestOptions) {
    return this.request<T>('POST', url, options);
  }

  public put<T>(url: string, options?: RequestOptions) {
    return this.request<T>('PUT', url, options);
  }

  public patch<T>(url: string, options?: RequestOptions) {
    return this.request<T>('PATCH', url, options);
  }

  public delete<T>(url: string, options?: RequestOptions) {
    return this.request<T>('DELETE', url, options);
  }
}

export class ApiError extends Error {
  public status: number;
  public statusText: string;
  public url: string;
  public method: HttpMethod;
  public body?: unknown;

  constructor(params: {
    status: number;
    statusText: string;
    url: string;
    method: HttpMethod;
    body?: unknown;
    message?: string;
  }) {
    super(params.message ?? `HTTP ${params.status} ${params.statusText}`);
    this.name = 'ApiError';
    this.status = params.status;
    this.statusText = params.statusText;
    this.url = params.url;
    this.method = params.method;
    this.body = params.body;
  }
}
