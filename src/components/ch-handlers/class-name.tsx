import { AnnotationHandler } from "codehike/code"

const className: AnnotationHandler = {
  name: "className",
  Block: ({ annotation, children }) => {
    return <div className={annotation.query}>{children}</div>
  },
  Inline: ({ annotation, children }) => {
    return <span className={annotation.query}>{children}</span>
  },
}

export default className
