/**
 * Utility functions for building URLs with query parameters
 */

export interface QueryParams {
  [key: string]: string | number | boolean | undefined | null;
}

/**
 * Builds a query string from an object of parameters
 * Filters out undefined, null, and empty string values
 */
export const buildQueryString = (params: QueryParams): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
};
