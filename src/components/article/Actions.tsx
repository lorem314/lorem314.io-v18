"use client"
import React, { useState, useEffect, useCallback } from "react"
// import { usePathname } from "next/navigation"

import { BiSolidArrowToTop } from "react-icons/bi"
import { MdFullscreen, MdFullscreenExit } from "react-icons/md"

const Actions = () => {
  const [isFullscreen, setIsFullscreen] = useState(false)
  // const pathname = usePathname()

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (document.fullscreenElement) setIsFullscreen(true)
      else setIsFullscreen(false)
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  const openFullscreen = useCallback(() => {
    const nodeMainContent = document.getElementById("page-container")
    if (nodeMainContent && nodeMainContent.requestFullscreen) {
      nodeMainContent.requestFullscreen()
    } else {
      alert("浏览器不支持全屏")
    }
  }, [])

  const exitFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }, [])

  const toTop = useCallback(() => {
    document.getElementById("page-container")?.scrollTo(0, 0)
  }, [])

  return (
    <ul className="flex flex-col items-center gap-2.5 sticky top-2.5 text-misc-button-icon-color">
      {/* <li className="flex">
        <button className="bg-content-bg rounded p-2 shadow hover:text-blue-800 dark:hover:text-blue-500">
          <IoArrowBackSharp />
        </button>
      </li> */}
      <li className="flex">
        <button
          className="bg-content-bg rounded p-2 shadow hover:text-blue-800 dark:hover:text-blue-500"
          onClick={toTop}
        >
          <BiSolidArrowToTop />
        </button>
      </li>
      {isFullscreen ? (
        <li className="flex">
          <button
            className="bg-content-bg rounded p-2 shadow hover:text-blue-800 dark:hover:text-blue-500"
            onClick={exitFullscreen}
          >
            <MdFullscreenExit />
          </button>
        </li>
      ) : (
        <li className="flex">
          <button
            className="bg-content-bg rounded p-2 shadow hover:text-blue-800 dark:hover:text-blue-500"
            onClick={openFullscreen}
          >
            <MdFullscreen />
          </button>
        </li>
      )}
    </ul>
  )
}

export default Actions
