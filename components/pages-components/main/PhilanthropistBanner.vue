<template lang="pug">
.philanthropist-banner
  img.philanthropist-banner__image.img-fluid(src="~/assets/img/violet-pigeon.png")
  h5.centered-header Feel like a cryptophilanthrope
  .philanthropist-banner__text Participation in the project will not only allow you to receive rewards, but also give you the opportunity to extend mercy by helping community members and their pets in hardships and help wild animals around the World
  a.philanthropist-banner__email(href="mailto:help@givedream.io") help@givedream.io
</template>

<style lang="sass">
.philanthropist-banner
  border-radius: 1.5rem
  padding: 24px 16px 24px 16px
  border: 1px solid #343435
  background: radial-gradient(124.45% 123.58% at 50% 0%, rgba(0, 0, 0, 0.9) 45.92%, rgba(113, 61, 255, 0.9) 72.15%, rgba(255, 255, 255, 0.9) 100%)
  &__image
    padding-bottom: 1.5rem
  &__text
    font-size: 13px
    font-weight: 400
    line-height: 18px
    color: #BABCD2
    margin-bottom: 1.5rem
  &__email
    color: #E09FFF
    font-size: 1rem
    line-height: 24px
    display: block
    text-align: center
    font-weight: 500

</style>