import React from "react"

import { FaCodepen } from "react-icons/fa"
import { SiCodesandbox } from "react-icons/si"
import { FaGithub } from "react-icons/fa"
import { FaBilibili } from "react-icons/fa6"

import Tooltip from "@/components/ui/Tooltip"

const links = [
  { Icon: FaCodepen, title: "Codepen", href: "https://codepen.io/Number_DDD" },
  {
    Icon: SiCodesandbox,
    title: "CodeSandbox",
    href: "https://codesandbox.io/u/lorem314",
  },
  { Icon: FaGithub, title: "Github", href: "https://github.com/lorem314" },
  {
    Icon: FaBilibili,
    title: "Bilibili",
    href: "https://space.bilibili.com/7909744/",
  },
]

const Social = () => {
  return (
    <ul className="flex items-center gap-2.5">
      {links.map((link, index) => {
        const { Icon, title, href } = link
        return (
          <li key={index}>
            <Tooltip tip={title} placement="bottom">
              <a
                className="text-inherit rounded p-2 bg-misc-button-bg hover:bg-misc-button-hover-bg md:p-0 md:bg-transparent md:hover:bg-transparent flex items-center gap-1.5"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon className="w-[18px] h-[18px] md:w-4 md:h-4" />
                <span className="hidden md:block md:text-sm">{title}</span>
              </a>
            </Tooltip>
          </li>
        )
      })}
    </ul>
  )
}

export default Social

// const Item = React.memo(
//   ({ Icon, title, href }: { Icon: IconType; title: string; href: string }) => {
//     return (
//       <Tooltip tip={title} placement="bottom">
//         <a
//           className="text-inherit rounded p-2 bg-misc-button-bg hover:bg-misc-button-hover-bg md:p-0 md:bg-transparent md:hover:bg-transparent flex items-center gap-1.5"
//           href={href}
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Icon className="w-[18px] h-[18px] md:w-4 md:h-4" />
//           <span className="hidden md:block md:text-sm">{title}</span>
//         </a>
//       </Tooltip>
//     )
//   }
// )
