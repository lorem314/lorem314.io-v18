import React from "react"

import { geistSans } from "@/fonts"
import ExternalLink from "../elements/ExternalLink"

const Footer = () => {
  return (
    <footer
      className={`text-center bg-content-bg -mx-2.5 p-4 shadow ${geistSans.className}`}
    >
      <p>lorem314.io-v18</p>
      <p>该网站使用 NextJS 构建</p>
      <p>
        若发现错误或有改正建议 欢迎
        <ExternalLink href="https://github.com/lorem314">提出</ExternalLink>或
        <ExternalLink href="https://space.bilibili.com/7909744/">
          私信
        </ExternalLink>
      </p>
    </footer>
  )
}

export default Footer
