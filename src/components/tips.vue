<template>
  <section v-if="isShow">
    <p><a :href="tips.href">{{tips.text}}</a> <span @click="closeTips()" class="close"></span></p>
  </section>
</template>
<script>
import store from '@/utils/store'
  export default {
    name: 'tips',
    data () {
      return {
        isShow: false,
        tips: {}
      }
    },
    methods: {
      closeTips() {
        this.isShow = false;
        store.set('id', this.tips.id)
        try {
           _hmt.push(['_trackEvent', 'closeTips', 'picker', `1`]);
        } catch (e) {

        }
      }
    },
    created () {
      let that = this;
      this.$http.get(`https://easy-mock.com/mock/595f7eac9adc231f357b9d78/minikb/index/tips`, {
          // use before callback
          before(request) {

              // abort previous request, if exists
              if (this.previousRequest) {
                  this.previousRequest.abort();
              }

              // set previous request on Vue instance
              this.previousRequest = request;
          }
      }).then(response => {
          console.log(response)
          if (response.status == 200) {
              that.tips = response.data;
              if (that.tips.id != store.get('id')) {
                that.isShow = true;
              }
              
          }
      });
    }
  }
</script>
<style type="text/css" lang="scss" scoped>
  section {
    margin: 10px 15px;
    border-radius: 4px;
    background-color: rgba(254, 198, 47, .3);
    p {
      color: #1aad19;
      font-size: 14px;
      line-height: 1.5em;
      padding: 5px 8px;
      position: relative;
      a {
        color: #1aad19;
      }
      .close {  
        width: 14px;  
        height: 14px;  
        position: absolute;
        right: 10px;
        top: 7px;  
      }  
      .close:before, .close:after {  
        content: '';  
        position: absolute;  
        top: 50%;  
        width: 14px;  
        height: 1px;  
        background-color: #888;  
        -webkit-transform: rotate(45deg);  
        transform: rotate(45deg);
      }  
      .close:after {  
        -webkit-transform: rotate(-45deg);  
        transform: rotate(-45deg);  
      }  
    }
  }
</style>