<template>
<!--https://zhanziyang.github.io/vue-croppa -->
<!--@file-choose=""
    @file-size-exceed=""
    @file-type-mismatch=""
    @new-image=""
    @image-remove=""
     :file-size-limit="300 * 1024"
    -->
   
      <croppa
      v-model="myCroppa"
      :width="285"
      :height="159"
      initial-size="cover"
      placeholder="Choose an image" 
      :initial-image="initialImage"
      :show-remove-button="false"
    accept=".jpeg,.png"
    
    > 
    </croppa>
    <!--<button @click="myCroppa.zoomIn()">zoom in</button>
    <button @click="myCroppa.zoomOut()">zoom out</button>-->
  
</template>

<script>
import Vue from 'vue'
import Croppa from 'vue-croppa'
// If your build tool supports css module
import 'vue-croppa/dist/vue-croppa.css';
Vue.use(Croppa)

export default {
  data: () => ({
    myCroppa: {},
    imgUrl: '',
    showCropper: false,
    initialImage: 'https://zhanziyang.github.io/vue-croppa/static/500.jpeg'
  }),

  methods: {
    chooseFile(){
      this.myCroppa.chooseFile()
    }, 

    generateImage: function() {
      let url = this.myCroppa.generateDataUrl()
      if (!url) {
        alert('no image')
        return
      }
      this.imgUrl = url
    },

    handleUploading(form, xhr) {},

    handleUploaded(response) {
      if (response.status === 'success') {
        //this.user.avatar = response.url
      }
    },

    handleCompleted(response, form, xhr) {},

    handlerError(message, type, xhr) {}
  }
}
</script>

<style>
.vue-avatar-cropper-demo {
  max-width: 18em;
  margin: 0 auto;
}
.avatar {
  width: 160px;
  border-radius: 6px;
  display: block;
  margin: 20px auto;
}
.card-img-overlay {
  display: none;
  transition: all 0.5s;
}
.card-img-overlay button {
  margin-top: 20vh;
}
.card:hover .card-img-overlay {
  display: block;
}
.croppa-container {
  background-color: white;
  border: 3px solid black
}
</style>
