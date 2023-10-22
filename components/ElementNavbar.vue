<template lang="pug">
nav.navbar.navbar-cpink.navbar-expand-lg.bg-transparent
  .container-fluid
    a.navbar-brand(href='#')
      .font-monospace DAO DREAM
    button.navbar-toggler(type='button', aria-expanded='false', aria-label='Toggle navigation')
      span.navbar-toggler-icon
    .collapse.navbar-collapse
      ul.navbar-nav.me-auto.mb-2.mb-lg-0
        li.nav-item
          a.nav-link.active(aria-current='page', href='#') About
        li.nav-item
          a.nav-link(href='#') Documents
        li.nav-item
          a.nav-link(href='#') Audit
        li.nav-item.dropdown(
          @mouseenter="toggleDd1"
          @mouseleave="toggleDd1"
        )
          a.nav-link.dropdown-toggle(
            href='#',
            role='button',

          )
            | Instructions
          ul.dropdown-menu(
            v-if="isOpenDd1"
            v-on-click-outside="toggleDd1"
          )
            li
              a.dropdown-item(href='#') Action
            li
              a.dropdown-item(href='#') Another action
            li
              hr.dropdown-divider
            li
              a.dropdown-item(href='#') Something else here

      .graph.text-white
        div
          img(src="@/assets/img/icons/graph.svg")
        div 3.735
        div
          img(src="~/assets/img/icons/arrow-bear.svg")

      ul.navbar-nav.me-auto.mb-2.mb-lg-0.text-white
        li.nav-item.dropdown
          a.nav-link.dropdown-toggle(
            href='#',
            role='button',
            data-bs-toggle='dropdown',
            aria-expanded='false'
            @click.prevent="ddLangOpen()"
          )
            img.me-2(src="~/assets/img/icons/lang.svg")
            | English
          ul.dropdown-menu(
            v-if="isDdLangOpen"
            v-on-click-outside="ddLangToggle"
          )
            li
              a.dropdown-item(href='#') Russian
            li
              a.dropdown-item(href='#') English

      div
        button.btn.btn-cpink(type="button") Enter App
</template>

<script setup>
import { vOnClickOutside } from '@vueuse/components'

const isOpenDd1 = ref(false)
const toggleDd1 = () => {
  isOpenDd1.value = !isOpenDd1.value
}

const isDdLangOpen = ref(false)
const ddLangToggle = () => {
  console.info('ddLangToggle...')
  if (!isDdLangOpen.value) isDdLangOpen.value = !isDdLangOpen.value
}
const ddLangOpen = () => {
  if (!isDdLangOpen) isDdLangOpen.value = true
}
</script>

<style lang="sass" scoped>
.dropdown-menu
  display: block
.graph
  --bs-btn-color: white
  display: flex
  justify-content: space-between
  padding: 0.125rem 0.5rem
  border: 1px solid rgba(255, 255, 255, 0.2)
  border-radius: 8px
  margin-right: 1.5rem
  > div
    margin-right: 0.25rem
</style>
