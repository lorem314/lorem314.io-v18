import React from "react"

import { Tag } from "@/types"

const AllTags = ({
  allTags,
  selectedTags,
  handleSelectTag,
}: {
  allTags: Tag[]
  selectedTags: Tag[]
  handleSelectTag: (
    tag: Tag
  ) => (event: React.MouseEvent<HTMLButtonElement>) => void
}) => {
  return (
    <ul className="flex flex-wrap items-center gap-2.5">
      {allTags.map((tag) => {
        const isSelected = selectedTags.includes(tag)
        return (
          <li key={tag.name}>
            <button
              className={`border border-ch-border-color px-2.5 py-1 ${
                isSelected
                  ? "text-misc-button-active-color bg-misc-button-active-bg"
                  : "bg-misc-button-bg hover:bg-misc-button-hover-bg"
              }`}
              onClick={handleSelectTag(tag)}
            >
              {tag.name}
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default AllTags
