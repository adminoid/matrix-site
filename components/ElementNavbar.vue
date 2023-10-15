<template lang="pug">
nav.navbar.navbar-cpink.navbar-expand-lg.bg-transparent
  .container-fluid
    a.navbar-brand(href='#')
      .font-monospace DAO DREAM
    button.navbar-toggler(type='button', data-bs-toggle='collapse', data-bs-target='#navbarSupportedContent', aria-controls='navbarSupportedContent', aria-expanded='false', aria-label='Toggle navigation')
      span.navbar-toggler-icon
    #navbarSupportedContent.collapse.navbar-collapse
      ul.navbar-nav.me-auto.mb-2.mb-lg-0
        li.nav-item
          a.nav-link.active(aria-current='page', href='#') About
        li.nav-item
          a.nav-link(href='#') Documents
        li.nav-item
          a.nav-link(href='#') Audit
        li.nav-item.dropdown
          a.nav-link.dropdown-toggle(
            href='#',
            role='button',
            data-bs-toggle='dropdown',
            aria-expanded='false'
            @click="openDd1"
          )
            | Instructions
          ul.dropdown-menu(v-if="ddOpen1")
            li
              a.dropdown-item(href='#') Action
            li
              a.dropdown-item(href='#') Another action
            li
              hr.dropdown-divider
            li
              a.dropdown-item(href='#') Something else here

      .graph
        div
          img(src="@/assets/img/icons/graph.svg")
        div 3.735
        div
          img(src="~/assets/img/icons/arrow-bear.svg")

      div
        button.btn.btn-cpink(type="button") Enter App
</template>

<script setup>
const ddOpen1 = ref(false)
const openDd1 = () => {
  ddOpen1.value = !ddOpen1.value
}
</script>

<style lang="sass" scoped>
.dropdown-menu
  display: block
.graph
  display: flex
  justify-content: space-between
  padding: 0.125rem 0.5rem
  border: 1px solid rgba(255, 255, 255, 0.2)
  border-radius: 8px
  margin-right: 1.5rem
  > div
    margin-right: 0.25rem
</style>
