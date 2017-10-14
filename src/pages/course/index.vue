<template>
  <div class="container">
    <v-course :course="course"></v-course>
  </div>
</template>

<script>
import Vcourse from '@/components/course_table'
import weui from '../../utils/weui'
export default {
  data () {
    return {
      course: {}
    }
  },

  components: {
    'v-course': Vcourse
  },

  onLoad (o) {
      this.fetchData(this.$root.$mp.query);
  },

  methods: {
    fetchData(params) {
            let that = this;
            let loading = weui.loading('狂奔中~');
            that.$http.get(`https://kbs.fddcn.cn/controller/course_controller.php?c=GetCourseByClassName&schoolName=${params.school}&collegeName=${params.academe}&classNum=${params.class_name}`, {
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
                loading.hide();
                if (response.status != 200) {
                    weui.alert('网络错误');
                } else {
                  console.log(response)
                    if (typeof response.body === 'object') {
                        that.course = response.body[0];
                    } else {
                        weui.alert('找不到班级');
                        window.location.href = '/#/'
                    }
                }
            }, response => {
                loading.hide();
                weui.alert('出错拉');
            });
        },
  }
}
</script>

<style scoped>
</style>
