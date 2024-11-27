import { AnnotationHandler } from "codehike/code"

const link: AnnotationHandler = {
  name: "link",
  Inline: ({ annotation, children }) => {
    const { query } = annotation
    return (
      <a href={query} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  },
}

export default link
