import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Row from './components/Row'

function App() {
  return (
    <div className="min-h-screen bg-[#0d1117]">
      <Navbar />
      <Hero />
      <main className="max-w-6xl mx-auto px-6 py-8">
        <Row title="Trending Now" query="type=movie" />
        <Row title="Top Series" query="type=series" />
        <Row title="New Releases" query="" />
      </main>
      <footer className="border-t border-white/5 mt-12 py-8 text-center text-white/50">
        © {new Date().getFullYear()} VibeFlix — Built for speed and comfort
      </footer>
    </div>
  )
}

export default App
