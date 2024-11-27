"use client"
import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { AppProgressBar } from "next-nprogress-bar"

import { AiOutlineTags } from "react-icons/ai"
import { VscListTree } from "react-icons/vsc"

import Header from "@/components/layouts/Header"
import Footer from "@/components/layouts/Footer"
import Sidebar from "@/components/layouts/Sidebar"
import Drawer from "@/components/ui/Drawer"

import useLocalStorage from "@/hooks/useLocalStorage"
import useClient from "@/hooks/useClient"
import useDrawer from "@/hooks/useDrawer"

import GlobalContext from "@/GlobalContext"

import "../styles/globals.css"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isClient = useClient()

  const [isLeftDrawerAlwaysCollapsed, setIsLeftDrawerAlwaysCollapsed] =
    useLocalStorage("is-left-drawer-always-collapsed", false)
  const [isRightDrawerAlwaysCollapsed, setIsRightDrawerAlwaysCollapsed] =
    useLocalStorage("is-right-drawer-always-collapsed", false)

  const [preferredTheme, setPreferredTheme] = useLocalStorage(
    "preferred-theme",
    "system"
  )
  const {
    isCollapsed: isLeftDrawerCollapsed,
    isOpen: isLeftDrawerOpen,
    handler: handleLeftDrawer,
  } = useDrawer({
    isAlwaysCollapsed: isLeftDrawerAlwaysCollapsed,
    mediaQuery: "(max-width: 1280px)",
  })

  const pathname = usePathname()
  const rightDrawerProps = getRightDrawerProps(pathname)
  const {
    isCollapsed: isRightDrawerCollapsed,
    isOpen: isRightDrawerOpen,
    handler: handleRightDrawer,
  } = useDrawer({
    isAlwaysCollapsed: false,
    mediaQuery: rightDrawerProps.mediaQuery,
  })

  // theme effect
  useEffect(() => {
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleThemeChange = ({ matches }: { matches: boolean }) => {
      if (matches) {
        document.documentElement.classList.remove("light")
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
        document.documentElement.classList.add("light")
      }
    }

    if (preferredTheme === "system") {
      darkQuery.addEventListener("change", handleThemeChange)
      const dataTheme = darkQuery.matches ? "dark" : "light"
      document.documentElement.classList.remove("light")
      document.documentElement.classList.remove("dark")
      document.documentElement.classList.add(dataTheme)
    } else {
      document.documentElement.classList.remove("light")
      document.documentElement.classList.remove("dark")
      document.documentElement.classList.add(preferredTheme)
    }

    return () => {
      darkQuery.removeEventListener("change", handleThemeChange)
    }
  }, [preferredTheme])

  const hasLeftDrawer = isLeftDrawerAlwaysCollapsed || isLeftDrawerCollapsed
  const hasRightDrawer = isRightDrawerAlwaysCollapsed || isRightDrawerCollapsed

  return (
    <html lang="ch">
      <body className="relative w-full h-full">
        <AppProgressBar
          height="4px"
          color="#ff0000"
          options={{ showSpinner: false }}
          shallowRouting
        />

        {isClient ? (
          <>
            <Header
              hasLeftDrawer={hasLeftDrawer}
              openLeftDrawer={handleLeftDrawer.open}
              hasRightDrawer={hasRightDrawer}
              openRightDrawer={handleRightDrawer.open}
              RightDrawerIcon={rightDrawerProps.icon}
            />

            {hasLeftDrawer ? (
              <Drawer
                isOpen={isLeftDrawerOpen}
                placement="left"
                size={320}
                onClose={handleLeftDrawer.close}
              >
                <Sidebar />
              </Drawer>
            ) : (
              <aside className="absolute top-[50px] bottom-0 left-0 w-[320px]">
                <Sidebar />
              </aside>
            )}

            <main
              id="page-container"
              className={`bg-bg-0 overflow-y-auto px-[10px] absolute top-[50px] right-0 bottom-0 ${
                hasLeftDrawer ? "left-0" : "left-[320px]"
              }`}
            >
              <GlobalContext.Provider
                value={{
                  test: "ok",
                  hasRightDrawer,
                  isRightDrawerOpen,
                  handleRightDrawer,
                  preferredTheme,
                  setPreferredTheme,
                  isLeftDrawerAlwaysCollapsed,
                  setIsLeftDrawerAlwaysCollapsed,
                  isRightDrawerAlwaysCollapsed,
                  setIsRightDrawerAlwaysCollapsed,
                }}
              >
                {children}
              </GlobalContext.Provider>
              <Footer />
            </main>
          </>
        ) : null}
      </body>
    </html>
  )
}

const getRightDrawerProps = (pathname: string) => {
  const splitted = pathname.split("/")
  const length = splitted.length

  if (length === 2 && splitted[1] === "blogs") {
    // /blogs
    return { mediaQuery: "(max-width: 1024px)", icon: AiOutlineTags }
  } else if (length === 3 && splitted[1] === "blogs") {
    // /blogs/[title]
    return { mediaQuery: "(max-width: 1024px)", icon: VscListTree }
  } else if (length === 4 && splitted[1] === "books") {
    // /books/[title]/[chapter]
    return { mediaQuery: "(max-width: 1024px)", icon: VscListTree }
  } else {
    return { mediaQuery: "(max-width: 0px)", icon: null }
  }
}

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// }
// className={`${geistSans.variable} ${geistMono.variable} antialiased`}
