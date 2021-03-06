const appBooks = {
  template: '#viewBooks',

  firebase: {
    books: BooksRef
  },

  data () {
    return {
      auth: {},
      newBook: {
        title: '',
        author: '',
        url: 'http://'
      }
    }
  },

  methods: {
    checkAuth: function () {
      if(!firebase.auth().currentUser) {
        this.$router.push('/login')
      }
    },
    addBook: function () {
      if (this.newBook.title.length > 0) {
        BooksRef.push(this.newBook)
        this.newBook.title = ''
        this.newBook.author = ''
        this.newBook.url = 'http://'
      }
    },
    removeBook: function (book) {
      BooksRef.child(book['.key']).remove()
      console.log('Book removed successfully')
    }
  },

  created () {
    this.auth = firebase.auth()
    this.checkAuth()
  }
}


const appBook = {
  template: '#viewBook',

  firebase () {
    return {
      book: {
        source: BooksRef.child(this.$route.params.id),
        asObject: true
      }
    }
  }
}
