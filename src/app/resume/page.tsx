import React from "react"

import { geistSans } from "@/fonts"
import ExternalLink from "@/components/elements/ExternalLink"

const Resume = () => {
  return (
    <section
      className={`text-sm md:text-base max-w-[64rem] shadow rounded mx-auto my-8 px-6 py-4 bg-content-bg ${geistSans.className}`}
    >
      {/*  */}

      <header className="flex justify-between my-4 px-4">
        <div className="flex flex-col justify-evenly items-center text-label-color">
          <h3 className="text-2xl sm:text-4xl font-bold">党子寅</h3>
          <h4 className="text-xl sm:text-3xl font-bold">React 前端开发</h4>
        </div>
        <div>
          {Object.entries(info).map(([key, value], index) => {
            return (
              <div key={index} className="basis-[36rem] flex">
                <span className="mr-4">{key}</span>
                <span className="mr-4">{value}</span>
              </div>
            )
          })}
        </div>
      </header>

      {/* 简介 */}
      <section className="my-4">
        <h5 className="content-label">简介</h5>
        {intro.map((element, index) => {
          return (
            <p className="my-1" key={index}>
              {element}
            </p>
          )
        })}
      </section>

      {/* 教育背景 */}
      <section className="my-4">
        <h5 className="content-label">教育背景</h5>
        <div className="my-1 flex flex-col md:flex-row justify-between">
          <div>{university.name}</div>
          <div>{university.major}</div>
          <div>
            {university.during.start} — {university.during.end}
          </div>
        </div>
        <p>{university.description.join("")}</p>
      </section>

      {/* 工作经历 */}
      <section className="my-4">
        <h5 className="content-label">工作经历</h5>
        <ul>
          {jobs.map((item, index) => {
            return (
              <li className="my-2" key={index}>
                <header className="flex justify-between">
                  <h6 className="font-bold">{item.company}</h6>
                  <div>
                    {item.during.start} — {item.during.end}
                  </div>
                </header>
                <p className="my-0.5">{item.description}</p>
              </li>
            )
          })}
        </ul>
      </section>

      {/* 个人项目 */}
      <section className="my-4">
        <h5 className="content-label">个人项目</h5>
        <ul className="flex flex-col gap-2.5">
          {projects.map((item, index) => {
            return (
              <li key={index} className="">
                <header className="flex justify-between">
                  <h6 className="font-bold">{item.title}</h6>
                  <div>{item.subtitle}</div>
                </header>
                <p className="my-1">{item.description}</p>
                {item?.git ? (
                  <div className="inline-flex gap-2">
                    Git 地址：
                    {item.git.map((g, index) => {
                      return (
                        <ExternalLink href={g.href}>{g.title}</ExternalLink>
                      )
                    })}
                  </div>
                ) : null}
                <ul className="my-1 list-disc pl-6 md:columns-2">
                  {item.features.map((feature, index) => {
                    return <li key={index}>{feature}</li>
                  })}
                </ul>
              </li>
            )
          })}
        </ul>
      </section>

      {/* 证书 */}
      <section className="my-4">
        <h5 className="content-label">证书</h5>
        <ul className="pl-6 list-disc grid grid-cols-2">
          {certificates.map((item, index) => {
            return (
              <li key={index}>
                {item.href ? (
                  <ExternalLink href={item.href}>{item.title}</ExternalLink>
                ) : (
                  item.title
                )}
              </li>
            )
          })}
        </ul>
      </section>

      {/*  */}
    </section>
  )
}

export default Resume

export async function generateMetadata() {
  return {
    title: "简历 | lorem314.io-v18",
  }
}

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

const info = {
  手机: "13810104237",
  邮箱: "dzy314225@126.com",
  地址: "北京-朝阳-常营（6 号线）",
  "B 站": (
    <ExternalLink href="https://space.bilibili.com/7909744/">
      lorem314
    </ExternalLink>
  ),
}

const intro = [
  <>
    毕业后考虑去日本留学，花了一段时间学习日语、巩固英语，备考等级证书，在
    <ExternalLink href="https://www.coursera.org/">Coursera</ExternalLink>
    网站上完成了机器学习和深度学习相关的课程后，编写研究计划书，研究方向为：基于机器学习的推荐系统设计。之后由于疫情，未能按计划留学。
  </>,
  <>
    擅长 React 开发，一直在关注与其技术栈相关的最新发展动向，在 NodeJS 上用
    express 写过后端服务，能用 webpack 构建 MERN 全栈开发环境。写过 TS。熟悉
    Vue3 和 Spring Boot。了解 MySQL 语句。目前也在学习 Three.js 和 React Three
    Fiber。
  </>,
  <>熟练使用 Git，阅读英文文档，遇到问题时能通过 Google 查找问题的解决方案。</>,
  <>爱好沙盒建造类游戏，平时会用 Blender 做 3D 建模，看美剧和电子板绘。</>,
  <>个人评价是：为人理性，学习能力强，乐于尝试新的技术。</>,
]

