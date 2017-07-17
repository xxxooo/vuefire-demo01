// js for index.pug

const config = {
  apiKey: 'AIzaSyAYorRrVZ5wpOX69Vyz30UoY-KL8IdQ-Hw',
  authDomain: 'monkey-dd.firebaseapp.com',
  databaseURL: 'https://monkey-dd.firebaseio.com',
  projectId: 'monkey-dd',
  storageBucket: 'monkey-dd.appspot.com',
  messagingSenderId: '622032691689'
}

firebase.initializeApp(config)
var booksRef = firebase.database().ref('books')

const appLogin = {
  template: '#viewLogin',

  data () {
    return {
      user: {
        email: '',
        pass: ''
      },
      auth: {},
      message: ''
    }
  },

  methods: {
    signIn: function () {
      this.auth.signInWithEmailAndPassword(this.user.email, this.user.pass)
      .then(() => { this.message = '' })
      .catch(e => {
        console.log(e)
        this.message = e.message
      })
    },
    signOut: function () {
      this.auth.signOut()
    }
  },

  mounted () {
    this.auth = firebase.auth()
    this.auth.onAuthStateChanged((user) => {
      this.$forceUpdate()
      setTimeout(() => {componentHandler.upgradeDom()}, 0)
    })
  }
}

const appBooks = {
  template: '#viewBooks',

  firebase: {
    books: booksRef
  },

  data () {
    return {
      newBook: {
        title: '',
        author: '',
        url: 'http://'
      }
    }
  },

  methods: {
    addBook: function () {
      if (this.newBook.title.length > 0) {
        booksRef.push(this.newBook)
        this.newBook.title = ''
        this.newBook.author = ''
        this.newBook.url = 'http://'
      }
    },
    removeBook: function (book) {
      booksRef.child(book['.key']).remove()
      toastr.success('Book removed successfully')
    },
  }
}

const appResource = {
  template: '#viewResource',

  data () {
    return {
      s3Url: '',
      message: '',
      cities: null
    }
  },

  methods: {
    loadFromS3: function () {
      if (this.s3Url.length > 0) {
        this.$http.get(this.s3Url).then(response => {
          // get body data
          console.log(response)
          this.cities = response.body
        }, response => {
          // error callback
          console.log(response)
          this.message = response.status + ' ' + response.statusText
        })
      } else {
        this.message = 'Please enter Url...'
      }
    }
  }
}

const root = { template: '<h2>Hello!</h2>' }

const router = new VueRouter({
  routes: [
    { path: '/', component: root },
    { path: '/login', component: appLogin },
    { path: '/books', component: appBooks },
    { path: '/resource', component: appResource }
  ]
})

const app = new Vue({
  el: '#app',
  router: router,
  watch: {
    $route: function () {
      setTimeout(() => {componentHandler.upgradeDom()}, 0)
    }
  }
})
