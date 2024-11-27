"use client"
import { FaRegCopy, FaCheck } from "react-icons/fa"
import { useState } from "react"

export default function CopyButton({ text }: { text: string }) {
  const [isCopied, setIsCopied] = useState(false)

  return (
    <button
      className={`text-misc-button-icon-color hover:bg-misc-button-hover-bg p-1.5 rounded absolute top-1.5 right-1.5 group-hover:block ${
        isCopied ? "block" : "hidden"
      }`}
      aria-label="复制代码"
      onClick={() => {
        navigator.clipboard.writeText(text)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 1200)
      }}
    >
      {isCopied ? (
        <FaCheck className="w-4 h-4" />
      ) : (
        <FaRegCopy className="w-4 h-4" />
      )}
    </button>
  )
}
