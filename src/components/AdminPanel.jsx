import { useEffect, useState } from 'react'
import { contentApi } from '../lib/firebase'
import { Plus, Pencil, Trash2, BarChart3 } from 'lucide-react'

export default function AdminPanel() {
  const [items, setItems] = useState([])
  const [draft, setDraft] = useState({
    title: '',
    type: 'movie',
    description: '',
    year: new Date().getFullYear(),
    poster_url: '',
    backdrop_url: '',
    stream_url: ''
  })

  useEffect(() => {
    const unsub = contentApi.onLatest(setItems, 100)
    return () => unsub && unsub()
  }, [])

  const save = async () => {
    if (!draft.title) return
    if (!draft.id) await contentApi.create(draft)
    else await contentApi.update(draft.id, draft)
    setDraft({ title: '', type: 'movie', description: '', year: new Date().getFullYear(), poster_url: '', backdrop_url: '', stream_url: '' })
  }

  const edit = (it) => setDraft(it)

  return (
    <section className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-2xl font-bold flex items-center gap-2"><BarChart3 className="w-6 h-6" /> Admin Dashboard</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
          <h3 className="text-white font-semibold mb-3">Content Manager</h3>
          <div className="grid grid-cols-2 gap-3">
            <input className="col-span-2 bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-white" placeholder="Title" value={draft.title} onChange={(e)=>setDraft({ ...draft, title: e.target.value })} />
            <select className="bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-white" value={draft.type} onChange={(e)=>setDraft({ ...draft, type: e.target.value })}>
              <option value="movie">Movie</option>
              <option value="series">Series</option>
            </select>
            <input className="bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-white" placeholder="Year" type="number" value={draft.year} onChange={(e)=>setDraft({ ...draft, year: Number(e.target.value) })} />
            <input className="col-span-2 bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-white" placeholder="Poster URL" value={draft.poster_url} onChange={(e)=>setDraft({ ...draft, poster_url: e.target.value })} />
            <input className="col-span-2 bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-white" placeholder="Backdrop URL" value={draft.backdrop_url} onChange={(e)=>setDraft({ ...draft, backdrop_url: e.target.value })} />
            <textarea className="col-span-2 bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-white" rows={3} placeholder="Description" value={draft.description} onChange={(e)=>setDraft({ ...draft, description: e.target.value })} />
            <input className="col-span-2 bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-white" placeholder="Stream URL (mp4/m3u8)" value={draft.stream_url} onChange={(e)=>setDraft({ ...draft, stream_url: e.target.value })} />
            <button onClick={save} className="col-span-2 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold" style={{ backgroundColor: '#10b981' }}>
              <Plus className="w-4 h-4" /> Save Content
            </button>
          </div>
        </div>
        <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
          <h3 className="text-white font-semibold mb-3">Library</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[520px] overflow-y-auto pr-1">
            {items.map(it => (
              <div key={it.id} className="rounded-xl overflow-hidden bg-white/5 border border-white/10">
                <div className="aspect-[16/9] bg-[#161b22]" style={{ backgroundImage: it.poster_url ? `url(${it.poster_url})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div className="p-3">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <h4 className="text-white text-sm font-semibold line-clamp-1">{it.title}</h4>
                      <p className="text-white/60 text-xs">{it.type} • {it.year}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={()=>edit(it)} className="p-1.5 rounded bg-white/10 border border-white/10"><Pencil className="w-4 h-4 text-white" /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
