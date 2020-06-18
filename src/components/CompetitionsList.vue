<template>
  <div id="CompetitionsList">
    <div class="list">
      <div v-for="(value,key) in list" :key="key">
        <div class="year">
          <hr/>
          <h3>{{value[0].year}}</h3>
          <hr/>
        </div>
        <router-link tag="div" v-for="item in value" :key="item.id" :class="['entry', {'title':item.champion==1}]"  :to="{ name: 'Competition', params: { id: item.id }}">
          <span v-if="item.champion==1">&#9733; </span>
          {{item.season}} - {{item.site_name}}
        </router-link>
      </div>
      <div v-if="_.isEmpty(list)" class="disclaimer">
        Aucune competition trouvée.
      </div>
    </div>
  </div>
</template>

<script>
const moment = require('moment')

export default {
  name: 'CompetitionsList',
  props: {
    data: Array
  },
  data() {
    return {
      list: {}
    }
  },
  methods: {
    yearSplit() {
      var cal = this.data.map(function(year) {
        var competition = Object.assign({}, year);
        competition.year = moment(competition.started).format("YYYY");
        return competition
      })
      var recal = this.lodash.orderBy(cal, ['started','champion'],['desc','desc']);
      this.list = this.lodash(recal)
        .groupBy(item => item.year)
        .sortBy(year => recal.indexOf(year[0]))
        .value()
    }
  },
  mounted() {
    if(this.data.length>0){
      this.yearSplit();
    }
  },
  watch: {
    data: function() {
      this.yearSplit();
    }
  }
}
</script>

<style lang="scss" scoped>

  .year {
    display: flex;
    align-items: stretch;
    margin:1em 0 0;
    h3 {
      color: $seconde-color;
    }
    hr {
      flex-grow:1;
      border-bottom: solid 2px $seconde-color;
      margin: 1.2em;
    }
  }
  .entry {
    line-height: 1.25em;
    color: $prime-text;
    margin-left: 1.25em;
    cursor:pointer;
    &:hover {
      color: $seconde-color;
    }
  }
  .title {
    text-indent: 0;
    font-weight: bold;
    margin: 0.2em 0;
    font-size: 1.1em
  }
  .disclaimer {
    margin:1em;
    color: $prime-text;
    font-style: italic;
  }

</style>
