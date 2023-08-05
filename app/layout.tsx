import "@/styles/globals.css"
import { Metadata } from "next"
import { Urbanist } from "next/font/google"
import localFont from "next/font/local"
import Provider from "@/providers/provider"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import Footer from "@/components/footer"

const urbanist = Urbanist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

const IranSans = localFont({
  src: [{ path: "../public/fonts/IRANSansX-Regular.ttf", style: "normal" }],
})

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={cn(IranSans.className)}>
          <Provider>{children}</Provider>
        </body>
      </html>
    </>
  )
}
