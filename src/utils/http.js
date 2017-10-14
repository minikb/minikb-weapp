class Http {
  get (url) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        method: 'GET',
        dataType: 'json',
        header: {
          'content-type': 'application/json'
        },
        success: res => {
          res.body = res.data
          res.status = res.statusCode
          resolve(res)
        },
        fail: res => {
          res.status = res.statusCode
          resolve(res)
        }
      })
    })
  }
  post (url, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        data,
        method: 'POST',
        dataType: 'json',
        header: {
          'content-type': 'application/json'
        },
        success: res => {
          res.status = res.statusCode
          res.body = res.data
          resolve(res)
        },
        fail: res => {
          res.status = res.statusCode
          resolve(res)
        }
      })
    })
  }
}
function install (Vue) {
  Vue.prototype.$http = new Http()
}

export default {
  install
}
