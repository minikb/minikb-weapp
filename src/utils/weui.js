class Weui {
  loading () {
    if (wx.canIUse('showLoading')) {
      wx.showLoading({
        title: '加载中。。。'
      })
      return {
        hide: () => {
          wx.hideLoading()
        }
      }
    }
  }
}

export default new Weui()

