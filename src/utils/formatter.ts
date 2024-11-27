export const formateDate = (date: string) => {
  const d = new Date(date)
  const yy = d.getFullYear()
  const mm = d.getMonth() + 1
  const dd = d.getDate()
  return `${yy} 年 ${mm} 月 ${dd} 日`
}

const timeUnits = [
  { divisor: 1000, unit: "秒" },
  { divisor: 60, unit: "分种" },
  { divisor: 60, unit: "小时" },
  { divisor: 24, unit: "天" },
  { divisor: 30, unit: "个月" },
  { divisor: 12, unit: "年" },
  { divisor: Number.POSITIVE_INFINITY },
]

export const getTimeAgo = (date: string) => {
  const elapse = Date.now() - new Date(date).getTime()
  let result = elapse
  for (let i = 0; i < timeUnits.length - 1; i++) {
    const { divisor, unit } = timeUnits[i]
    result = result / divisor
    if (result > timeUnits[i + 1].divisor) {
      continue
    } else {
      return `${Math.floor(result)} ${unit}`
    }
  }
}

export const urlFriendly = (title: string | undefined) => {
  if (!title) return undefined
  return title.replaceAll(/(\/|#|\s|&|\?|%)/g, "")
}

export const addSpaceAroundEn = (str: string) => {
  return str
    .replaceAll(
      /[a-zA-Z0-9:_@!',;=\-\.\[\]\$\(\)\*\+]+/g,
      (match) => ` ${match} `
    )
    .trim()
}
