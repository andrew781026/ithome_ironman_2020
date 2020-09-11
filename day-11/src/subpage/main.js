import Vue from 'vue'
import Cat from './Cat.vue'

Vue.config.productionTip = false

new Vue({
    render: h => h(Cat),
}).$mount('#app')
