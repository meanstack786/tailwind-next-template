import { SessionStorageKeys } from 'lib/config'
import { toast } from 'react-hot-toast'

const signInPath = '/sign-in'

export type DMCError = {
  response: {
    data: { message?: string; [x: string]: unknown }
    status: number
    statusText?: string
    error?: ''
    errors?: { message: string }[]
    Message?: string
    message?: string
  }
}

let LAST_PATH_NAME = ''
let LAST_MESSAGE: string | undefined
export const errorHandler = (error: DMCError) => {
  const { response } = error

  if (response) {
    const { status, statusText, data, errors, Message, message } = response

    const errorMessage = errors?.map((e) => e.message).join('.\n')
    const errorText =
      errorMessage ||
      response.error ||
      data?.message ||
      Message ||
      message ||
      statusText

    if ((!LAST_MESSAGE || LAST_MESSAGE !== errorText) && errorText) {
      toast.error(errorText)

      // eslint-disable-next-line no-console
      console.error(errorText)
    }

    if (status === 401 && window.location.pathname !== signInPath) {
      if (
        window.location.pathname !== '/404' &&
        window.location.pathname !== '/401'
      ) {
        LAST_PATH_NAME = window.location.href
      }

      if (LAST_PATH_NAME !== signInPath) {
        sessionStorage.setItem(SessionStorageKeys.DEEP_URL_KEY, LAST_PATH_NAME)
      }
      LAST_MESSAGE = errorText
      setTimeout(() => {
        LAST_MESSAGE = ''
        window.location.href = signInPath
      }, 2000)
    }

    // return Promise.reject(errorText)
  }
}

export default errorHandler
