// import Link from "next/link"

import CodeHikePre from "./CodeHikePre"
import { Ol, Ul, Blockquote, P } from "./blocks"
import { Code } from "./inlines"

const components = {
  CodeHikePre,
  ol: Ol,
  ul: Ul,
  blockquote: Blockquote,
  p: P,
  code: Code,
}

export default components
