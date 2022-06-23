import React from 'react'

class ErrorBoundary extends React.Component<unknown, { hasError: boolean }> {
  constructor(props: unknown) {
    super(props)

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI

    return { hasError: true }
  }
  componentDidCatch(error: unknown, errorInfo: unknown) {
    // You can use your own error logging service here

    // eslint-disable-next-line no-console
    console.error({ error, errorInfo })
  }
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
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
              <h6 className="mb-2 text-center text-2xl font-bold text-base-900 md:text-3xl">
                <span className="text-error">Oops!</span> there is an error!
              </h6>

              <button
                type="button"
                className="btn btn-primary mt-2"
                onClick={() => this.setState({ hasError: false })}
              >
                Try again?
              </button>
            </div>
          </div>
        </div>
      )
    }

    // Return children components in case of no error

    return this.props.children
  }
}

export default ErrorBoundary
