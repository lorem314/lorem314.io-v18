import { allBookCovers, allBookChapters } from "contentlayer/generated"
import { notFound } from "next/navigation"
import Image from "next/image"

import BookChapterList from "@/components/books/BookChapterList"

export default function Page({ params }: { params: { title: string } }) {
  const bookCover = allBookCovers.find((bookCover) => {
    return (
      bookCover._raw.flattenedPath ===
      `books/${decodeURIComponent(params.title)}`
    )
  })
  if (!bookCover) return notFound()

  const chapters = allBookChapters.filter(
    (chapter) => chapter.isbn === bookCover.isbn
  )

  return (
    <section className="max-w-[24rem] shadow rounded mx-auto my-8 px-6 py-4 bg-content-bg">
      <h2 className="content-label">{bookCover.title}</h2>
      <div className="mb-4 flex flex-col items-center">
        <article className="max-w-[250px]">
          <header className="my-4">
            <Image
              className="mx-auto"
              src={bookCover.cover}
              alt={`${bookCover}的封面`}
              width={250}
              height={328}
            />
          </header>
          <h3 className="my-2 font-bold text-xl">{bookCover.title}</h3>
          <h4 className="my-2 text-right">{bookCover.subtitle}</h4>
          <footer>
            <BookChapterList bookCover={bookCover} chapters={chapters} />
          </footer>
        </article>
      </div>
    </section>
  )
}

export async function generateMetadata({
  params: { title },
}: {
  params: { title: string }
}) {
  const bookCover = allBookCovers.find((bookCover) => {
    return bookCover._raw.flattenedPath === `books/${decodeURI(title)}`
  })
  if (!bookCover) return { title: "404" }

  return {
    title: `${bookCover.title} | 书籍 | lorem314.io-v18`,
  }
}
