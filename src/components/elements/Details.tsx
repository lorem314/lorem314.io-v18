"use client"
import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  type ReactNode,
} from "react"

import { BiChevronRight, BiChevronDown } from "react-icons/bi"

type DetailsProps = {
  isOpen: boolean
  children: ReactNode[]
}

const Details = forwardRef((props: DetailsProps, ref) => {
  const { children, isOpen: _isOpen } = props
  const [isOpen, setIsOpen] = useState(_isOpen === undefined ? true : _isOpen)

  const open = () => {
    setIsOpen(true)
  }
  const close = () => {
    setIsOpen(false)
  }

  useImperativeHandle(ref, () => ({ open, close }), [])

  return (
    <details className={`${isOpen ? "open" : "close"}`} open={isOpen}>
      <summary
        className="flex items-start select-none"
        onClick={(event) => {
          event.preventDefault()
          if (isOpen) {
            close()
          } else {
            open()
          }
        }}
      >
        <button
          className="opacity-50 hover:opacity-100"
          onClick={isOpen ? close : open}
        >
          {isOpen ? (
            <BiChevronDown className="w-6 h-6" />
          ) : (
            <BiChevronRight className="w-6 h-6" />
          )}
        </button>
        <div
          className="flex-grow flex justify-between"
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()
          }}
        >
          {children[0]}
        </div>
      </summary>
      {children[1]}
    </details>
  )
})

Details.displayName = "Details"

export default Details
