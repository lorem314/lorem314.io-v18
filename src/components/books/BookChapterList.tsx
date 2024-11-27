import React from "react"
import Link from "next/link"
import { type BookChapter, type BookCover } from "contentlayer/generated"

import Details from "../elements/Details"
import { TocItem } from "@/types"

const BookChapterList = ({
  chapters,
  bookCover,
}: {
  chapters: BookChapter[]
  bookCover: BookCover
}) => {
  return (
    <ul>
      {chapters.map((chapter) => {
        return (
          <li key={chapter._id}>
            <Details isOpen={false}>
              <h5>
                <Link href={`/books/${bookCover.title}/第${chapter.chapter}章`}>
                  第 {chapter.chapter} 章 - {chapter.title}
                </Link>
              </h5>
              <Items
                items={chapter.meta.toc.items}
                hrefPrefix={`/books/${bookCover.title}/第${chapter.chapter}章`}
                chapter={chapter.chapter}
              />
            </Details>
          </li>
        )
      })}
    </ul>
  )
}

export default BookChapterList

const Items = ({
  items = [],
  hrefPrefix = "",
  chapter,
}: {
  items: TocItem[]
  hrefPrefix: string
  chapter: string
}) => {
  return (
    <ul className="tree-list">
      {items.map((item, index) => {
        return (
          <li key={index}>
            <Item item={item} hrefPrefix={hrefPrefix} chapter={chapter} />
          </li>
        )
      })}
    </ul>
  )
}

const Item = ({
  item,
  hrefPrefix = "",
  chapter,
}: {
  item: TocItem
  hrefPrefix: string
  chapter: string
}) => {
  const link = hrefPrefix + "#" + encodeURIComponent(item.title)

  if (!item.items) {
    return <Link href={link}>{item.title}</Link>
  } else {
    return (
      <>
        <li>
          <Link href={link}>{item.title}</Link>
        </li>
        <Items items={item.items} hrefPrefix={hrefPrefix} chapter={chapter} />
      </>
    )
  }
}
