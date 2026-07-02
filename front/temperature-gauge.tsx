import type React from "react"
import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import { EQUESTRE_PRIMARY } from "@/lib/colors"
import { zain, poppins } from "@/lib/fonts"
import "./globals.css"

export const metadata: Metadata = {
  title: "Équi-Santé | Suivi de santé équine",
  description:
    "Application mobile-first de suivi de santé pour chevaux. Surveillez la température, le rythme cardiaque et l'historique de vos chevaux.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: EQUESTRE_PRIMARY,
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`${poppins.variable} ${zain.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
