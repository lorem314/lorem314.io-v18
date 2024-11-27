import React from "react"
import type { HTMLAttributes } from "react"

import { geistMono } from "@/fonts"

export const Code = (props: HTMLAttributes<HTMLElement>) => (
  <code
    className={`text-[#27272a] dark:text-[#e4e4e7] bg-[#f4f4f5] dark:bg-[#18181b] border border-[#e4e4e7] dark:border-[#27272a] rounded text-sm px-1.5 py-0.5 inline-flex items-center ${geistMono.className}`}
  >
    {props.children}
  </code>
)

// export const U = (props: HTMLAttributes<HTMLElement>) => (
//   <u className="underline-offset-2">{props.children}</u>
// )
