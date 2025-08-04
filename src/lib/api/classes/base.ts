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

  protected async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { message: response.statusText };
      }
      const errorMessage = errorData?.message || 'An unknown error occurred';
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorMessage}`
      );
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
      return this.handleResponse<T>(response);
    } catch (error) {
      console.error(`API request failed for ${method} ${fullUrl}:`, error);
      throw error;
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
