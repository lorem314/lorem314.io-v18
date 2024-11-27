import type { DetailedHTMLProps, HTMLAttributes } from "react"

type HeadingProps = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>

export const H2 = (props: HeadingProps) => {
  return (
    <h2 id={props.id} className={props.className}>
      {props.children}
    </h2>
  )
}

export const H3 = (props: HeadingProps) => {
  return (
    <h3 id={props.id} className={props.className}>
      {props.children}
    </h3>
  )
}

export const H4 = (props: HeadingProps) => {
  return (
    <h4 id={props.id} className={props.className}>
      {props.children}
    </h4>
  )
}

export const H5 = (props: HeadingProps) => {
  return (
    <h5 id={props.id} className={props.className}>
      {props.children}
    </h5>
  )
}

export const H6 = (props: HeadingProps) => {
  return (
    <h6 id={props.id} className={props.className}>
      {props.children}
    </h6>
  )
}
