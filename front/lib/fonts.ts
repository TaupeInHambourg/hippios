import { Zain, Poppins } from "next/font/google"

export const zain = Zain({
  subsets: ["latin"],
  weight: ["200", "300", "400", "700", "800", "900"],
  variable: "--font-zain",
  display: "swap",
})

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

// Classes utilitaires pour une utilisation facile dans les composants
export const fontHeading = "font-[family-name:var(--font-zain)]"
export const fontSans = "font-[family-name:var(--font-poppins)]"

