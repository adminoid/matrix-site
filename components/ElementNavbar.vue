<template lang="pug">
nav.navbar.navbar-cpink.navbar-expand-lg.bg-transparent
  .container-fluid(:class="{'over-cover': layoutStore.isOpenedSidebar}")
    a.navbar-brand(href='/')
      .font-monospace DAO DREAM
    button.navbar-toggler(
      type='button'
      @click.prevent="layoutStore.toggleSidebar"
    )
      span.navbar-toggler-icon
    .navbar-container.collapse.navbar-collapse(:class="{show: layoutStore.isOpenedSidebar}")
      ul.navbar-nav.me-auto.mb-2.mb-lg-0
        li.nav-item
          a.nav-link.active(href='/statistics') Statistics
        li.nav-item
          a.nav-link(href='#') Documents
        li.nav-item
          a.nav-link(href='#') Audit
        li.nav-item.dropdown(
          @mouseenter="ddInstructionsToggleWide"
          @mouseleave="ddInstructionsToggleWide"
          @click.prevent="ddInstructionsToggleMobile"
          v-on-click-outside="ddInstructionsToggleMobileClose"
        )
          a.nav-link.dropdown-toggle(
            href='#',
          )
            | Instructions
          ul.dropdown-menu.show.position-absolute(
            v-if="isDdInstructionsOpen"
            v-on-click-outside="ddInstructionsToggleWide"
          )
            li
              a.dropdown-item(href='#') Menu item 1
            li
              a.dropdown-item(href='#') Menu item 2
            li
              a.dropdown-item(href='#') Menu item 3

      .nav-custom

        .nav-custom__graph.text-white.white-border
          div
            img(src="@/assets/img/icons/graph.svg")
          div 3.735
          div
            img(src="@/assets/img/icons/arrow-bear.svg")

        ul.nav-custom__lang.navbar-nav.text-white
          li.nav-item.dropdown
            a.nav-link.dropdown-toggle(
              href='#',
              role='button',
              @click.prevent="DdLangToggle"
              ref="ddLangOutsideIgnoreEl"
            )
              img.me-2(src="@/assets/img/icons/lang.svg")
              | English
            ul.dropdown-menu.show.position-absolute(
              v-if="isDdLangOpen"
              v-on-click-outside="onClickOutsideHandler"
            )
              li
                a.dropdown-item(href='#') Russian
              li
                a.dropdown-item(href='#') English

      connect-button
</template>

<script setup>
import { vOnClickOutside } from '@vueuse/components'
import { useLayoutStore } from '~/stores/useLayout.js'
import {
  breakpointsBootstrapV5,
  useBreakpoints,
} from '@vueuse/core'
import ConnectButton from '~/components/ConnectButton.vue'

const layoutStore = useLayoutStore()
const breakpoints = useBreakpoints(breakpointsBootstrapV5)

const isDdInstructionsOpen = ref(false)
const ddInstructionsToggleWide = () => {
  if (breakpoints.isGreaterOrEqual('lg')) {
    isDdInstructionsOpen.value = !isDdInstructionsOpen.value
  }
}

const ddInstructionsToggleMobile = () => {
  if (!breakpoints.isGreaterOrEqual('lg')) {
    isDdInstructionsOpen.value = !isDdInstructionsOpen.value
  }
}

const ddInstructionsToggleMobileClose = () => {
  if (!breakpoints.isGreaterOrEqual('lg')) {
    isDdInstructionsOpen.value = false
  }
}

const ddLangOutsideIgnoreEl = ref()
const onClickOutsideHandler = [
  () => {
    console.info('onClickOutsideHandler')
    isDdLangOpen.value = false
  },
  { ignore: [ddLangOutsideIgnoreEl] }
]

const isDdLangOpen = ref(false)
const DdLangToggle = () => {
  console.info('DdLangToggle')
  isDdLangOpen.value = !isDdLangOpen.value
}
</script>

<style lang="sass">
.nav-custom
  align-items: center
  &__graph
    --bs-btn-color: white
    display: flex
    justify-content: space-between
    padding: 0.125rem 0.5rem
    > div
      margin-right: 0.25rem
</style>
