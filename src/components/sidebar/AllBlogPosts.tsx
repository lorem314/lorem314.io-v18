import React from "react"
import Link from "next/link"
import { allBlogPosts } from "contentlayer/generated"

const AllBlogPosts = () => {
  return (
    <ol className="list-decimal px-6">
      {allBlogPosts.map((blogPost) => {
        return (
          <li className="my-0.5" key={blogPost._id}>
            <Link href={blogPost._raw.sourceFileDir}>
              <h3 className="">{blogPost.title}</h3>
            </Link>
          </li>
        )
      })}
    </ol>
  )
}

export default AllBlogPosts
