import React, { isValidElement, type ReactNode } from "react"
import { CgHashtag } from "react-icons/cg"

import { H2, H3, H4, H5, H6 } from "./headings"
import { urlFriendly } from "@/utils/formatter"

const getHeading = (level: number) => {
  switch (level) {
    case 2:
      return H2
    case 3:
      return H3
    case 4:
      return H4
    case 5:
      return H5
    default:
      return H6
  }
}

type SectionProps = {
  title: string
  level: number
  children: ReactNode
}

const Section = ({ title, level = 2, children }: SectionProps) => {
  const H = getHeading(level)
  const fontSize = getFontSize(level)
  const marginTop = getMarginTop(level)
  const lineHeight = getLineHeight(level)
  const id = urlFriendly(title)

  return (
    <section className={marginTop}>
      <H id={id} className={`mb-4 font-bold ${fontSize} ${lineHeight}`}>
        <a
          className="group relative -ml-2 pl-2 hover:no-underline inline-flex items-center"
          href={`#${id}`}
        >
          <button
            tabIndex={-1}
            className="absolute -translate-x-full -ml-2 bg-bg-1 rounded p-1 shadow opacity-0 group-hover:opacity-100 hover:opacity-100"
          >
            <CgHashtag className="opacity-75 hover:opacity-100" />
          </button>
          {title}
        </a>
      </H>

      {React.Children.toArray(children).map((child, index) => {
        if (!isValidElement(child)) return child

        const displayName = (child.type as React.FC).displayName
        const isChildFunction = typeof child.type === "function"

        if (!isChildFunction || displayName !== "Section") return child

        const { props } = child
        const key = `Section-${level}-${index}`

        return <Section {...props} key={key} level={level + 1} />
      })}
    </section>
  )
}

Section.displayName = "Section"

export default Section

const getFontSize = (level: number) => {
  switch (level) {
    case 2:
      return "text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl"
    case 3:
      return "text-base lg:text-lg xl-text-xl 2xl:text-2xl"
    case 4:
      return "text-base xl:text-lg 2xl:text-xl"
    case 5:
      return "text-base 2xl:text-lg"
    default:
      return "text-base"
  }
}

const getMarginTop = (level: number) => {
  switch (level) {
    case 2:
      return "mb-4 mt-4 md:mt-6 lg:mt-8 xl:mt-10 2xl:mt-12 first:mt-0"
    case 3:
      return "mb-4 mt-4 lg:mt-6 xl:mt-8 2xl:mt-10"
    case 4:
      return "mb-4 mt-4 xl:mt-6 2xl:mt-8"
    case 5:
      return "mb-4 mt-4 2xl:mt-6"
    default:
      return "mb-4 mt-4"
  }
}

const getLineHeight = (level: number) => {
  switch (level) {
    case 2:
      return "leading-8"
    case 3:
      return "leading-7"
    case 4:
      return "leading-6"
    case 5:
      return "leading-5"
    default:
      return "leading-4"
  }
}
