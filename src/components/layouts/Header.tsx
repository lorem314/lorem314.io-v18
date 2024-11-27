import React from "react"
import Link from "next/link"

import { RiMenu2Line } from "react-icons/ri"
import type { IconType } from "react-icons"

import Social from "./Social"

const Header = ({
  hasLeftDrawer,
  openLeftDrawer,
  hasRightDrawer,
  openRightDrawer,
  RightDrawerIcon,
}: {
  hasLeftDrawer: boolean | null
  openLeftDrawer: () => void
  hasRightDrawer: boolean | null
  openRightDrawer: () => void
  RightDrawerIcon: IconType | null
}) => {
  return (
    <header className="h-[50px] px-2.5 text-white bg-primary-color flex items-center gap-2.5">
      {hasLeftDrawer ? (
        <button
          className="rounded p-2 bg-misc-button-bg hover:bg-misc-button-hover-bg"
          onClick={() => openLeftDrawer()}
        >
          <RiMenu2Line className="w-5 h-5" />
        </button>
      ) : null}

      <h1 className="text-lg font-bold">
        <Link className="text-inherit hover:no-underline" href="/">
          lorem314.io
        </Link>
      </h1>

      <div className="flex-grow"></div>

      <Social />

      {hasRightDrawer && RightDrawerIcon ? (
        <button
          className="rounded p-2 bg-misc-button-bg hover:bg-misc-button-hover-bg"
          onClick={() => openRightDrawer()}
        >
          <RightDrawerIcon className="w-5 h-5" />
        </button>
      ) : null}
    </header>
  )
}

export default Header
