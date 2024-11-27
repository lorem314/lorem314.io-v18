import type { DetailedHTMLProps, LinkHTMLAttributes } from "react"

import { FaExternalLinkAlt } from "react-icons/fa"

const ExternalLink = (
  props: DetailedHTMLProps<LinkHTMLAttributes<HTMLElement>, HTMLElement>
) => (
  <a
    className="inline-flex items-center gap-0.5"
    href={props.href}
    target="_blank"
    rel="noopener noreferrer"
  >
    {props.children}
    <FaExternalLinkAlt className="w-3 h-3" />
  </a>
)

export default ExternalLink
