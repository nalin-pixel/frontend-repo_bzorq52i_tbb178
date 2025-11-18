import { useEffect, useRef, useState } from 'react'

export default function Row({ title, query }) {
  const [items, setItems] = useState([])
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const sentinelRef = useRef(null)

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    loadMore()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore()
      }
    }, { rootMargin: '400px' })
    const el = sentinelRef.current
    if (el) observer.observe(el)
    return () => { if (el) observer.unobserve(el) }
  }, [hasMore])

  const loadMore = async () => {
    const res = await fetch(`${baseUrl}/api/content?${query}&skip=${page*20}&limit=20`)
    const data = await res.json()
    setItems(prev => [...prev, ...data])
    setPage(p => p + 1)
    if (data.length < 20) setHasMore(false)
  }

  return (
    <section className="mt-8" id="browse">
      <div className="flex items-center justify-between mb-3 px-2">
        <h3 className="text-white font-semibold">{title}</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3">
        {items.map(item => (
          <a key={item.id} href={`#/watch/${item.id}`} className="group relative rounded-xl overflow-hidden bg-[#161b22] border border-white/5">
            <img src={item.poster_url || item.backdrop_url || 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=800&auto=format&fit=crop'} alt={item.title} className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition" />
            <div className="absolute bottom-2 left-2 right-2 text-white text-sm font-medium line-clamp-2 drop-shadow-lg">{item.title}</div>
          </a>
        ))}
      </div>
      <div ref={sentinelRef} className="h-4" />
    </section>
  )
}