const university = {
  name: "北京工业大学(211 - 4年制)",
  major: "计算机科学与技术(本科)",
  during: { start: "2014 年 9 月", end: "2018 年 6 月" },
  description: [
    "大一进入网络部，和其他部员管理校园网论坛；",
    "大二上学期随全班同学前往法国，进行为期 1 个月的学习生活体验；",
    "大三参加蓝桥杯编程比赛并荣获二等奖，帮助 HTML 老师修改历届学生的 PHP 网页项目；",
    "大四实习用微信开发者工具编写课程表微信小程序。",
  ],
}

const jobs = [
  {
    company: "北京百厚科技有限公司",
    during: { start: "2022 年 10 月", end: "至今" },
    description: (
      <>
        用 Vue3 中的组合式语法编写前端页面。UI 库使用 Primevue，用 Vuelidate
        进行表单验证。也写过一些 Spring Boot Java，主要设计后端 RESTful
        API，通过编写 Entity、Controller、Service 和 Repository 与 MySQL
        数据库交互。
      </>
    ),
  },
  {
    company: "天依科技",
    during: { start: "2021 年 10 月", end: "2021 年 12 月" },
    description: <>用 React Native 编写移动端页面。用 Ant Design 设计页面。</>,
  },
]

const projects = [
  {
    title: "lorem314.io",
    subtitle: "个人博客网站",
    description: (
      <>
        个人博客网站，即该网站。用于记录平时写的笔记和翻译的英文书籍。使用
        Next.js 开发。成功通过 ICP 备案后部署。
      </>
    ),
    git: [
      {
        title: "第 18 版",
        href: "https://github.com/lorem314/lorem314.io-v18",
      },
    ],
    features: [
      "采用响应式设计，适配不同屏幕大小",
      "编写自定义可重用 React 组件和 Hooks",
      "防抖搜索",
      "可切换白天/黑夜颜色模式",
    ],
  },
  {
    title: "MERN-Social",
    subtitle: "社交应用网站",
    description: (
      <>
        使用 MongoDB、Express 和 React 在 Node
        上开发的全栈社交应用网站。功能包括：用户注册和登录；用户之间相互关注、发布动态、上传视频和在动态、视频下评论和点赞，评论支持多次嵌套。用户之间可以发送消息。可线下展示。
      </>
    ),
    git: [
      { title: "第 6 版", href: "https://github.com/lorem314/mern-project-v6" },
      { title: "第 9 版", href: "https://github.com/lorem314/mern-project-v9" },
    ],
    features: [
      "前端用 styled-components 编写样式",
      "前端用 react-hook-form 管理表单状态",
      "前端用 react-router 定义浏览器路由",
      "后端用 redis 缓存用户注册验证码",
      "后端用 nodemailer 向用户邮箱发送验证码",
      "后端用 express 定义 RESTful api 接收前端请求",
      "后端用 crypto 和 JWT 分别加密用户密码和 accessToken、refreshToken",
      "后端用 mongoose 库定义 User、Post、Video 等文档模型并与数据库交互",
      "用 accessToken 和 refreshToken 增强用户访问安全和用户持久化登录",
      "用 socket.io 实现简单聊天功能",
    ],
  },
  {
    title: "nextjs-todo-list",
    subtitle: "代办清单管理页面",
    description: (
      <>
        使用 Next.js 框架和 TypeScript
        开发。可以添加、删除代办事项的简单网页应用。
      </>
    ),
    git: [
      { title: "第 1 版", href: "https://github.com/lorem314/nextjs-todos" },
    ],
    features: [
      "用 trpc 和 Next.js 中的 API routes 定义后端路由",
      "用 zod 和 TypeScript 实现前后端代码类型统一",
      "用 Prisma 提供的 API 与 MySQL 数据库交互",
    ],
  },
]

const certificates = [
  { title: "日语 N1 (112/180)" },
  { title: "日语 N2 (123/180)" },
  { title: "英语 TOEIC (845/990)" },
  {
    title: "Coursera 深度学习结业证明",
    href: "https://www.coursera.org/account/accomplishments/specialization/UV4T76MU9Q29",
  },
]
