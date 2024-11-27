import React from "react"
import { Metadata } from "next"
import { allBookCovers } from "contentlayer/generated"

import BookCoverList from "@/components/books/BookCoverList"

const BooksPage = () => {
  return (
    <section className="max-w-[48rem] shadow rounded mx-auto my-8 px-6 py-4 bg-content-bg">
      <h2 className="content-label">书籍({allBookCovers.length})</h2>
      <BookCoverList bookCovers={allBookCovers} />
    </section>
  )
}

export default BooksPage

export const metadata: Metadata = {
  title: "书籍 | lorem314.io-v18",
}
