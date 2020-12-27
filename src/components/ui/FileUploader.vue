<template>
  <div id="FileUploader">
    <h3>Photo d'équipe</h3>
    <form enctype="multipart/form-data" novalidate >
      <div class="dropbox" v-if="currentStatus[0]<2">
        <input type="file"
          ref="file"
          @change="filesChange($event.target.name, $event.target.files)"
          accept="image/jpg">
          <p>
            {{currentStatus[1]}}
          </p>

      </div>

    </form>

    <div v-if="currentStatus[0]>1">
      <h4 :class="[{'success' : currentStatus[0]==2},{'error' : currentStatus[0]==3}]">
        {{currentStatus[1]}}
      </h4>
      <p class="zelda" @click="reset()">{{currentStatus[2]}}</p>
      <p>{{ uploadError }}</p>
    </div>
  </div>
</template>

<script>
  const STATUS_INITIAL = [0,"Glissez votre image (JPG) ici ou cliquez pour en sélectionner une."],
        STATUS_SAVING = [1,"Fichier chargé."],
        STATUS_SUCCESS = [2,"Photo mise à jour.","Recommencez"],
        STATUS_FAILED = [3,"Une erreur s'est produite.","Réessayez"];
  export default {
    name: 'FileUploader',
    props: {
      uploadFileName: String
    },
    data() {
          return {
            uploadError: null,
            currentStatus: STATUS_INITIAL
          }
        },
    methods: {
      async upload(formData) {
        formData.append('file', this.$refs.file.files[0]);
        formData.append('photoName', [this.uploadFileName])
        try {
          await this.$store.dispatch('team/uploadTeamPhoto',formData);
          this.currentStatus = STATUS_SUCCESS
        } catch (e) {
            this.currentStatus = STATUS_FAILED
        }

      },
      reset() {
         this.currentStatus = STATUS_INITIAL;
         this.uploadError = null;
      },
      save() {
        if(this.$refs.file.files[0]){
          this.currentStatus = STATUS_SAVING;
          const formData = new FormData();
          this.upload(formData)
        }
      },
      filesChange() {
        this.currentStatus = STATUS_SAVING;
      }
    },
    mounted() {
      this.reset();
    }
  }
</script>

<style lang="scss" scoped>
  form {
    width:100%
  }
  .dropbox {
    outline: 1px dashed #000;
    outline-offset: -2px;
    color: #000;
    padding: 10px 10px;
    min-height: 200px;
    width:100%;
    position: relative;
    cursor: pointer;
    input {
      opacity:0;
      width: 100%;
      height: 100%;
      position: absolute;
      cursor: grab;
    }

  }
  .dropbox:hover {
    background: #ddd;
  }
</style>
