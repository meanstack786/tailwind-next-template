import Link from 'next/link'
import { NextPageWithLayout } from 'types/page'

const ErrorPage: NextPageWithLayout = () => {
  return (
    <div
      className="
    flex
    h-screen
    w-screen
    items-center
    justify-center
  "
    >
      <div className="rounded-md bg-base-100 px-40 py-20 shadow-2xl">
        <div className="flex flex-col items-center">
          <h1 className="text-9xl font-bold text-primary">404</h1>

          <h6 className="mb-2 text-center text-2xl font-bold text-base-900 md:text-3xl">
            <span className="text-error">Oops!</span> Page not found
          </h6>

          <p className="mb-8 text-center text-gray-500 md:text-lg">
            The page you’re looking for doesn’t exist.
          </p>

          <Link href={'/'}>
            <a className="btn btn-primary">Go home</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

// Settings.getLayout = (page) => <Layout>{page}</Layout>

export default ErrorPage
