<template>
  <div id="FileUploader">
    <h3>Photo d'équipe</h3>
    <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
      <div class="dropbox">
        <input type="file"
          ref="file"
          name="photo"
          :disabled="isSaving"
          @change="filesChange($event.target.files)"
          accept="image/*">
        <p v-if="isInitial">
          Glissez votre image ici ou cliquez pour en sélectionner une.
        </p>
        <p v-if="isSaving">
          Chargement de l'image
        </p>
      </div>
    </form>
    <div v-if="isSuccess">
        <h4 class="success">Photo mise à jour</h4>
        <p class="zelda" @click="reset()">Recommencez</p>
      </div>
      <div v-if="isFailed">
        <h4 class="error">Une erreur s'est produite</h4>
        <p class="zelda" @click="reset()">Réessayez</p>
        <!--pre>{{ uploadError }}</pre-->
      </div>
  </div>
</template>

<script>
  const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;
  export default {
    name: 'FileUploader',
    props: {
      uploadFileName: String
    },
    data() {
          return {
            uploadError: null,
            currentStatus: null
          }
        },
    computed: {
      isInitial() {
        return this.currentStatus === STATUS_INITIAL;
      },
      isSaving() {
        return this.currentStatus === STATUS_SAVING;
      },
      isSuccess() {
        return this.currentStatus === STATUS_SUCCESS;
      },
      isFailed() {
        return this.currentStatus === STATUS_FAILED;
      }
    },
    methods: {
      upload(formData) {
        formData.append('file', this.$refs.file.files[0]);
        formData.append('photoName', [this.uploadFileName])
        return this.$store.dispatch('team/uploadTeamPhoto',formData);
      },
      reset() {
         this.currentStatus = STATUS_INITIAL;
         this.uploadError = null;
      },
      save(formData) {
       this.currentStatus = STATUS_SAVING;
       this.upload(formData)
         .then(result => {
           if(result == 1){
             this.currentStatus = STATUS_SUCCESS;
           }
           else {
             this.currentStatus = STATUS_FAILED;
           }
         })
         // .catch(err => {
         //   this.uploadError = err.response;
         //   this.currentStatus = STATUS_FAILED;
         // });
      },
      filesChange(fileList) {
       const formData = new FormData();
       if (!fileList.length) return;
       this.save(formData);
      }
    },
    mounted() {
      this.reset();
    }
  }
</script>

<style lang="scss" scoped>
  .dropbox {
    outline: 1px dashed #000;
    outline-offset: -2px;
    color: #000;
    padding: 10px 10px;
    min-height: 200px;
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
