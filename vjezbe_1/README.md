# Vježbe 1 – Vue.js aplikacija

Jednostavna frontend aplikacija (popis zadataka) napravljena s **Vue 3** i **Vite**.
Build generira statični sadržaj (`index.html` + JS/CSS) u direktoriju `dist/`.

## Pokretanje

```bash
npm install        # instalacija ovisnosti
npm run dev        # razvojni server s hot reloadom
npm run build      # build statičnog sadržaja u dist/
npm run preview    # posluživanje dist/ na http://localhost:8080
```

`npm run serve` radi build i odmah poslužuje `dist/`.

Budući da je `base: './'`, sadržaj iz `dist/` radi s bilo kojim statičnim serverom,
npr. `npx serve dist` ili `python -m http.server -d dist`.

## Struktura

```
vjezbe_1/
├── index.html              # ulazna HTML datoteka
├── vite.config.js          # Vite konfiguracija (outDir: dist)
├── public/                 # datoteke koje se kopiraju u dist/ bez obrade
└── src/
    ├── main.js             # pokretanje Vue aplikacije
    ├── App.vue             # glavna komponenta
    ├── style.css           # globalni stilovi
    └── components/
        └── TodoItem.vue    # komponenta jednog zadatka
```
