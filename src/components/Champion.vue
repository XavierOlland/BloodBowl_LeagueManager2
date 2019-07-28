<template>
  <div id="Champion" class="plain prime">
    <h3>CHAMPION</h3>
    <h4>Joute de Bretonnie 2518</h4>
    <hr>
    <h1 class="zelda">Les Busards du Blizzard</h1>
    <hr>
    <h2 ng-style="colours[0].color">Cysterion</h2>
    <div class="spacer"></div>
    <div class="button">
      la compétition
    </div>
  </div>
</template>

<script>

export default {
  name: 'Champion',
  props: {},
  data() {
    return {
      champion:{}
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
  #Champion {
    text-align: center;
  }
  hr {
    width: 80%;
    border-top: 1px solid #ffffff;
    text-align: center;
    margin: 10px auto;
  }
</style>
