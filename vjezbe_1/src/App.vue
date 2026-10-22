<script setup>
import { ref, computed, onMounted } from 'vue'
import TodoItem from './components/TodoItem.vue'
import { API_URL, dohvatiZadatke, dodajZadatak, izmijeniZadatak, obrisiZadatak } from './api.js'

const zadaci = ref([])
const noviZadatak = ref('')
const filter = ref('svi')
const ucitavanje = ref(false)
const greska = ref('')

const filtrirani = computed(() => {
  if (filter.value === 'aktivni') return zadaci.value.filter((z) => !z.gotov)
  if (filter.value === 'gotovi') return zadaci.value.filter((z) => z.gotov)
  return zadaci.value
})

const preostalo = computed(() => zadaci.value.filter((z) => !z.gotov).length)

// Izvršava poziv prema API-ju i hvata greške na jednom mjestu
async function pozovi(fn) {
  greska.value = ''
  try {
    await fn()
  } catch (e) {
    greska.value = e.message === 'Failed to fetch' ? 'API server nije dostupan.' : e.message
  }
}

async function ucitaj() {
  ucitavanje.value = true
  await pozovi(async () => {
    zadaci.value = await dohvatiZadatke()
  })
  ucitavanje.value = false
}

function dodaj() {
  const tekst = noviZadatak.value.trim()
  if (!tekst) return
  pozovi(async () => {
    zadaci.value.push(await dodajZadatak(tekst))
    noviZadatak.value = ''
  })
}

function toggle(zadatak) {
  pozovi(async () => {
    const azuriran = await izmijeniZadatak(zadatak.id, { gotov: !zadatak.gotov })
    Object.assign(zadatak, azuriran)
  })
}

function obrisi(id) {
  pozovi(async () => {
    await obrisiZadatak(id)
    zadaci.value = zadaci.value.filter((z) => z.id !== id)
  })
}

function obrisiGotove() {
  pozovi(async () => {
    const gotovi = zadaci.value.filter((z) => z.gotov)
    await Promise.all(gotovi.map((z) => obrisiZadatak(z.id)))
    zadaci.value = zadaci.value.filter((z) => !z.gotov)
  })
}

onMounted(ucitaj)
</script>

<template>
  <main class="kartica">
    <div class="zaglavlje">
      <h1>Moji zadaci</h1>
      <button class="link" :disabled="ucitavanje" @click="ucitaj">↻ Osvježi</button>
    </div>
    <p class="podnaslov">
      Vue.js frontend + REST API – <a :href="`${API_URL}/api/zadaci`" target="_blank">{{ API_URL }}</a>
    </p>

    <form class="unos" @submit.prevent="dodaj">
      <input v-model="noviZadatak" placeholder="Što treba napraviti?" autofocus />
      <button type="submit" :disabled="ucitavanje">Dodaj</button>
    </form>

    <div v-if="greska" class="greska">
      <span>{{ greska }}</span>
      <button class="link" @click="ucitaj">Pokušaj ponovno</button>
    </div>

    <div class="filteri">
      <button
        v-for="f in ['svi', 'aktivni', 'gotovi']"
        :key="f"
        :class="{ aktivan: filter === f }"
        @click="filter = f"
      >
        {{ f }}
      </button>
    </div>

    <p v-if="ucitavanje" class="prazno">
      Učitavanje…<br />
      <small>Prvi zahtjev može potrajati do minute dok se server ne probudi.</small>
    </p>
    <ul v-else-if="filtrirani.length" class="lista">
      <TodoItem
        v-for="z in filtrirani"
        :key="z.id"
        :zadatak="z"
        @toggle="toggle(z)"
        @obrisi="obrisi(z.id)"
      />
    </ul>
    <p v-else class="prazno">Nema zadataka za prikaz.</p>

    <footer v-if="zadaci.length && !ucitavanje">
      <span>Preostalo: {{ preostalo }}</span>
      <button class="link" @click="obrisiGotove">Obriši gotove</button>
    </footer>
  </main>
</template>
