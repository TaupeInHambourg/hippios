"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, User, Bell, Plus, Heart } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  return (
    <nav className="fixed bottom-4 left-4 right-4 z-50 bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/5 rounded-3xl overflow-hidden max-w-md mx-auto">
      <div className="px-6 py-2">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className={`flex flex-col items-center gap-0.5 transition-colors ${
              pathname === "/" ? "text-equestre-primary" : "text-equestre-primary/60 hover:text-equestre-primary"
            }`}
          >
            <Home className="h-5 w-5" />
            <span className="text-[10px]">Accueil</span>
          </Link>
          <Link
            href="/chevaux"
            className={`flex flex-col items-center gap-0.5 transition-colors ${
              isActive("/chevaux") ? "text-equestre-primary" : "text-equestre-primary/60 hover:text-equestre-primary"
            }`}
          >
            <Heart className="h-5 w-5" />
            <span className="text-[10px]">Chevaux</span>
          </Link>
          <Link
            href="/cheval/ajouter"
            className={`flex flex-col items-center gap-0.5 transition-colors ${
              isActive("/cheval/ajouter") ? "text-equestre-primary" : "text-equestre-primary/60 hover:text-equestre-primary"
            }`}
          >
            <Plus className="h-5 w-5" />
            <span className="text-[10px]">Ajouter</span>
          </Link>
          <Link
            href="/alertes"
            className={`flex flex-col items-center gap-0.5 transition-colors relative ${
              isActive("/alertes") ? "text-equestre-primary" : "text-equestre-primary/60 hover:text-equestre-primary"
            }`}
          >
            <div className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold rounded-full h-3.5 w-3.5 flex items-center justify-center">
                1
              </span>
            </div>
            <span className="text-[10px]">Alertes</span>
          </Link>
          <Link
            href="/profil"
            className={`flex flex-col items-center gap-0.5 transition-colors ${
              isActive("/profil") ? "text-equestre-primary" : "text-equestre-primary/60 hover:text-equestre-primary"
            }`}
          >
            <User className="h-5 w-5" />
            <span className="text-[10px]">Profil</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
