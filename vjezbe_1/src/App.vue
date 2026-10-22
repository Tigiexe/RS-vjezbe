<script setup>
import { ref, computed, watch } from 'vue'
import TodoItem from './components/TodoItem.vue'

const STORAGE_KEY = 'vjezbe1-zadaci'

function ucitaj() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? []
  } catch {
    return []
  }
}

const zadaci = ref(ucitaj())
const noviZadatak = ref('')
const filter = ref('svi')

const filtrirani = computed(() => {
  if (filter.value === 'aktivni') return zadaci.value.filter((z) => !z.gotov)
  if (filter.value === 'gotovi') return zadaci.value.filter((z) => z.gotov)
  return zadaci.value
})

const preostalo = computed(() => zadaci.value.filter((z) => !z.gotov).length)

watch(zadaci, (v) => localStorage.setItem(STORAGE_KEY, JSON.stringify(v)), { deep: true })

function dodaj() {
  const tekst = noviZadatak.value.trim()
  if (!tekst) return
  zadaci.value.push({ id: Date.now(), tekst, gotov: false })
  noviZadatak.value = ''
}

function obrisi(id) {
  zadaci.value = zadaci.value.filter((z) => z.id !== id)
}

function obrisiGotove() {
  zadaci.value = zadaci.value.filter((z) => !z.gotov)
}
</script>

<template>
  <main class="kartica">
    <h1>Moji zadaci</h1>
    <p class="podnaslov">Jednostavna Vue.js aplikacija – Vježbe 1</p>

    <form class="unos" @submit.prevent="dodaj">
      <input v-model="noviZadatak" placeholder="Što treba napraviti?" autofocus />
      <button type="submit">Dodaj</button>
    </form>

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

    <ul v-if="filtrirani.length" class="lista">
      <TodoItem
        v-for="z in filtrirani"
        :key="z.id"
        :zadatak="z"
        @toggle="z.gotov = !z.gotov"
        @obrisi="obrisi(z.id)"
      />
    </ul>
    <p v-else class="prazno">Nema zadataka za prikaz.</p>

    <footer v-if="zadaci.length">
      <span>Preostalo: {{ preostalo }}</span>
      <button class="link" @click="obrisiGotove">Obriši gotove</button>
    </footer>
  </main>
</template>
