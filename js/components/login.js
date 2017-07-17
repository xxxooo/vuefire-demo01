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
