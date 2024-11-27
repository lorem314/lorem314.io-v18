import React from "react"
import { type BookCover, allBookChapters } from "contentlayer/generated"

import BookCoverItem from "./BookCoverItem"
import { ObjectGroupBy } from "@/utils"

const BookCoverList = ({ bookCovers }: { bookCovers: BookCover[] }) => {
  const chaptersByIsbn = ObjectGroupBy(
    allBookChapters,
    (chapter) => chapter.isbn
  )

  return (
    <ul className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-[10px]">
      {bookCovers.map((bookCover) => {
        return (
          <li className="flex flex-col items-center" key={bookCover._id}>
            <BookCoverItem
              bookCover={bookCover}
              chapters={chaptersByIsbn[bookCover.isbn]}
            />
          </li>
        )
      })}
    </ul>
  )
}

export default BookCoverList
