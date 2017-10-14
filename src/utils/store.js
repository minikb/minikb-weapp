class Store {
  constructor () {
    this.plantform = localStorage ? 'web' : 'wxmp'
  }

  get (key) {
    if (this.plantform === 'web') {
      return JSON.parse(localStorage[key])
    } else {
      return wx.getStorageSync(key)
    }
  }

  set (key, val) {
    if (this.plantform === 'web') {
      localStorage[key] = JSON.stringify(val)
    } else {
      wx.setStorageSync(key, val)
    }
  }
}

export default new Store()
