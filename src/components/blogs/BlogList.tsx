import React from "react"
import { type BlogPost } from "contentlayer/generated"

import BlogItem from "./BlogItem"

const BlogList = ({ blogs }: { blogs: BlogPost[] }) => {
  return (
    <ul className="m-2.5 flex flex-col gap-2.5">
      {blogs.length === 0 ? (
        <li className="text-center">
          <p>没有符合查询的结果...</p>
        </li>
      ) : (
        blogs.map((blog) => {
          return (
            <li key={blog._id}>
              <BlogItem blog={blog} />
            </li>
          )
        })
      )}
    </ul>
  )
}

export default BlogList
