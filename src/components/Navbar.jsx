import { Menu, Search, User } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur supports-[backdrop-filter]:bg-[#0d1117]/60 bg-[#0d1117]/80 border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-lg bg-[#161b22]/60 border border-white/10 text-white/80 hover:text-white">
            <Menu size={18} />
          </button>
          <span className="text-white font-bold text-lg">VibeFlix</span>
        </div>
        <div className="hidden md:flex items-center gap-2 flex-1 max-w-xl mx-6">
          <div className="flex items-center gap-2 w-full bg-[#161b22]/70 border border-white/10 rounded-xl px-3 py-2">
            <Search size={16} className="text-white/60" />
            <input placeholder="Search movies, series..." className="bg-transparent outline-none text-white/90 w-full placeholder:text-white/40" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a href="#" className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/20 hover:bg-emerald-500/30">Upgrade</a>
          <button className="p-2 rounded-full bg-[#161b22] border border-white/10 text-white/80">
            <User size={18} />
          </button>
        </div>
      </div>
    </header>
  )
}
