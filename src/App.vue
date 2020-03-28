<template>
  <div id="app">
    <HeaderNav/>
    <router-view/>
  </div>
</template>

<script>
import HeaderNav from './components/HeaderNav.vue'

export default {
  name: 'app',
  components: {
    HeaderNav
  },
  mounted(){
     this.$store.dispatch('boot');
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height:100%;
  padding-top:68px;
  font-family: 'Muli';
  font-size: 1em;
  line-height: 1;
  background-image:url('~@/assets/elements/spring/background.jpg');
  background-position: bottom;
  background-size: cover;
  overflow: hidden;
}
@media all and (orientation:portrait) {
  #app {
    background-size: auto 100%;
  }
}
div {
  box-sizing: border-box;
  padding:0;
}
.row {
  margin:0;
}
</style>
