
const router = new VueRouter({
  routes: [
    { path: '/', component: root },
    { path: '/login', component: appLogin },
    { path: '/logout', component: appLogout },
    { path: '/books', component: appBooks },
    { path: '/books/:id', component: appBook },
    { path: '/resource', component: appResource }
  ]
})
