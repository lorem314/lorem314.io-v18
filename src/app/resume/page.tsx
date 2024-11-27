import React from "react"

import { geistSans } from "@/fonts"

const Resume = () => {
  return (
    <section
      className={`text-sm md:text-base max-w-[58rem] shadow rounded mx-auto my-8 px-6 py-4 bg-content-bg ${geistSans.className}`}
    >
      {/*  */}

      <header className="flex justify-between mb-4">
        <div className="flex flex-col justify-evenly items-center">
          <h3 className="text-xl sm:text-3xl font-bold">党子寅</h3>
          <h4 className="text-2xl sm:text-4xl font-bold">React 前端</h4>
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
        <p className="my-1">
          毕业后考虑去日本留学，花了一段时间学习日语、巩固英语，备考等级证书，并在
          Coursera
          上完成了深度学习等机器学习相关课程，撰写研究计划书，研究方向为：基于机器学习的推荐系统。
        </p>
        <p className="my-1">
          之后由于疫情，没能按照计划留学，故准备就职。在通过
          youtube、各种书籍和官网等途径又学习了一段时间 React
          相关技术、开发了一些个人项目后，开始投放简历。
        </p>
        <p className="my-1">
          擅长 React 前端开发，一直有关注与其技术栈相关的最新发展动向。熟悉
          Redux 和 MobX 等状态管理库；能使用 webpack 和 babel 构建 React
          开发环境；也在 Node 上用 express
          写过后端服务器，打算在之后转型为全栈开发。目前也在学习 Three.js。
        </p>
        <p className="my-1">
          会用 Git、能阅读英文文档和使用 Google 查找问题的解决方案。
        </p>
        <p className="my-1">
          爱好模拟沙盒建造类游戏、Blender 3D 建模、美剧和电子板绘。
        </p>
        <p className="my-1">
          对自我的评价是：为人理性，善于思考，学习能力强，乐于尝试新的技术。
        </p>
      </section>

      {/* 教育背景 */}
      <section className="my-4">
        <h5 className="content-label">教育背景</h5>
        <div className="flex flex-col md:flex-row justify-between">
          <div>北京工业大学 (211 - 4 年制)</div>
          <div>计算机科学与技术 (本科)</div>
          <div>2014 年 - 2018 年</div>
        </div>
        <p>
          大一进入网络部，和其他部员管理校园网论坛；大二上学期末随全班同学前往法国，进行为期
          1
          个月的学习生活体验；大三参加蓝桥杯编程比赛并荣获二等奖，帮助老师修改历届学生的
          PHP 网页项目；大四毕业实习用编写课程表微信小程序。
        </p>
      </section>

      {/* 项目 */}
      <section className="my-4">
        <h5 className="content-label">项目</h5>
        <section className="my-1">
          <header className="flex justify-between">
            <h6 className="font-bold">lorem314.io</h6>
            <div>个人博客网站</div>
          </header>
          <div>
            <p className="my-0.5">
              简介：个人博客网站。即该网站，用于记录平时写的笔记、翻译的书籍。采用响应式设计、自定义
              React Hooks，防抖搜索，可切换白天、黑夜颜色模式。
            </p>
          </div>
          <footer className="flex justify-between">
            <div>
              Git 地址：
              <a
                href="https://github.com/lorem314/lorem314.io-v18"
                target="_blank"
                rel="noopener noreferrer"
              >
                第 18 版
              </a>
            </div>
            <div>
              在线预览：
              <a
                href="http://lorem314.site:8018"
                target="_blank"
                rel="noopener noreferrer"
              >
                第 18 版
              </a>
            </div>
          </footer>
        </section>

        <section className="my-1">
          <header className="flex justify-between">
            <h6 className="font-bold">MERN-Social </h6>
            <div>社交应用网站</div>
          </header>
          <div>
            <p className="my-0.5">
              简介：使用 MongoDB、Express 和 React 在 Node
              上开发的全栈社交应用网站。用户可以注册后登录；用户之间可以相互
              关注、发布动态、上传视频和在动态、视频下评论和点赞，评论支持多次嵌套。用户之间可以发送消息。
            </p>
            <p className="my-0.5">
              用户在前端的不同操作，通过 fetch 向后端不同的 URL 发送请求，后端用
              express 定义 router、在 router 中通过中间件访
              问数据库，并返回响应。
            </p>
            <ul className="list-disc columns-2 px-6">
              <li>前端用 styled-components 编写样式</li>
              <li>前端用 react-hook-form 管理表单状态</li>
              <li>前端用 react-router 定义浏览器路由</li>
              <li>后端用 express 编写服务器</li>
              <li>后端用 mongoose 库与 MongoDB 数据库交互</li>
              <li>后端使用 Redis 缓存用户注册验证码</li>
              <li>后端用 nodemailer 向用户邮箱发送验证码</li>
              <li>后端用 crypto 和 JWT 加密用户密码和登录密匙</li>
              <li>用 accessToken 和 refreshToken 增强用户安全</li>
              <li>用 socket.io 实现简单聊天功能</li>
            </ul>
          </div>
          <footer className="flex justify-between">
            <div>
              Git 地址：
              <a
                href="https://github.com/lorem314/mern-project-v6"
                target="_blank"
                rel="noopener noreferrer"
              >
                第 6 版
              </a>{" "}
              |{" "}
              <a
                href="https://github.com/lorem314/mern-project-v9"
                target="_blank"
                rel="noopener noreferrer"
              >
                第 9 版
              </a>
            </div>
          </footer>
        </section>

        <section className="my-1">
          <header className="flex justify-between">
            <h6 className="font-bold">nextjs-todo-list</h6>
            <div>代办清单管理页面</div>
          </header>
          <div>
            <p className="my-0.5">
              简介：用 TypeScript 在 NextJS 上开发的待办事项列表程序。
            </p>
            <ul className="list-disc columns-2 px-6">
              <li>用 trpc 和 NextJS 中的 API Routes 定义后端路由</li>
              <li>用 prisma 访问 mysql 数据库</li>
              <li>用 zod 和 TypeScript 实现前后端代码的类型统一</li>
            </ul>
          </div>
          <footer className="flex justify-between">
            <div>
              Git 地址：
              <a
                href="https://github.com/lorem314/nextjs-todos"
                target="_blank"
                rel="noopener noreferrer"
              >
                第 1 版
              </a>
            </div>
          </footer>
        </section>
      </section>

      {/* 技术栈 */}
      {/* <section className="my-4">
        <h5 className="content-label">技术栈</h5>
        <ul className="list-disc columns-4 px-6">
          <li>webpack</li>
          <li>React</li>
          <li>Redux</li>
          <li>MobX</li>
          <li>NextJS</li>
          <li>react-router</li>
          <li>react-hook-form</li>
          <li>express</li>
          <li>MongoDB</li>
          <li>MySQL</li>
          <li>Redis</li>
        </ul>
      </section> */}

      {/* 证书 */}
      <section className="my-4">
        <h5 className="content-label">证书</h5>
        <div className="flex justify-between">
          <div>日语 N1 (112/180)</div>
          <div>日语 N2 (123/180)</div>
          <div>英语 TOEIC (845/990)</div>
        </div>
        <div>
          <a href="http://" target="_blank" rel="noopener noreferrer">
            Coursera 深度学习(Deep Learning) 结业证明
          </a>
        </div>
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

const info = {
  手机: "13810104237",
  邮箱: "dzy314225@126.com",
  地址: "北京-朝阳-常营（6 号线）",
  "B 站": (
    <a href="http://" target="_blank" rel="noopener noreferrer">
      lorem314
    </a>
  ),
}
// const projects = [{ title: "", type: "", description: "" }]
