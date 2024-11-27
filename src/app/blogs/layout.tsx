import { ReactNode } from "react"

export default async function Layout({ children }: { children: ReactNode }) {
  return children
}

export async function generateMetadata() {
  return {
    title: "博客 | lorem314.io-v18",
  }
}
