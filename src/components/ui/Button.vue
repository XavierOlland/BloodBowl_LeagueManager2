<template>
  <div class="button" :class="[{'secondary': level=='secondary'},{'back': back == true}]" @click="clicked()">
    <svg v-if="back == false" width="200px" height="30px" viewBox="0 0 200 30">
      <defs>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" :id="id">
          <stop class="start" offset="0%"></stop>
          <stop :class="{stop:!color}" :stop-color="color" offset="100%"></stop>
        </linearGradient>
      </defs>
      <g stroke="none" stroke-width="0" fill="none" fill-rule="evenodd">
        <path d="M56.331588,0 L200,0 L200,30 L-2.83591688e-14,30 C28.165794,15 28.165794,0 56.331588,0 Z" :fill="'url(#'+id+')'"></path>
        <text class="label" fill="#eee" x="50" y="22">
            {{text}}
        </text>
      </g>
    </svg>
    <svg v-else width="68px" height="45px" viewBox="0 0 68 45">
      <defs>
          <path d="M1.92033889e-13,0 L37.5,0 C52.5,0 52.5,45 67.5,45 L1.92033889e-13,45 L1.92033889e-13,0 Z" id="path-1"></path>
          <filter x="-5.9%" y="-8.9%" width="111.9%" height="117.8%" filterUnits="objectBoundingBox" id="Shadow">
              <feGaussianBlur stdDeviation="1.5" in="SourceAlpha" result="shadowBlurInner1"></feGaussianBlur>
              <feOffset dx="-5" dy="5" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset>
              <feComposite in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner1"></feComposite>
              <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowInnerInner1"></feColorMatrix>
          </filter>
      </defs>
      <g id="Back-Button" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="Background">
              <use fill-opacity="0.9" class="fill" fill-rule="evenodd" xlink:href="#path-1"></use>
              <use fill="black" fill-opacity="1" filter="url(#Shadow)" xlink:href="#path-1"></use>
          </g>
          <polygon id="Icon" fill="#eee" fill-rule="nonzero" points="35 20.9649123 35 24.0350877 15.994152 24.0350877 24.6929825 32.8070175 22.5 35 10 22.5 22.5 10 24.6929825 12.1929825 15.994152 20.9649123"></polygon>
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
    level: String,
    action: Function,
    back: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    clicked() {
      this.$emit('clicked')
    }
  }
}
</script>

<style lang="scss" scoped>
  .button {
    position:absolute;
    right: 0; bottom: 0;
    height: 30px; width: 200px;
    line-height: 29px;
    text-align: center;
    cursor: pointer;
    .start {
      stop-color: transparent;
    }
    .stop {
      stop-color: $prime-color;
    }
  }
  .back{
    bottom: 0;
    left: 0;
    height: 45px;
    width: 68px;
    position: fixed;
    .fill {
      fill: $seconde-bg;
    }
  }
  .secondary {
    right: 154px !important;
    opacity: 0.75;
  }
  .label {
    color: $prime-text;
    font-family: "Akashi";
    font-size: 16px;
    font-weight:400;
    font-style: italic;
    text-transform: capitalize;
    text-align: right;
    text-indent: 50px
  }

  .seconde {
    .start {
      stop-color: transparent;
    }
    .stop {
      stop-color: $seconde-color;
    }
  }
</style>
