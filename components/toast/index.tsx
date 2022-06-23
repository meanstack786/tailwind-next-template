import { FC } from 'react'
import toast, { Toaster, ToastIcon, ToasterProps } from 'react-hot-toast'

const CToaster: FC<ToasterProps> = (props) => {
  return (
    <Toaster position="top-right" {...props}>
      {(t) => (
        <div
          className={`${
            t.visible
              ? 'animate-in fade-in '
              : `animate-out fade-out duration-1000`
          } max-w-sm   pl-6  pr-2 py-2 shadow-2xl  rounded-t-box rounded-b-box bg-base-200 flex items-center gap-2`}
        >
          <ToastIcon toast={t} />
          <div className="ml-2">{t.message}</div>
          <button
            className="btn btn-ghost btn-sm btn-circle  a i"
            onClick={() => toast.dismiss(t.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
    </Toaster>
  )
}

export default CToaster
