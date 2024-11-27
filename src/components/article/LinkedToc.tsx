import React, {
  createRef,
  forwardRef,
  MouseEvent,
  useImperativeHandle,
  useRef,
} from "react"
import { VscCollapseAll, VscExpandAll } from "react-icons/vsc"

import Details from "../elements/Details"
import { urlFriendly, addSpaceAroundEn } from "@/utils/formatter"
import { Toc, TocItem } from "@/types"

type LinkedTocProps = {
  title: string
  toc: Toc
}

const LinkedToc = ({ title, toc }: LinkedTocProps) => {
  const refDetails = useRef<{ open: () => void; close: () => void }>(null)
  const refItems = useRef<{ openAll: () => void; closeAll: () => void }>(null)

  const openAll = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    refDetails.current?.open()
    refItems.current?.openAll()
  }
  const closeAll = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    refDetails.current?.close()
    refItems.current?.closeAll()
  }

  return (
    <div>
      <Details ref={refDetails} isOpen={true}>
        <div className="details-head group">
          <h1 className="font-bold">{addSpaceAroundEn(title)}</h1>
          <div className="flex-grow" />
          <button
            className="opacity-0 group-hover:opacity-50 group-hover:hover:opacity-100 w-6 h-6 flex justify-center items-center"
            onClick={openAll}
          >
            <VscExpandAll className="w-5 h-5" />
          </button>
          <button
            className="opacity-0 group-hover:opacity-50 group-hover:hover:opacity-100 w-6 h-6 flex justify-center items-center"
            onClick={closeAll}
          >
            <VscCollapseAll className="w-5 h-5" />
          </button>
        </div>
        <Items ref={refItems} items={toc.items} level={0} />
      </Details>
    </div>
  )
}

export default LinkedToc

const Items = forwardRef(
  ({ items, level }: { items: TocItem[]; level: number }, ref) => {
    const refs = useRef(
      items.map(() =>
        createRef<{ openAll: () => void; closeAll: () => void }>()
      )
    )

    useImperativeHandle(
      ref,
      () => ({
        openAll: () => refs.current.forEach((ref) => ref.current?.openAll()),
        closeAll: () => refs.current.forEach((ref) => ref.current?.closeAll()),
      }),
      []
    )

    if (items.length === 0) return null
    return (
      <ul className="tree-list">
        {items.map((item, index) => {
          return (
            <li key={index}>
              <Item ref={refs.current[index]} item={item} level={level} />
            </li>
          )
        })}
      </ul>
    )
  }
)

Items.displayName = "LinkedToc-Items"

const Item = forwardRef(
  ({ item, level }: { item: TocItem; level: number }, ref) => {
    const refDetails = useRef<{ open: () => void; close: () => void }>(null)
    const refItems = useRef<{ openAll: () => void; closeAll: () => void }>(null)

    const openAll = (event: MouseEvent<HTMLButtonElement>) => {
      event?.stopPropagation()
      refDetails.current?.open()
      refItems.current?.openAll()
    }
    const closeAll = (event: MouseEvent<HTMLButtonElement>) => {
      event?.stopPropagation()
      refDetails.current?.close()
      refItems.current?.closeAll()
    }

    useImperativeHandle(ref, () => ({ closeAll, openAll }), [])

    const hashtagLink = urlFriendly(item.title)

    if (item.items?.length === 0) {
      return <a href={`#${hashtagLink}`}>{item.title}</a>
    } else {
      return (
        <Details ref={refDetails} isOpen={true}>
          <div
            className={`details-head group ${
              item.items?.length === 0 ? "no-items-item" : ""
            }`}
          >
            <a
              href={`#${hashtagLink}`}
              onClick={(event) => event.stopPropagation()}
            >
              {item.title}
            </a>
            <div className="flex-grow" />
            <button
              className="opacity-0 group-hover:opacity-50 group-hover:hover:opacity-100 w-6 h-6 flex justify-center items-center"
              onClick={openAll}
            >
              <VscExpandAll className="w-5 h-5" />
            </button>
            <button
              className="opacity-0 group-hover:opacity-50 group-hover:hover:opacity-100 w-6 h-6 flex justify-center items-center"
              onClick={closeAll}
            >
              <VscCollapseAll className="w-5 h-5" />
            </button>
          </div>
          <Items ref={refItems} items={item.items || []} level={level + 1} />
        </Details>
      )
    }
  }
)

Item.displayName = "LinkedToc-Item"
