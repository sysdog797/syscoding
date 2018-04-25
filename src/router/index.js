import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import detail from '@/components/detail'

Vue.use(Router)

export default new Router({
  mode: 'history', //去掉地址栏vue-router自动添加的#
  routes: [{
    path: '/index/',
    name: 'index',
    component: index
  }, {
    path: '/index/detail/:id',
    name: 'detail',
    component: detail
  }]
})
