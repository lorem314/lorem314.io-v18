"use client"
import React, { useContext } from "react"

import Drawer from "../ui/Drawer"
import Actions from "./Actions"
import LinkedToc from "./LinkedToc"

import GlobalContext from "@/GlobalContext"
import type { Toc } from "@/types"

const Article = ({
  header,
  renderedBody,
  footer,
  title,
  toc,
}: {
  header: JSX.Element
  renderedBody: JSX.Element
  footer?: JSX.Element
  title: string
  toc: Toc
}) => {
  const { hasRightDrawer, isRightDrawerOpen, handleRightDrawer } =
    useContext(GlobalContext)

  return (
    <div
      id="article"
      className={`relative max-w-[82rem] mx-auto my-8 grid gap-2.5 ${
        hasRightDrawer
          ? "grid-cols-1 md:grid-cols-[2rem_minmax(0,_auto)]"
          : "grid-cols-[2rem_minmax(0,_auto)_minmax(0,_24rem)]"
      }`}
    >
      {/*  */}

      <div className="hidden md:block">
        <Actions />
      </div>

      <article id="article">
        <header className="bg-content-bg mb-2.5 px-6 py-4 lg:py-6 rounded shadow">
          {header}
        </header>

        <section
          id="body-container"
          className="bg-content-bg p-6 rounded shadow"
        >
          {renderedBody}
        </section>

        {footer ? (
          <footer className="bg-content-bg mt-2.5 px-6 py-4 rounded shadow">
            {footer}
          </footer>
        ) : null}
      </article>

      {hasRightDrawer ? (
        <Drawer
          isOpen={isRightDrawerOpen}
          title="目录"
          placement="right"
          size={300}
          onClose={handleRightDrawer.close}
        >
          {() => {
            return (
              <div className="p-2.5">
                <LinkedToc title={title} toc={toc} />
              </div>
            )
          }}
        </Drawer>
      ) : (
        <div>
          <div className="bg-content-bg px-4 py-2.5 rounded shadow sticky top-2.5 max-h-[calc(100vh-50px-2rem-10px)] overflow-y-auto">
            <LinkedToc title={title} toc={toc} />
          </div>
        </div>
      )}

      {/*  */}
    </div>
  )
}

export default Article
