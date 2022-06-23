import { Method } from 'axios'
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from 'react-query'
import { request } from './axios-helper'

const BACKEND_URL = process.env.DEV_CONSOLE_BACKEND_URL || ''

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type KeysType = any[] | string

type Variables = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export const useAxiosQuery = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData
>(
  path: string,
  payload?: Variables,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, KeysType>,
    'queryKey' | 'queryFn'
  >,
  method?: Method
) => {
  return useQuery<TQueryFnData, TError, TData, KeysType>(
    !!payload ? [path, payload] : path,
    async () => {
      return request({ url: `${BACKEND_URL}${path}`, payload, method })
    },
    options
  )
}

export const useAxiosMutation = <
  TData = unknown,
  TVariables = Variables,
  TError = unknown,
  TContext = unknown
>(
  path: string,
  options?: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    'mutationKey' | 'mutationFn'
  >,
  method: Method = 'POST'
) => {
  return useMutation<TData, TError, TVariables, TContext>(
    [path],
    async (payload) => {
      return request({ url: `${BACKEND_URL}${path}`, payload, method })
    },
    options
  )
}
