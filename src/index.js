// JS
import './js/'

// SCSS
import './assets/scss/main.scss'

// CSS (example)
// import './assets/css/main.css'

// Vue.js
window.Vue = require('vue')

// Vue vue (for use in html)
Vue.component('example-component', require('./js/vue/Example.vue').default)

// Vue init
const app = new Vue({
  el: '#app'
})
