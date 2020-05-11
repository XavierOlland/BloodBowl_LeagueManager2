<template>
  <div id="Forum" class="plain prime">
    <h2>Mise à jour du forum</h2>
    <p>Affectation des équipes, couleurs et casques.<br/><p/>
    <p v-if="message.type" :class="message.type">{{message.text}}</p>
    <Button :id="'UpdateForum'" :text="'Mise à jour'" @clicked="updateForum" />
  </div>
</template>

<script>
  import Button from '../ui/Button.vue';

  export default {
    name: 'Forum',
    components: {
      Button
    },
    data() {
      return {
        step: 3,
        message: {
          type: '',
          text: ''
        }
      }
    },
    computed: {
    },
    methods: {
      updateForum() {
        this.$store.dispatch('admin/updateForum').then(response => {
          this.message = response;
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .data { }
</style>
