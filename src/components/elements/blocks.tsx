import React from "react"
import type {
  DetailedHTMLProps,
  BlockquoteHTMLAttributes,
  HTMLAttributes,
} from "react"

import { geistSans } from "@/fonts"

export const P = (
  props: DetailedHTMLProps<
    HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  >
) => (
  <p className={`my-4 leading-7 tracking-normal ${geistSans.className}`}>
    {props.children}
  </p>
)

export const Blockquote = (
  props: DetailedHTMLProps<BlockquoteHTMLAttributes<HTMLElement>, HTMLElement>
) => (
  <blockquote className="my-4 border-l-4 pl-4 border-neutral-500">
    {props.children}
  </blockquote>
)

export const Ul = (props: HTMLAttributes<HTMLUListElement>) => {
  return <ul className="list-disc my-4 pl-6">{props.children}</ul>
}

export const Ol = (props: HTMLAttributes<HTMLOListElement>) => {
  return <ol className="list-decimal my-4 pl-6">{props.children}</ol>
}
