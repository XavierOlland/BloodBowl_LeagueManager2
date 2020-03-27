<template>
  <div id="HeaderNav">
      <div id="Intro" class="hd-100 x-center y-center">la Blood Bowl Baston League pr&eacute;sente</div>
      <nav class="navbar" ng-style="colours[0].border">
        <div id="Logo" v-if="logo==true" class="logo" @click="$router.push('/')"></div>
        <h1 class="title inline text-cutter">{{ title }}</h1>
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
  data(){
    return{
      logo: this.$router.currentRoute.name!='Home'
    }
  },
  watch: {
    '$route' (to) {
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
  #Intro {
    position:relative;
    width:100vw;
    height:18px;
    background:transparent;
    font-size: 12px;
    box-sizing: border-box;
    line-height: 18px;
    text-align:center;
    font-family:'Muli';
    color:#FFF;
    font-weight:600;
    z-index:2;
  }
  #Logo {
    position:fixed;
    top:0px;
    left:0;
    margin:0 10px;
    height: 90px;
    width: 120px;
    cursor: pointer;
    background: url('~@/assets/league/Logo_S.png') no-repeat;
    background-position: center 2px;
    background-size:contain;
    z-index:100;}

  .navbar {
    color:#ffffff;
    height:50px;
    margin:0;
    padding: 0 0 0 170px;
    border-radius: 0;
    background: url('~@/assets/elements/navbar.jpg');
    border-bottom: 3px solid $prime-color;

    .title {
      padding:0;
      margin:0;
      font-size: 36px;
      max-width:calc(100vw - 160px);
    }
  }
</style>
