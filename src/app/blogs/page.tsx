"use client"
import React, {
  useState,
  useContext,
  useMemo,
  useCallback,
  useEffect,
  type MouseEvent,
  type ChangeEvent,
} from "react"
import { allBlogPosts, type BlogPost } from "contentlayer/generated"

import Search from "@/components/blogs/Search"
import Select from "@/components/blogs/Select"
import Drawer from "@/components/ui/Drawer"
import BlogList from "@/components/blogs/BlogList"
import AllTags from "@/components/blogs/AllTags"
import useDebounce from "@/hooks/useDebounce"
import GlobalContext from "@/GlobalContext"
import type { Tag } from "@/types"

const BlogsPage = () => {
  const [blogs, setBlogs] = useState(allBlogPosts)
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [isOrLogic, setIsOrLogic] = useState(true)
  const allTags = useMemo(() => collectAllTags(allBlogPosts), [])
  const [searchTerm, setSearchTerm] = useState("")
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const { hasRightDrawer, isRightDrawerOpen, handleRightDrawer } =
    useContext(GlobalContext)

  const handleSelectTag = useCallback(
    (tag: Tag) => (event: MouseEvent | KeyboardEvent) => {
      setSelectedTags((prevSelectedTags) => {
        const hasSelected = prevSelectedTags.includes(tag)
        if (hasSelected) {
          event.stopPropagation()
          return prevSelectedTags.filter((selectedTag) => selectedTag !== tag)
        } else {
          if (event.shiftKey) return [...prevSelectedTags, tag]
          else return [tag]
        }
      })
    },
    []
  )

  const clearSelectedTags = useCallback(() => setSelectedTags([]), [])

  const handleChangeSearchTerm = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value)
    },
    []
  )

  const toggleFilterLogic = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation()
      setIsOrLogic((_) => !_)
    },
    []
  )

  useEffect(() => {
    const blogs = allBlogPosts
      .filter((blog) => {
        if (debouncedSearchTerm.length === 0) return true
        const lowercasedSearchTerm = debouncedSearchTerm.toLowerCase()
        const lowercasedBlogTitle = blog.title.toLowerCase()
        return lowercasedBlogTitle.includes(lowercasedSearchTerm)
      })
      .filter((blog) => {
        if (selectedTags.length === 0) return true
        return selectedTags
          .map((tag) => blog.tags.includes(tag.name))
          [isOrLogic ? "some" : "every"]((b) => b)
      })
    setBlogs(blogs)
  }, [debouncedSearchTerm, selectedTags, isOrLogic])

  return (
    <div className="max-w-[72rem] mx-auto my-8 grid grid-cols-5 gap-2.5">
      <section className="rounded p-2.5 shadow bg-content-bg col-span-5 flex flex-col gap-2.5 md:grid md:grid-cols-2">
        <Search
          searchTerm={searchTerm}
          handleChangeSearchTerm={handleChangeSearchTerm}
        />
        <Select
          options={allTags}
          selectedTags={selectedTags}
          onSelectTag={handleSelectTag}
          clearSelectedTags={clearSelectedTags}
          isOrLogic={isOrLogic}
          toggleFilterLogic={toggleFilterLogic}
        />
      </section>

      <section
        className={`rounded p-2.5 shadow bg-content-bg ${
          hasRightDrawer ? "col-span-full" : "col-span-3"
        }`}
      >
        <h3 className="content-label">博客</h3>
        <BlogList blogs={blogs} />
      </section>

      {hasRightDrawer ? (
        <Drawer
          isOpen={isRightDrawerOpen}
          title="所有标签"
          placement="right"
          size={320}
          onClose={handleRightDrawer.close}
        >
          {() => {
            return (
              <div className="p-2.5">
                <AllTags
                  allTags={allTags}
                  selectedTags={selectedTags}
                  handleSelectTag={handleSelectTag}
                />
              </div>
            )
          }}
        </Drawer>
      ) : (
        <section className="rounded p-2.5 shadow bg-content-bg col-span-2">
          <h3 className="content-label">所有标签</h3>
          <AllTags
            allTags={allTags}
            selectedTags={selectedTags}
            handleSelectTag={handleSelectTag}
          />
        </section>
      )}
    </div>
  )
}

export default BlogsPage

const collectAllTags = (blogs: BlogPost[]) => {
  const tags: Tag[] = []
  blogs.forEach((blog) => {
    blog.tags.forEach((tagName) => {
      const targetTag = tags.find((tag) => tag.name === tagName)
      if (!targetTag) tags.push({ name: tagName, count: 1 })
      else targetTag.count++
    })
  })
  return tags
}
