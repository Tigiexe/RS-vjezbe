<script setup>
defineProps({
  zadatak: { type: Object, required: true },
})
defineEmits(['toggle', 'obrisi'])
</script>

<template>
  <li class="stavka" :class="{ gotov: zadatak.gotov }">
    <label>
      <input type="checkbox" :checked="zadatak.gotov" @change="$emit('toggle')" />
      <span>{{ zadatak.tekst }}</span>
    </label>
    <button class="obrisi" title="Obriši" @click="$emit('obrisi')">✕</button>
  </li>
</template>

<style scoped>
.stavka {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 0.25rem;
  border-bottom: 1px solid var(--rub);
}
label {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
  flex: 1;
}
.gotov span {
  text-decoration: line-through;
  color: var(--prigušeno);
}
.obrisi {
  background: none;
  border: none;
  color: var(--prigušeno);
  font-size: 1rem;
  padding: 0.25rem 0.5rem;
}
.obrisi:hover {
  color: #e5484d;
}
</style>
