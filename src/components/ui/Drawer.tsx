import React, {
  useState,
  useEffect,
  type ReactElement,
  cloneElement,
} from "react"
import { createPortal } from "react-dom"

import { VscChromeClose } from "react-icons/vsc"

import type { Placement } from "@/types/ui-props"

type DrawerProps = {
  isOpen: boolean
  title?: string
  placement: Placement
  size: number
  onClose: () => void
  children:
    | ReactElement
    | (({ onCloseDrawer }: { onCloseDrawer?: () => void }) => ReactElement)
}

const Drawer = ({
  isOpen,
  title,
  placement = "left",
  size,
  onClose,
  children,
}: DrawerProps) => {
  return isOpen ? (
    <Portal title={title} placement={placement} size={size} onClose={onClose}>
      {children}
    </Portal>
  ) : null
}

export default Drawer

const Portal = ({
  title,
  placement,
  size,
  onClose,
  children,
}: Omit<DrawerProps, "isOpen">) => {
  const [styles, setStyles] = useState({
    opacity: 0,
    transform: getTransform(placement),
  })

  useEffect(() => {
    const transform = "translate(0, 0)"
    setStyles((prevStyles) => ({ ...prevStyles, opacity: 1, transform }))
  }, [])

  const handleCloseDrawer = () => {
    Promise.resolve()
      .then(() => {
        return new Promise<void>((resolve) => {
          const transform = getTransform(placement)
          setStyles({ opacity: 0, transform })
          setTimeout(() => resolve(), 150)
        })
      })
      .then(() => onClose && onClose())
  }

  const { transform } = styles
  const positionProps = getPositionProps(placement, size)

  return createPortal(
    <div
      className="backdrop-blur-[2px] transition-opacity absolute top-0 right-0 bottom-0 left-0 bg-[rgba(0,0,0,0.25)]"
      style={{ opacity: styles.opacity }}
      onClick={handleCloseDrawer}
    >
      <div
        className="transition-transform absolute flex flex-col bg-content-bg"
        style={{ ...positionProps, transform }}
        onClick={(event) => event.stopPropagation()}
      >
        <header
          className={`h-[50px] px-2.5 text-white bg-primary-color flex-shrink-0 flex ${
            placement === "left"
              ? "flex-row-reverse justify-end"
              : "flex-row justify-between"
          } items-center gap-2.5`}
        >
          <h2 className="text-lg font-bold">{title ? title : "lorem314.io"}</h2>
          <button
            className="rounded p-2 bg-misc-button-bg hover:bg-misc-button-hover-bg"
            onClick={handleCloseDrawer}
          >
            <VscChromeClose />
          </button>
        </header>
        <div className="flex-grow overflow-y-auto">
          {typeof children === "function"
            ? children({ onCloseDrawer: handleCloseDrawer })
            : cloneElement(children, {
                onCloseDrawer: handleCloseDrawer,
              })}
        </div>
        {/* <footer></footer> */}
      </div>
    </div>,
    document.body
  )
}

const getPositionProps = (placement: Placement, size: number) => {
  switch (placement) {
    case "top":
    case "bottom":
      return { left: 0, right: 0, [placement]: 0, height: `${size}px` }
    case "left":
    case "right":
      return { top: 0, bottom: 0, [placement]: 0, width: `${size}px` }
    default:
      return { top: 0, bottom: 0, left: 0, width: `${size}px` }
  }
}

const getTransform = (placement: Placement) => {
  switch (placement) {
    case "top":
      return "translate(0, -100%)"
    case "right":
      return "translate(100%, 0)"
    case "bottom":
      return "translate(0, 100%)"
    case "left":
      return "translate(-100%, 0)"
    default:
      return "translate(-100%, 0)"
  }
}
