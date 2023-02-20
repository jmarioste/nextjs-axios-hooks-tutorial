import { AxiosRequestConfig, AxiosResponse } from "axios";
// the cached item for axios hooks have this structure
type CacheItem = [string, { value: any }];

// use the config and the response to create a cached item
export function serializeResponse(
  config: AxiosRequestConfig,
  response: AxiosResponse<any, any>
): CacheItem {
  const key = JSON.stringify({ ...config });
  return [
    key,
    {
      value: {
        data: response.data,
        headers: {
          ...response.headers,
        },
        status: response.status,
        statusText: response.statusText,
      },
    },
  ];
}
