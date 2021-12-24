<template>
  <div id="app" :class="{'forum': $route.fullPath.indexOf('forum')>-1}">
    <HeaderNav v-if="$route.fullPath.indexOf('forum')==-1"/>
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
  async mounted() {
     await this.$store.dispatch('boot');
  }
}
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height:100%;
  padding-top:65px;
  font-family: 'Mulish';
  font-size: 1em;
  line-height: 1;
  background-image: $main-bg;
  background-position: bottom;
  background-size: cover;
  overflow: hidden;
}
#app.forum{
  background: transparent;
  padding-top: 0 !important;
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
