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
    const headers = new Headers(this.defaultHeaders);
    if (options.headers) {
      new Headers(options.headers).forEach((value, key) => {
        headers.set(key, value);
      });
    }

    let bodyToSend: BodyInit | null = null;
    if (options.body) {
      if (options.body instanceof FormData) {
        bodyToSend = options.body;
      } else {
        bodyToSend = JSON.stringify(options.body);
        if (!headers.has('Content-Type')) {
          headers.set('Content-Type', 'application/json');
        }
      }
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

  public post<T>(url: string, body: any, options?: RequestOptions) {
    return this.request<T>('POST', url, { ...options, body });
  }

  public put<T>(url: string, body: any, options?: RequestOptions) {
    return this.request<T>('PUT', url, { ...options, body });
  }

  public patch<T>(url: string, body: any, options?: RequestOptions) {
    return this.request<T>('PATCH', url, { ...options, body });
  }

  public delete<T>(url: string, options?: RequestOptions) {
    return this.request<T>('DELETE', url, options);
  }
}
