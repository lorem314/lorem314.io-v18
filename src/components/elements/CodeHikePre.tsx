import type { RawCode } from "codehike/code"
import { Pre, highlight } from "codehike/code"

import { firaCode } from "@/fonts"
import CopyButton from "../ch-handlers/CopyButton"
import lineNumbers from "../ch-handlers/line-numbers"
import callout from "../ch-handlers/callout"
import mark from "../ch-handlers/mark"
import link from "../ch-handlers/link"
import className from "../ch-handlers/class-name"

async function CodeHikePre({ codeblock }: { codeblock: RawCode }) {
  const highlighted = await highlight(codeblock, "github-from-css")
  const meta = parseMeta(highlighted.meta)

  const handlers = [className, callout, mark, link]

  if (!meta.noLineNumber) {
    handlers.push(lineNumbers)
  }

  return (
    <div className="group relative my-4 rounded border border-ch-border-color text-sm md:text-base">
      {meta.title ? (
        <div className="px-4 py-2 rounded-t border-b border-ch-border-color text-ch-pre-title-foreground bg-ch-pre-title-background">
          {meta.title}
        </div>
      ) : null}
      {meta.noCopyButton ? null : <CopyButton text={highlighted.code} />}
      <div
        className={`overflow-auto px-4 py-2 ${
          meta.title ? "rounded-b" : "rounded"
        }`}
      >
        <Pre
          className={firaCode.className}
          code={highlighted}
          handlers={handlers}
        />
      </div>
    </div>
  )
}

export default CodeHikePre

const parseMeta = (rawMeta: string) => {
  const iterator = rawMeta.matchAll(/([a-zA-Z]+)(?:="(.+?)")?/g)
  const meta: { [key: string]: string | number | boolean } = {}
  for (const match of iterator) {
    const key = match[1]
    const value = match[2]
    if (value === undefined) meta[key] = true
    else meta[key] = value
  }
  return meta
}
