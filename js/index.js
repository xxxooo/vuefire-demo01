// js for index.pug

const app = new Vue({
  el: '#app',
  router: router,
  watch: {
    $route: function () {
      setTimeout(() => {componentHandler.upgradeDom()}, 0)
    }
  }
})
