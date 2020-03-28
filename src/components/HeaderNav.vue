<template>
  <div id="HeaderNav">
      <nav class="d-flex justify-content-between">
        <div id="Logo" v-if="logo==true" class="logo d-none d-sm-block" @click="$router.push('/')"></div>
        <h1 class="title inline text-cutter">{{ header }}</h1>
        <ul class="d-flex">
          <li>
            <a href="Forum">Forum</a>
          </li>
          <li  class="d-none d-sm-block">
            <a href="steam://run/236690">Jouer</a>
          </li>
          <li class="d-none d-sm-block">
            <a  href="https://discordapp.com/channels/159656062125998080/159656062125998080" target="_blank">Discord</a>
          </li>
        </ul>
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
  computed: {
    header(){
      return window.innerWidth<576 ? "BBBL": this.title
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
    width:100vw;
    margin-top:15px;
    z-index:1000;
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
    z-index:100;
  }

  nav {
    color: $prime-text;
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
      display:inline-block;
    }
    ul {
      li {
        font-family: "Akashi" !important;
        height: 50px;
        display: inline-block;
        cursor: pointer;
        &:hover {
          border-bottom: 3px solid $prime-text;
          a {
            text-decoration: none;
            color: $seconde-text;
          }
        }
        a {
          text-decoration: none;
          color: $prime-text;
          line-height: 50px;
          font-weight: 400;
          display:block;
          width:100%;
          padding: 0 1vh !important;
        }
      }

    }
  }
  @media (max-width: 576px) {
    nav {
      padding:0 20px 0 25px;
    }
  }

</style>
