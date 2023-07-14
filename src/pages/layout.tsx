'use client'

import CustomNavbar from "~/components/Navbar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <CustomNavbar />
      {children}
    </div>
  )
}