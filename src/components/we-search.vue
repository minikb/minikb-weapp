<template>
    <view>
        <view class="flex-wrp" style="flex-direction:row;">
        <view class="form">
            <view class="row" @click="showPicker">
            <view>学院： </view>
            <view class="picker">{{selectValue.school.label}},{{selectValue.academe.label}},{{selectValue.grade.label}}</view>
            </view>
            <view class="section row">
            <picker @change="pickerClassChange" :value="classId" :range="classList">
                <view class="picker">
                班级：{{classList[classId]}}
                </view>
            </picker>
            </view>
            <view class="button-row">
            <button type="primary" @click="search">查询</button>
            <button style="margin-top: 20rpx" open-type="share">转发给好友</button>
            </view>
        </view>
        </view>

        <view class="picker-section" v-if="isShowPicker">
        <view class="picker_title">
            <button @click="pickerSelected">确定</button>
        </view>
        <picker-view indicator-style="height: 50px;" style="width: 100%; height: 300px;" :value="pickerValue" @change="selectChange">
            <picker-view-column>
            <view v-for="item in schools" style="line-height: 50px">{{item.label}}</view>
            </picker-view-column>
            <picker-view-column>
            <view v-for="item in academe" style="line-height: 50px">{{item.label}}</view>
            </picker-view-column>
            <picker-view-column>
            <view v-for="item in grade" style="line-height: 50px">{{item.label}}</view>
            </picker-view-column>
        </picker-view>
        </view>
    </view>
</template>

<script>
//获取应用实例
let date = new Date();
let year = date.getFullYear();
let grade = [];
for (let i = 0; i < 5; i++) {
  grade.push({
    value: year % 2000,
    label: year + '级'
  });
  year--;
}
let arr = [{
  label: '烟台大学',
  value: 'yd',
  children: []
}, {
  label: '文经学院',
  value: 'wj',
  children: []
}];
let yd = ['EIE',
  '专国',
  '中',
  '体',
  '光',
  '化',
  '土',
  '外',
  '应',
  '建',
  '数',
  '新',
  '机',
  '材',
  '汉教',
  '法',
  '海',
  '环',
  '生',
  '经',
  '药',
  '计',
  '音',
  '食'
];
let wj = ['中',
  '会',
  '信',
  '外',
  '建',
  '文专中',
  '文专会',
  '文专商',
  '文专土',
  '文专市',
  '文专房',
  '文专机',
  '文专英',
  '文专财',
  '文专贸',
  '文中',
  '文会',
  '文公',
  '文商',
  '文土',
  '文市',
  '文投',
  '文新',
  '文日',
  '文朝',
  '文机',
  '文法',
  '文环',
  '文生',
  '文电',
  '文自',
  '文英',
  '文视',
  '文计',
  '文财',
  '文贸',
  '文车',
  '文通',
  '文金',
  '文食',
  '机',
  '管',
  '经',
  '食'
];
for (let i = 0; i < yd.length; i++) {
  arr[0].children.push({
    label: yd[i],
    value: yd[i],
    children: grade
  });
}
for (let i = wj.length - 1; i >= 0; i--) {
  arr[1].children.push({
    label: wj[i],
    value: wj[i],
    children: grade
  });
}

var app = getApp()
export default {
  data () {
      return {
        classList: [],
        classId: 0,
        schools: arr,
        academe: arr[0].children,
        grade: arr[0].children[7].children,
        selectValue: { school: arr[0], academe: arr[0].children[7], grade: arr[0].children[7].children[2] },
        pickerValue: [0, 7, 2],
        isShowPicker: false
    }
  },
  methods: {
    showPicker() {
      this.isShowPicker = !this.isShowPicker
    },
    selectChange: function (e) {
      let val = e.target.value;
      this.pickerValue = val;
      this.academe = arr[val[0]].children;
      this.grade = arr[val[0]].children[val[1]].children;
      // console.log(this.selectValue)
    },
    pickerSelected() {
      const val = this.pickerValue;
      this.academe = arr[val[0]].children;
      this.grade = arr[val[0]].children[val[1]].children;
      this.selectValue = {
        school: arr[val[0]],
        academe: arr[val[0]].children[val[1]],
        grade: arr[val[0]].children[val[1]].children[val[2]]
      };
      this.classId = 0;
      this.isShowPicker = false;
      this.getClassName();
    },
    getClassName: function () {
      let that = this;
      let { school, academe, grade } = that.selectValue;
      if (wx.canIUse && wx.canIUse('showLoading')) {
        // wx.showLoading({
        //   title: '狂奔中~',
        //   mask: true
        // })
      }
      wx.request({
        url: `https://kbs.fddcn.cn/controller/course_controller.php?c=Getclass&schoolName=${school.value}&school_info=${academe.value}${grade.value}`,
        header: {
          'content-type': 'application/json'
        },
        complete: function () {
          if (wx.canIUse && wx.canIUse('hideLoading')) {
            wx.hideLoading();
          }
        },
        success: function (res) {
          that.classList = res.data;
          if (!res.data[0]) {
            wx.showModal({
              title: '换个年级学院试试？',
              content: '没有找到对应的班级',
              success: function (res) { }
            })
          }
        },
        fail() {
          wx.showModal({
            title: '请求失败',
            content: '请检查网络后重试',
            success: function (res) { }
          })
        }
      })
    },
    search: function () {
      let { school, academe, grade } = this.selectValue;
      let { classList, classId } = this;
      if (!classList[classId]) {
        wx.showModal({
              title: '换个年级学院试试？',
              content: '没有找到对应的班级',
              success: function (res) { }
            })
        return;
      }
      wx.navigateTo({
        url: `../course/course?school=${school.value}&academe=${academe.value}&class_name=${classList[classId].match(/\d.*/)}`
      })
    },
    pickerClassChange(e) {
      this.classId = e.target.value
    },
  },
  created () {
    this.getClassName();
  },
  onShareAppMessage(options) {
		return {
			title: '迷你课表',
			path: '/pages/index/index',
		};
	}
}

</script>

<style scoped>
page, .page {
  height: 100%;
}

.flex-wrp {
  display: flex;
  align-items: center;
  padding: 30px;
}

.form {
  width: 100%;
}

.form .row {
  display: flex;
  height: 50rpx;
  margin-top: 40rpx;
}

.button-row {
  width: 100%;
  margin-top: 40rpx;
}

.container {
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}

.picker-section {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  text-align: center;
}

.picker_title {
  height: 60rpx;
  background-color: rgb(251, 249, 254);
}

.picker_title button {
  text-align: right;
  font-size: 24rpx;
  color: rgb(88, 108, 148);
}
</style>