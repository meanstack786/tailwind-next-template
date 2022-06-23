import { AriaAttributes, FC } from 'react'
import Link from 'next/link'

const FooterItem: FC<AriaAttributes> = ({ children, ...props }) => {
  return (
    <a
      href="#"
      className="mx-2 text-gray-600 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-300"
      {...props}
    >
      {children}
    </a>
  )
}

const Footer: FC = () => {
  return (
    <footer className="flex flex-col items-center justify-between bg-base-100 px-6 py-4  sm:flex-row">
      <Link href="/">
        <a
          aria-current="page"
          aria-label="Homepage"
          className="flex-0 btn btn-ghost px-2 "
        >
          <div className="inline-flex  transition-all duration-200">
            <span className=" text-xl  font-normal lowercase	 ">dev</span>
            <span className="text-xl  uppercase italic text-yellow-400 ">
              admin
            </span>
          </div>
        </a>
      </Link>
      <p className="py-2 text-gray-800 dark:text-white sm:py-0">
        All rights reserved
      </p>

      <div className="-mx-2 flex">
        {/* <FooterItem aria-label="Facebook">
          <i className="fa-brands fa-facebook" style={{ height: 15 }} />
        </FooterItem>

        <FooterItem aria-label="Github">
          <i className="fa-brands fa-github" style={{ height: 15 }} />
        </FooterItem> */}
      </div>
    </footer>
  )
}

export default Footer
