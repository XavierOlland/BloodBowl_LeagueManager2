<template>
  <div id="Button" @click="clicked()">
    <svg width="200px" height="30px" viewBox="0 0 200 30" version="1.1">
      <defs>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" :id="id">
          <stop class="start" offset="0%"></stop>
          <stop :class="{stop:!color}" :stop-color="color" offset="100%"></stop>
        </linearGradient>
      </defs>
      <g stroke="none" stroke-width="0" fill="none" fill-rule="evenodd">
        <path d="M56.331588,0 L200,0 L200,30 L-2.83591688e-14,30 C28.165794,15 28.165794,0 56.331588,0 Z" :fill="'url(#'+id+')'"></path>
        <text class="label" fill="#fff"><tspan x="50" y="22">{{text}}</tspan></text>
      </g>
    </svg>
  </div>
</template>

<script>

export default {
  name: 'Button',
  props: {
    id: String,
    text: String,
    color: String,
    action: Function
  },
  methods: {
    clicked(){
      this.$emit('clicked')
    }
  }
}
</script>

<style lang="scss" scoped>
  #Button {
    position:absolute;
    right:0; bottom:0;
    height:30px; width:200px;
    line-height: 29px;
    text-align: center;
    cursor: pointer;
  }
  .label {
    color: #ffffff;
    font-family: "Akashi";
    font-size: 16px;
    font-weight:400;
    font-style: italic;
    text-transform: capitalize;
    text-align: right;
    text-indent: 40px
  }
  .prime {
    .start {
      stop-color: $prime-bg;
    }
    .stop {
      stop-color: $prime-color;
    }
  }
  .seconde {
    .start {
      stop-color: $seconde-bg;
    }
    .stop {
      stop-color: $seconde-color;
    }
  }
</style>
