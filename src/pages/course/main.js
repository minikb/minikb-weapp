import Vue from 'vue'
import App from './index'
import http from '../../utils/http'

Vue.use(http)
const app = new Vue(App)
app.$mount()
