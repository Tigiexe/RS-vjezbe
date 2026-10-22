import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// "Baza" u memoriji – podaci se resetiraju pri svakom ponovnom pokretanju servera
let zadaci = [
  { id: 1, tekst: 'Napraviti Vue aplikaciju', gotov: true },
  { id: 2, tekst: 'Napraviti REST API', gotov: false },
  { id: 3, tekst: 'Deployati na Render', gotov: false },
]
let sljedeciId = 4

function nadjiZadatak(req, res) {
  const zadatak = zadaci.find((z) => z.id === Number(req.params.id))
  if (!zadatak) res.status(404).json({ greska: `Zadatak s id ${req.params.id} ne postoji` })
  return zadatak
}

app.get('/', (req, res) => {
  res.json({
    poruka: 'Vježbe 1 – REST API',
    endpointi: [
      'GET    /api/health',
      'GET    /api/zadaci?gotov=true|false',
      'GET    /api/zadaci/:id',
      'POST   /api/zadaci',
      'PATCH  /api/zadaci/:id',
      'DELETE /api/zadaci/:id',
    ],
  })
})

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', vrijeme: new Date().toISOString() })
})

app.get('/api/zadaci', (req, res) => {
  const { gotov } = req.query
  if (gotov === undefined) return res.json(zadaci)
  res.json(zadaci.filter((z) => z.gotov === (gotov === 'true')))
})

app.get('/api/zadaci/:id', (req, res) => {
  const zadatak = nadjiZadatak(req, res)
  if (zadatak) res.json(zadatak)
})

app.post('/api/zadaci', (req, res) => {
  const tekst = req.body?.tekst?.trim()
  if (!tekst) return res.status(400).json({ greska: 'Polje "tekst" je obavezno' })

  const zadatak = { id: sljedeciId++, tekst, gotov: false }
  zadaci.push(zadatak)
  res.status(201).json(zadatak)
})

app.patch('/api/zadaci/:id', (req, res) => {
  const zadatak = nadjiZadatak(req, res)
  if (!zadatak) return

  const { tekst, gotov } = req.body ?? {}
  if (tekst !== undefined) {
    if (typeof tekst !== 'string' || !tekst.trim()) {
      return res.status(400).json({ greska: 'Polje "tekst" mora biti neprazan string' })
    }
    zadatak.tekst = tekst.trim()
  }
  if (gotov !== undefined) {
    if (typeof gotov !== 'boolean') {
      return res.status(400).json({ greska: 'Polje "gotov" mora biti true ili false' })
    }
    zadatak.gotov = gotov
  }
  res.json(zadatak)
})

app.delete('/api/zadaci/:id', (req, res) => {
  const zadatak = nadjiZadatak(req, res)
  if (!zadatak) return

  zadaci = zadaci.filter((z) => z !== zadatak)
  res.status(204).end()
})

app.use((req, res) => {
  res.status(404).json({ greska: `Ruta ${req.method} ${req.path} ne postoji` })
})

app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ greska: 'Neispravan JSON u tijelu zahtjeva' })
  }
  console.error(err)
  res.status(500).json({ greska: 'Interna greška servera' })
})

app.listen(PORT, () => {
  console.log(`API server radi na http://localhost:${PORT}`)
})
