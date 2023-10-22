<template lang="pug">
nav.navbar.navbar-cpink.navbar-expand-lg.bg-transparent
  .container-fluid
    a.navbar-brand(href='#')
      .font-monospace DAO DREAM
    button.navbar-toggler(type='button', aria-expanded='false')
      span.navbar-toggler-icon
    .collapse.navbar-collapse
      ul.navbar-nav.me-auto.mb-2.mb-lg-0
        li.nav-item
          a.nav-link.active(href='#') About
        li.nav-item
          a.nav-link(href='#') Documents
        li.nav-item
          a.nav-link(href='#') Audit
        li.nav-item.dropdown(
          @mouseenter="ddInstructionsToggle"
          @mouseleave="ddInstructionsToggle"
        )
          a.nav-link.dropdown-toggle(
            href='#',
          )
            | Instructions
          ul.dropdown-menu(
            v-if="isDdInstructionsOpen"
            v-on-click-outside="ddInstructionsToggle"
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
            @click.prevent="DdLangToggle"
            ref="ddLangOutsideIgnoreEl"
          )
            img.me-2(src="~/assets/img/icons/lang.svg")
            | English
          ul.dropdown-menu(
            v-if="isDdLangOpen"
            v-on-click-outside="onClickOutsideHandler"
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

const isDdInstructionsOpen = ref(false)
const ddInstructionsToggle = () => {
  isDdInstructionsOpen.value = !isDdInstructionsOpen.value
}

const ddLangOutsideIgnoreEl = ref()
const onClickOutsideHandler = [
  () => {
    isDdLangOpen.value = false
  },
  { ignore: [ddLangOutsideIgnoreEl] }
]

const isDdLangOpen = ref(false)
const DdLangToggle = () => {
  isDdLangOpen.value = !isDdLangOpen.value
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
