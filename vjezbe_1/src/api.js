// Adresa API-ja dolazi iz .env.development / .env.production (ugrađuje se pri buildu)
const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, '')

async function zahtjev(putanja, opcije = {}) {
  const res = await fetch(`${BASE_URL}${putanja}`, {
    ...opcije,
    headers: { 'Content-Type': 'application/json', ...opcije.headers },
  })

  if (!res.ok) {
    const tijelo = await res.json().catch(() => ({}))
    throw new Error(tijelo.greska || `Greška ${res.status}`)
  }
  return res.status === 204 ? null : res.json()
}

export const API_URL = BASE_URL

export const dohvatiZadatke = () => zahtjev('/api/zadaci')

export const dodajZadatak = (tekst) =>
  zahtjev('/api/zadaci', { method: 'POST', body: JSON.stringify({ tekst }) })

export const izmijeniZadatak = (id, promjene) =>
  zahtjev(`/api/zadaci/${id}`, { method: 'PATCH', body: JSON.stringify(promjene) })

export const obrisiZadatak = (id) => zahtjev(`/api/zadaci/${id}`, { method: 'DELETE' })
