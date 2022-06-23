import 'styles/globals.css'
import type { AppProps } from 'next/app'
import type { NextPageWithLayout } from 'types/page'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import queryClient from 'lib/request/query-client'
// import 'styles/resources.css'

import CToaster from 'components/toast'
import ErrorBoundary from 'components/error-boundary'

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps, router }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  const { pathname } = router

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
          {getLayout(<Component {...pageProps} />)}
      </ErrorBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
      <CToaster />
    </QueryClientProvider>
  )
}

export default MyApp
