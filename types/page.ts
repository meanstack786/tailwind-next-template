import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'

export type NextPageWithLayout<P = unknown> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode
}

export type SortBy = { id: string; desc: boolean }
export type Filter = { id: string; value: string }
export type PagenationType = {
  page: number
  perPage: number
  filters?: Filter[]
  sortBy?: SortBy[]
}
