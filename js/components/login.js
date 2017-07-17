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
    checkAuth: function () {
      if(this.auth.currentUser) {
        this.$router.push('/books')
      }
    },
    signIn: function () {
      this.auth.signInWithEmailAndPassword(this.user.email, this.user.pass)
      .then(() => { this.message = '' })
      .catch(e => {
        this.message = e.message
      })
    }
  },

  created () {
    this.auth = firebase.auth()
    this.auth.onAuthStateChanged((user) => {
      this.$forceUpdate()
      this.checkAuth()
      setTimeout(() => {componentHandler.upgradeDom()}, 0)
    })
  }
}

const appLogout = {
  template: '<p>Logout</p>',

  created () {
    firebase.auth().signOut()
    this.$router.push('/login')
  }
}
