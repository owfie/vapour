import type { Metadata } from "next"
import "@/styles/globals.scss"
import localFont from 'next/font/local'

const HelveticaNowDisplay = localFont({
  src: [
    {
      path: '../assets/HelveticaNowDisplay.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/HelveticaNowDisplay-Bold.woff2',
      weight: '500',
      style: 'normal',
    }
  ],
})

export const metadata: Metadata = {
  title: "Vapour",
  description: "Sample application for Perion.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={HelveticaNowDisplay.className}>
        {children}
      </body>
    </html>
  )
}
