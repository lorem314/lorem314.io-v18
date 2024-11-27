import { notFound } from "next/navigation"
import { useMDXComponent } from "next-contentlayer/hooks"
import { allBookChapters } from "contentlayer/generated"

import Article from "@/components/article/Article"
import components from "@/components/elements"

export default function Page({
  params: { chapter, title },
}: {
  params: { chapter: string; title: string }
}) {
  const bookChapter = allBookChapters.find(
    (bookChapter) =>
      bookChapter._raw.flattenedPath ===
      `books/${decodeURIComponent(title)}/${decodeURI(chapter)}`
  )

  if (!bookChapter) notFound()

  const MDXContent = useMDXComponent(bookChapter.body.code)
  const renderedMDX = <MDXContent components={components} />

  return (
    <Article
      header={
        <>
          <div className="text-xl font-bold mb-2 text-right">
            第 {bookChapter.chapter} 章
          </div>
          <hr />
          <h1 className="text-xl font-bold mt-2 text-right">
            {bookChapter.title}
          </h1>
        </>
      }
      renderedBody={renderedMDX}
      title={bookChapter.title}
      toc={bookChapter.meta.toc}
      // footer={
      //   <footer className="PageContent mt-[10px]">
      //     <div>relative articles</div>
      //   </footer>
      // }
    />
  )
}

export async function generateMetadata({
  params,
}: {
  params: { chapter: string; title: string }
}) {
  const title = decodeURIComponent(params.title)
  const chapter = decodeURI(params.chapter)
  const bookChapter = allBookChapters.find(
    (bookChapter) =>
      bookChapter._raw.flattenedPath === `books/${title}/${chapter}`
  )
  if (!bookChapter) {
    return { title: "404 | lorem314.io-v17" }
  }

  return {
    title: `第 ${bookChapter.chapter} 章 - ${bookChapter.title} | ${title} | 书籍 | lorem314.io-v18`,
  }
}
