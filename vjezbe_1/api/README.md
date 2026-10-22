# Vježbe 1 – REST API (Express.js)

Jednostavan REST API za upravljanje zadacima. Podaci se čuvaju u memoriji,
pa se nakon ponovnog pokretanja servera vraćaju na početne vrijednosti.

## Pokretanje

```bash
npm install
npm start        # pokreće server na http://localhost:3000
npm run dev      # automatski restart pri promjeni koda
```

Port se može promijeniti varijablom okruženja `PORT` (Render je postavlja sam).

## Endpointi

| Metoda | Ruta | Opis | Uspjeh |
|---|---|---|---|
| GET | `/` | popis endpointa | 200 |
| GET | `/api/health` | provjera rada servera | 200 |
| GET | `/api/zadaci` | svi zadaci, opcionalno `?gotov=true` ili `?gotov=false` | 200 |
| GET | `/api/zadaci/:id` | jedan zadatak | 200 / 404 |
| POST | `/api/zadaci` | novi zadatak, tijelo `{ "tekst": "..." }` | 201 / 400 |
| PATCH | `/api/zadaci/:id` | izmjena, tijelo `{ "tekst"?: "...", "gotov"?: true }` | 200 / 400 / 404 |
| DELETE | `/api/zadaci/:id` | brisanje zadatka | 204 / 404 |

## Primjeri

```bash
curl http://localhost:3000/api/zadaci
curl -X POST -H "Content-Type: application/json" -d '{"tekst":"Novi zadatak"}' http://localhost:3000/api/zadaci
curl -X PATCH -H "Content-Type: application/json" -d '{"gotov":true}' http://localhost:3000/api/zadaci/2
curl -X DELETE http://localhost:3000/api/zadaci/1
```

## Deploy na Render (Web Service)

| Polje | Vrijednost |
|---|---|
| Root Directory | `vjezbe_1/api` |
| Runtime | Node |
| Build Command | `npm ci` |
| Start Command | `npm start` |
| Health Check Path | `/api/health` |
