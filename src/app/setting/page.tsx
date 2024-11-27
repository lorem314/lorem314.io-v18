"use client"
import React, { useContext } from "react"

import GlobalContext from "@/GlobalContext"

const SettingPage = () => {
  const {
    preferredTheme,
    setPreferredTheme,
    isLeftDrawerAlwaysCollapsed,
    setIsLeftDrawerAlwaysCollapsed,
    isRightDrawerAlwaysCollapsed,
    setIsRightDrawerAlwaysCollapsed,
  } = useContext(GlobalContext)

  return (
    <div className="max-w-[32rem] shadow rounded mx-auto my-8 px-6 py-4 bg-content-bg">
      <h2 className="content-label">设置</h2>

      <label className="flex items-center gap-1" htmlFor="preferred-theme">
        主题
        <select
          id="preferred-theme"
          value={preferredTheme}
          onChange={(event) => {
            console.log("event", event.target.value)
            setPreferredTheme(event.target.value)
          }}
        >
          <option value="system">系统</option>
          <option value="light">白天</option>
          <option value="dark">黑夜</option>
        </select>
      </label>

      <label
        className="my-2 flex items-center gap-1"
        htmlFor="is-left-drawer-always-collapsed"
      >
        <input
          type="checkbox"
          id="is-left-drawer-always-collapsed"
          checked={isLeftDrawerAlwaysCollapsed}
          onChange={(event) => {
            setIsLeftDrawerAlwaysCollapsed(event.target.checked)
          }}
        />
        总是折叠左侧抽屉
      </label>

      <label
        className="my-2 flex items-center gap-1"
        htmlFor="is-right-drawer-always-collapsed"
      >
        <input
          type="checkbox"
          id="is-right-drawer-always-collapsed"
          checked={isRightDrawerAlwaysCollapsed}
          onChange={(event) => {
            setIsRightDrawerAlwaysCollapsed(event.target.checked)
          }}
        />
        总是折叠右侧抽屉
      </label>
    </div>
  )
}

export default SettingPage
