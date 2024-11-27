import React, { type ReactElement } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  allBlogPosts,
  allBookChapters,
  allBookCovers,
} from "contentlayer/generated"

import { FaHome } from "react-icons/fa"
import { RiArticleFill } from "react-icons/ri"
import { FaBook } from "react-icons/fa"
import { RiSettings3Fill } from "react-icons/ri"

import Tooltip from "@/components/ui/Tooltip"
import { ObjectGroupBy } from "@/utils"

const routes = [
  { Icon: FaHome, title: "主页", href: "/" },
  { Icon: RiArticleFill, title: "博客", href: "/blogs" },
  { Icon: FaBook, title: "书籍", href: "/books" },
  { Icon: RiSettings3Fill, title: "设置", href: "/setting" },
]

type SidebarProps = {
  onCloseDrawer?: () => void
  children?: ReactElement | null
}

const Sidebar = ({ onCloseDrawer }: SidebarProps) => {
  const chaptersByIsbn = ObjectGroupBy(
    allBookChapters,
    (chapter) => chapter.isbn
  )

  return (
    <nav className="h-full flex bg-bg-1">
      <ul className="flex-shrink-0 basis-[50px] bg-bg-0 pt-2.5 flex flex-col items-center gap-2.5">
        {routes.map((route, index) => {
          const { Icon, title, href } = route
          return (
            <li key={index} className="flex">
              <Tooltip tip={title} placement="right">
                <Link
                  className="text-misc-button-icon-color bg-misc-button-bg hover:bg-misc-button-hover-bg active:text-misc-button-active-color active:bg-misc-button-active-bg p-2 rounded"
                  href={href}
                  onClick={() => onCloseDrawer && onCloseDrawer()}
                >
                  <Icon className="w-[18px] h-[18px]" />
                </Link>
              </Tooltip>
            </li>
          )
        })}
      </ul>

      <div className="flex-grow bg-content-bg mt-2.5 mx-2.5 rounded p-2.5 shadow overflow-y-auto">
        <section className="my-2.5 first:mt-0">
          <h2 className="content-label">博客({allBlogPosts.length})</h2>
          <ol className="text-sm list-decimal pl-5">
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
        </section>

        <section className="my-2.5 first:mt-0">
          <h2 className="content-label">书籍({allBookCovers.length})</h2>
          <ul className="text-sm mx-2.5">
            {allBookCovers.map((bookCover) => {
              const chapters = chaptersByIsbn[bookCover.isbn]
              return (
                <li className="my-2" key={bookCover._id}>
                  <h3 className="my-1">{bookCover.title}</h3>
                  <h4 className="my-1">{bookCover.subtitle}</h4>
                  <Image
                    className="mx-auto"
                    src={bookCover.cover}
                    alt={`${bookCover}的封面`}
                    width={250}
                    height={328}
                  />
                  <ul className="my-1">
                    {chapters.map((chapter) => {
                      return (
                        <li key={chapter._id}>
                          <Link href={chapter._raw.sourceFileDir}>
                            第 {chapter.chapter} 章 - {chapter.title}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </li>
              )
            })}
          </ul>
        </section>
      </div>
    </nav>
  )
}

export default Sidebar
