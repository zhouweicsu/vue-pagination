import Vue from 'vue'
import Pagination from '../src/pagination.vue'

Vue.component('pagination', Pagination);

var demo = new Vue({
    el: "#demo",
    data: {
        total: 1000,
        total1: 20
    }
});
