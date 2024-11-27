import React from "react"
import { Metadata } from "next"

import ExternalLink from "@/components/elements/ExternalLink"
import AllBlogPosts from "@/components/sidebar/AllBlogPosts"

const HomePage = () => {
  return (
    <section className="max-w-xl bg-content-bg mx-auto my-8 rounded px-6 py-4 shadow">
      <h2 className="content-label">主页</h2>
      <p className="text-center">欢迎来到我的博客</p>

      <section className="my-2">
        <h3 className="content-label">博客</h3>
        <AllBlogPosts />
      </section>

      <section className="my-2">
        <h3 className="content-label">你也可以从以下地方找到我</h3>
        <div>
          <ExternalLink href="https://space.bilibili.com/7909744/">
            B 站
          </ExternalLink>
        </div>
        <div>
          <ExternalLink href="https://steamcommunity.com/profiles/76561198174551770/">
            Steam
          </ExternalLink>
        </div>
      </section>
    </section>
  )
}

export default HomePage

export const metadata: Metadata = {
  title: "主页 | lorem314.io-v18",
}
