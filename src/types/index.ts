export type Tag = {
  name: string
  count: number
}

export type TocItem = {
  title: string
  items: TocItem[] | null
}

export type Toc = {
  items: TocItem[]
}
