export const ObjectGroupBy = <T>(
  items: T[],
  callbackFn: (arg0: T) => string | symbol
) => {
  return items.reduce(
    (
      obj: {
        [key: string | symbol]: T[]
      },
      item: T
    ) => {
      const key = callbackFn(item)
      if (!obj[key]) obj[key] = []
      obj[key].push(item)
      return obj
    },
    {}
  )
}
