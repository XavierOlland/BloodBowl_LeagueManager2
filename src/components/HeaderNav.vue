<template>
  <div id="HeaderNav">
      <div id="Intro" class="hd-100 x-center y-center">la Blood Bowl Baston League pr&eacute;sente</div>
      <nav class="navbar" ng-style="colours[0].border">
        <div id="Logo" v-if="logo==true" class="logo" @click="$router.push('/')"></div>
        <h1 class="navbar-brand inline text-cutter">{{ title }} {{logo}}</h1>
        <ul class="nav navbar-nav inline collapse navbar-toggleable-md pull-xs-right" id="Menu">
          <li>
            <a class="nav" href="Forum">Forum</a>
          </li>
          <li class="d-sm-down">
            <a class="nav" href="steam://run/236690">Jouer</a>
          </li>
          <li class="d-sm-down">
            <a class="nav" href="https://discordapp.com/channels/159656062125998080/159656062125998080" target="_blank">Discord</a>
          </li>
        </ul>
        <div class="navbar-toggler d-lg-none pull-right zelda" type="button" data-toggle="collapse" data-target="#Menu">&#9776;</div>
      </nav>
  </div>
</template>

<script>

export default {
  name: 'HeaderNav',
  props: {
    title: String
  },
  computed:{
    logo() {
      return this.$router.currentRoute.name!='Home'
    }
  },
  watch: {
    '$route' (to, from) {
      this.logo = to.name == 'Home'? false:true;
    }
  }

}
</script>

<style lang="scss" scoped>
  #HeaderNav {
    position:fixed;
    top:0;
    z-index:1000;
  }
</style>
