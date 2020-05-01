<template>
  <div class="loader veil">
    <img src="~@/assets/elements/blood.png">
    <h3>{{text}}</h3>
  </div>
</template>

<script>

export default {
  name: 'Loader',
  props: {
    text: String,
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  .loader {
    img {
      width:40%;
      animation-name: opacity;
      animation-duration: 4s;
      animation-iteration-count: infinite;
    }
    h3 {
      position: absolute;
    }
  }
  @keyframes opacity {
    0%   {opacity: 0.1;}
    50%  {opacity: 1;}
    100% {opacity: 0.1;}
  }
</style>
