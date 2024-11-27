import React from "react"
import Link from "next/link"
import { type BlogPost } from "contentlayer/generated"

import Tags from "./Tags"
import { getTimeAgo } from "@/utils/formatter"

const BlogItem = ({ blog }: { blog: BlogPost }) => {
  return (
    <article>
      <header>
        <h4 className="text-lg font-bold">
          <Link href={blog._raw.sourceFileDir}>{blog.title}</Link>
        </h4>
        <div className="text-sm my-2">
          <Tags tags={blog.tags} />
        </div>
        <div>
          发布于 <time dateTime={blog.date}>{getTimeAgo(blog.date)}</time>前
        </div>
      </header>
    </article>
  )
}

export default BlogItem
