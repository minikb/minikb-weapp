<template>
  <div class="weui-tab">
      <div class="weui-navbar">
          <div v-for="(item, index1) in items" class="weui-navbar__item" v-bind:class="{'weui-bar__item_on':selected == index1}">
            <a :href="item.href" @click="go(index1)">{{item.text}}</a>
          </div>
      </div>
      <!-- <div class="weui-tab__panel">
      </div> -->
  </div>
</template>
<script>
  export default {
    data () {
      let params = this.$route.params;
      return {
        items: [{
          text: '下载课表',
          href: '//a.app.qq.com/o/simple.jsp?pkgname=io.dcloud.H5291D2691'
        },
        {
          text: params.title ? params.title : '课程表',
          href: this.$route.name == 'Search' ? '#' + this.$route.fullPath : '#/' 
        },
        // {
        //   text:'空教室', 
        //   href: '#/'
        // },
        {
          text: '校历',
          href: '#/calendar'
        },
        {
          text: '打赏',
          href: '#/donate'
        }],
        selected: 1
      }
    },
    methods: {
      go (index1) {
        _hmt.push(['_trackEvent', 'header', index1]);
        this.selected = index1;
      }
    }
  }
</script>
<style type="text/css" scoped>
  a {
    color: #000000;
  }
</style>