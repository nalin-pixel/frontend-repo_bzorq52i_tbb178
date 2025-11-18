import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden" style={{background:'#0d1117'}}>
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/rvFZ5oikmZSIbmGQ/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d1117]/40 to-[#0d1117] pointer-events-none" />
      <div className="relative z-10 h-full max-w-6xl mx-auto px-6 flex items-center">
        <div className="max-w-2xl">
          <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
            Stream without limits
          </motion.h1>
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1,duration:0.6}} className="mt-4 text-[#c9d1d9] text-lg md:text-xl">
            A premium OTT experience with adaptive streaming, profiles, and real‑time sync.
          </motion.p>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.2,duration:0.6}} className="mt-8 flex gap-4">
            <a href="#browse" className="px-5 py-3 rounded-xl bg-[#e50914] text-white font-semibold shadow-[0_10px_40px_-10px_rgba(229,9,20,0.7)] hover:scale-[1.02] transition">
              Start Watching
            </a>
            <a href="#plans" className="px-5 py-3 rounded-xl bg-[#161b22] text-white/90 border border-white/10 backdrop-blur-md hover:bg-white/10 transition">
              View Plans
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
