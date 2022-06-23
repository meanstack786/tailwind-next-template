import Image from 'next/image'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Header from 'components/nav/header'
import { NextPageWithLayout } from 'types/page'
import { NoSlideMenuLayout } from 'components/nav/layout'
import { logoAddress } from 'lib/config'
import { useAxiosMutation } from 'lib/request/use-fetch'
import { LoginPostResponse, LoginPostReuqest } from 'lib/request/http-api-type'

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
})

type FormData = yup.InferType<typeof schema>

type SubmitType = (data: FormData) => void

const LoginContainer: FC = ({ children }) => {
  return (
    <>
      <div className="flex min-h-full w-full items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <div className="flex items-center justify-center">
              <Image
                width={100}
                height={50}
                priority
                className="mx-auto h-12 w-auto"
                src={logoAddress}
                alt="logo"
              />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

const LoginForm: FC = () => {
  const { isLoading, mutate } = useAxiosMutation<LoginPostResponse,LoginPostReuqest>(
     '/api/sign',
    {},
    'POST'
  )
  const router = useRouter()
  const onSubmit: SubmitType = async (data) => {
    await mutate(data)
    router.push('/')
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  console.log('errors', errors)

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" name="remember" defaultValue="true" />
      <div className="-space-y-px rounded-md shadow-sm">
        <div>
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            type="email"
            autoComplete="email"
            required
            className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="Email address"
            {...register('email')}
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="Password"
            {...register('password')}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="box"
            className="box h-4 w-4 rounded"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-gray-900"
          >
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <Link href="#">
            <a className="font-medium text-indigo-600 hover:text-indigo-500">
              Forgot your password?
            </a>
          </Link>
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-75"
        >
          {/* <span className="absolute left-0 inset-y-0 flex items-center pl-3">
        <LockClosedIcon
          className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
          aria-hidden="true"
        />
      </span> */}
          Sign in
        </button>
      </div>
    </form>
  )
}

const Login: NextPageWithLayout = () => {
  return (
    <LoginContainer>
      <Header />
      <LoginForm />
    </LoginContainer>
  )
}
Login.getLayout = (page) => <NoSlideMenuLayout>{page}</NoSlideMenuLayout>

export default Login
