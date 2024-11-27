import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  type MouseEvent,
  type ChangeEvent,
} from "react"

import { FaCaretDown } from "react-icons/fa"
import { IoCloseSharp } from "react-icons/io5"
import { GiLogicGateAnd, GiLogicGateOr } from "react-icons/gi"

import useDebounce from "@/hooks/useDebounce"
import type { Tag } from "@/types"

const Select = ({
  options,
  selectedTags,
  onSelectTag,
  clearSelectedTags,
  isOrLogic,
  toggleFilterLogic,
}: {
  options: Tag[]
  selectedTags: Tag[]
  onSelectTag: (tag: Tag) => (event: MouseEvent | KeyboardEvent) => void
  clearSelectedTags: () => void
  isOrLogic: boolean
  toggleFilterLogic: (event: MouseEvent<HTMLButtonElement>) => void
}) => {
  const refSelectedTags = useRef<HTMLUListElement>(null)
  const refTagInput = useRef<HTMLInputElement>(null)
  const refOptions = useRef<HTMLUListElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState(-1)
  const [term, setTerm] = useState("")
  const debouncedTerm = useDebounce(term)

  // close ul.options when click outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isOpen) setIsOpen(false)
    }
    window.addEventListener("click", handleClickOutside)
    return () => {
      window.removeEventListener("click", handleClickOutside)
    }
  }, [isOpen])

  // nodeSelectedTags horizontal wheel
  useEffect(() => {
    const nodeSelectedTags = refSelectedTags.current
    const handleWheel = (event: WheelEvent) => {
      if (event.deltaY === 0 || !event.shiftKey) return
      nodeSelectedTags?.scrollBy({ left: event.deltaY < 0 ? -12 : 12 })
    }
    if (nodeSelectedTags) {
      nodeSelectedTags.addEventListener("wheel", handleWheel, { passive: true })
    }
    return () => {
      nodeSelectedTags?.removeEventListener("wheel", handleWheel)
    }
  }, [selectedTags])

  const handleSelectTag = useCallback(
    (tag: Tag) => (event: MouseEvent | KeyboardEvent) => {
      if (event.stopPropagation) {
        event.stopPropagation()
      }
      if (!event.shiftKey) {
        setIsOpen(false)
      }
      onSelectTag(tag)(event)
    },
    [onSelectTag]
  )

  const filteredOptions = options.filter((option) => {
    if (debouncedTerm === "") return true
    return option.name.includes(debouncedTerm)
  })

  // tag input listens to key press event
  useEffect(() => {
    const nodeTagInput = refTagInput.current

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target !== nodeTagInput) return
      switch (event.code) {
        case "Escape":
          setIsOpen(false)
          break
        case "Enter":
        case "NumpadEnter":
        case "Space":
          event.preventDefault()
          if (!isOpen) {
            setIsOpen(true)
          } else {
            if (hoveredIndex !== -1) {
              handleSelectTag(filteredOptions[hoveredIndex])(event)
            }
            setIsOpen(false)
          }
          break
        case "ArrowUp":
        case "ArrowDown":
          event.preventDefault()
          if (!isOpen) {
            setIsOpen(true)
            break
          }
          if (hoveredIndex === -1) {
            setHoveredIndex(() => 0)
          }
          const indexAddend = event.code === "ArrowDown" ? 1 : -1
          const newHoveredIndex = hoveredIndex + indexAddend
          if (newHoveredIndex >= 0 && newHoveredIndex < options.length) {
            setHoveredIndex(newHoveredIndex)
            const nodeOptions = refOptions.current
            const nodeNextHoveredLi = nodeOptions?.querySelector<HTMLLIElement>(
              `li:nth-of-type(${newHoveredIndex + 1})`
            )
            if (!nodeNextHoveredLi || !nodeOptions) return
            if (event.code === "ArrowUp") {
              if (nodeNextHoveredLi.offsetTop < nodeOptions.scrollTop) {
                nodeOptions.scrollTop = nodeNextHoveredLi.offsetTop
              }
            } else if (event.code === "ArrowDown") {
              if (
                nodeNextHoveredLi.offsetTop + nodeNextHoveredLi.offsetHeight >
                nodeOptions.scrollTop + nodeOptions.clientHeight
              ) {
                nodeOptions.scrollTop =
                  (newHoveredIndex - 3) * nodeNextHoveredLi.offsetHeight
              }
            }
          }
          return
        default:
          return
      }
    }
    if (nodeTagInput) {
      nodeTagInput.addEventListener("keydown", handleKeyDown)
    }
    return () => {
      nodeTagInput?.removeEventListener("keydown", handleKeyDown)
    }
  }, [
    isOpen,
    hoveredIndex,
    options,
    selectedTags,
    handleSelectTag,
    clearSelectedTags,
    filteredOptions,
  ])

  const handleMouseEnterOption = useCallback(
    (index: number) => () => setHoveredIndex(index),
    []
  )
  const handleMouseLeaveOptions = useCallback(() => setHoveredIndex(-1), [])

  const handleChangeTerm = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setHoveredIndex(-1)
      setTerm(event.target.value)
      setIsOpen(true)
    },
    []
  )

  const toggleIsOpen = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation()
      setIsOpen((prevIsOpen) => !prevIsOpen)
    },
    []
  )

  return (
    <div className="relative">
      <label className="content-label block" htmlFor="blogs-select">
        筛选
      </label>

      {/* select-input-groud */}
      <div
        className="flex items-center bg-input-text-background border border-input-text-border-color rounded focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500"
        onClick={(event) => event.stopPropagation()}
      >
        {/*  */}

        {/* selected-tags */}
        <ul
          ref={refSelectedTags}
          className="flex-grow-0 flex-shrink-0 basis-auto max-w-[128px] pl-2 overflow-x-hidden flex items-center gap-2"
        >
          {selectedTags.map((tag) => {
            return (
              <li key={tag.name}>
                <button
                  className="text-misc-button-icon-color hover:bg-misc-button-bg border border-input-text-border-color px-1.5 py-0.5"
                  onClick={handleSelectTag(tag)}
                >
                  {tag.name}
                </button>
              </li>
            )
          })}
        </ul>

        {/* text-input */}
        <input
          ref={refTagInput}
          id="blogs-select"
          className="no-focus-ring-shadow border-none"
          type="text"
          placeholder="筛选标签"
          autoComplete="off"
          value={term}
          onChange={handleChangeTerm}
          onFocus={() => setIsOpen(true)}
        />

        {/* actions */}
        <div className="px-2 flex items-center gap-2">
          {selectedTags.length !== 0 ? (
            <button
              className="opacity-50 hover:opacity-100"
              onClick={clearSelectedTags}
            >
              <IoCloseSharp className="w-5 h-5" />
            </button>
          ) : null}

          {selectedTags.length >= 2 ? (
            <button
              className="opacity-50 hover:opacity-100"
              onClick={toggleFilterLogic}
            >
              {isOrLogic ? (
                <GiLogicGateOr className="w-5 h-5" />
              ) : (
                <GiLogicGateAnd className="w-5 h-5" />
              )}
            </button>
          ) : null}

          <button
            className="opacity-50 hover:opacity-100"
            onClick={toggleIsOpen}
          >
            <FaCaretDown className="w-5 h-5" />
          </button>
        </div>

        {/*  */}
      </div>

      {/* options */}
      <ul
        ref={refOptions}
        className={`w-full max-h-32 overflow-y-auto absolute top-full mt-2 bg-content-bg border border-input-text-border-color rounded ${
          isOpen ? "block" : "hidden"
        }`}
        onMouseLeave={handleMouseLeaveOptions}
      >
        {filteredOptions.length === 0 ? (
          <li className="h-8 px-2 flex items-center">
            <p>没有符合查询的标签...</p>
          </li>
        ) : (
          filteredOptions.map((tag, index) => {
            const isHovered = index === hoveredIndex
            const isSelected = selectedTags.includes(tag)
            return (
              <li
                key={tag.name}
                className={`cursor-pointer px-2 h-8 flex justify-between items-center text-misc-button-icon-color ${
                  isHovered ? "bg-misc-button-bg" : ""
                } ${
                  isSelected
                    ? "text-neutral-200 bg-neutral-500 font-medium"
                    : ""
                }`}
                onMouseEnter={handleMouseEnterOption(index)}
                onClick={handleSelectTag(tag)}
              >
                <span>{tag.name}</span>
                <span>{tag.count}</span>
              </li>
            )
          })
        )}
      </ul>
    </div>
  )
}

export default Select
