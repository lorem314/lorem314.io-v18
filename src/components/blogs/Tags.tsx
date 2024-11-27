import React from "react"

const Tags = ({ tags }: { tags: string[] }) => {
  return (
    <ul className="flex flex-wrap items-center gap-2.5">
      {tags.map((tag, index) => {
        return (
          <li
            key={index}
            className="text-misc-button-icon-color border border-current rounded px-2 py-1"
          >
            {tag}
          </li>
        )
      })}
    </ul>
  )
}

export default Tags
