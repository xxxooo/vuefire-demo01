// js for index.pug

var app = new Vue({
  el: '#app',
  router: router,
  watch: {
    $route: function () {
      setTimeout(() => {componentHandler.upgradeDom()}, 0)
    }
  }
})
