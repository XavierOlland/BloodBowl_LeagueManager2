<template>
  <div id="HeaderNav">
    <nav class="d-flex justify-content-between">
      <div class="d-flex">
        <img :class="['logo',{'hidden':logo==false}]" src="~@/assets/league/Logo_S.png" @click="$router.push('/')"/>
        <h1 class="title inline text-cutter">{{ title }}</h1>
      </div>
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
  data() {
    return {
      title: window.innerWidth<576 ? "BBBL": "Blood Bowl Baston League",
      logo: this.checkLogo(this.$router.currentRoute.name)
    }
  },
  methods: {
    checkLogo(route) {
      return route=='Home' && window.innerWidth>1024? false:true;
    }
  },
  watch: {
    '$route' (to) {
      this.logo = this.checkLogo(to.name);
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
  .logo {
    height: 80px;
    margin: -15px 10px 0 0;
    cursor: pointer;
  }

  nav {
    color: $prime-text;
    height:50px;
    margin:0;
    padding: 0 0 0 50px;
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
  //Mobile
  @media (max-width: 576px) {
    nav {
      padding:0 20px 0 10px;
    }
    .logo {
      height: 70px;
      margin-top: -10px;
    }
  }

</style>
