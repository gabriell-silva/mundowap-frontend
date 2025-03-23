import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import React from 'react';

export default function useFetch<T, D = unknown>() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<Error | null>(null);

  const request = async ({
    url,
    method = "get",
    ...options
  }: AxiosRequestConfig) => {
    setLoading(true);
    setError(null);

    try {
      const {data}: AxiosResponse = await axios({
        url,
        method,
        ...options
      });

      setLoading(false);
      return data;
    } catch (error) {
      setError(error instanceof Error ? error : new Error(String(error)));
      setLoading(false);
      throw error;
    }
  }

  return [
    request,
    loading,
    error,
  ] as const;
}