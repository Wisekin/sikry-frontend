// import type React from "react"
// import type { Metadata } from "next"
// import { Open_Sans, Source_Code_Pro } from "next/font/google"
// import "./globals.css"
// import { ThemeProvider } from "@/components/theme-provider"

// const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-sans" })
// const sourceCodePro = Source_Code_Pro({ subsets: ["latin"], variable: "--font-mono" })

// export const metadata = {
//   title: "Sikry",
//   description: "Sikry - AI-powered platform for market intelligence",
// }

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={`${openSans.variable} ${sourceCodePro.variable} font-sans`}>
//         <ThemeProvider
//           attribute="class"
//           defaultTheme="system"
//           enableSystem
//           disableTransitionOnChange
//         >
//           {children}
//         </ThemeProvider>
//       </body>
//     </html>
//   )
// }


import type React from "react"
import type { Metadata } from "next"
import { IBM_Plex_Sans, Source_Code_Pro } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"]
})
const sourceCodePro = Source_Code_Pro({ subsets: ["latin"], variable: "--font-mono" })

export const metadata = {
  title: "Sikry",
  description: "Sikry - AI-powered platform for market intelligence",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${ibmPlexSans.variable} ${sourceCodePro.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
