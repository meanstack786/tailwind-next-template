import { FC, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { ThemeButton } from '../theme'
import Avatar from 'react-avatar'
export type NavBarProps = { title?: string }

const AvatarDropdown: FC = () => {
  const router = useRouter()
  const [isopen, setIsopen] = useState(false)
  const [isSettingsopen, setIsSettingsopen] = useState(false)
  return (
    <div className="dropdown-end dropdown ">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <Avatar name={'test'} size="30" round={true} />
      </label>

      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-200 p-2 shadow"
      >
        {/* <li>
          <button
            className="justify-between"
            onClick={() => {
              setIsopen(true)
            }}
          >
            Profile
            <span className="badge">New</span>
          </button>
        </li>
        <li>
          <button
            className="justify-between"
            onClick={() => {
              setIsSettingsopen(true)
            }}
          >
            Settings
          </button>
        </li> */}
        <li>
          <button
            onClick={() => {
              router.replace('/login')
            }}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}

const NavBar: FC<NavBarProps> = ({}) => {
  return (
    <div
      className="sticky top-0 z-30 flex h-16 w-full justify-center bg-base-100 bg-opacity-90 text-base-content shadow-sm 
  backdrop-blur transition-all duration-100"
    >
      <nav className="navbar w-full">
        <div className="flex flex-1 gap-1 lg:gap-2">
          <label
            htmlFor="drawer"
            className="btn btn-ghost drawer-button btn-square lg:hidden"
          >
            <svg
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-5 w-5 stroke-current md:h-6 md:w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <div className="flex items-center gap-2 lg:hidden">
            <Link href="/">
              <a
                aria-current="page"
                aria-label="Homepage"
                className="flex-0 btn btn-ghost px-2 "
              >
                <div className="inline-flex  transition-all duration-200">
                  <span className=" text-xl  font-normal lowercase	 ">Dev</span>
                  <span className="text-xl  uppercase italic text-yellow-400 ">
                    Admin
                  </span>
                </div>
              </a>
            </Link>
          </div>
        </div>
        <div className="mr-1 flex-none items-center gap-2">
          <ThemeButton />
        </div>
        <div className="mr-1 flex-none items-center gap-2">
          <AvatarDropdown />
        </div>
      </nav>
    </div>
  )
}

export default NavBar
