import { notFound } from "next/navigation"
import { allBlogPosts } from "contentlayer/generated"
import { useMDXComponent } from "next-contentlayer/hooks"

import Article from "@/components/article/Article"
import Tags from "@/components/blogs/Tags"
import { formateDate } from "@/utils/formatter"
import { addSpaceAroundEn } from "@/utils/formatter"
import components from "@/components/elements"

export default function Page({
  params: { title },
}: {
  params: { title: string }
}) {
  const blogPost = allBlogPosts.find(
    (blogPost) =>
      blogPost._raw.flattenedPath === `blogs/${decodeURIComponent(title)}`
  )

  if (!blogPost) notFound()

  const MDXContent = useMDXComponent(blogPost.body.code)
  const renderedMDX = <MDXContent components={components} />

  return (
    <Article
      header={
        <>
          <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold">
            {addSpaceAroundEn(blogPost.title)}
          </h1>
          <div className="my-2 lg:my-4 xl:my-6 text-sm lg:text-base">
            <Tags tags={blogPost.tags} />
          </div>
          <div className="text-sm lg:text-base">
            发布于 {formateDate(blogPost.date)}
          </div>
        </>
      }
      renderedBody={renderedMDX}
      title={blogPost.title}
      toc={blogPost.meta.toc}
    />
  )
}

export async function generateMetadata({
  params: { title },
}: {
  params: { title: string }
}) {
  const blogPost = allBlogPosts.find(
    (blogPost) =>
      blogPost._raw.flattenedPath === `blogs/${decodeURIComponent(title)}`
  )
  if (!blogPost)
    return {
      title: "404",
    }

  return {
    title: `${blogPost.title} | 博客 | lorem314.io-v18`,
  }
}
