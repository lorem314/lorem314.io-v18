import { ReactNode } from "react"

export default async function Layout({ children }: { children: ReactNode }) {
  return children
}

export async function generateMetadata() {
  return {
    title: "设置 | lorem314.io-v18",
  }
}
