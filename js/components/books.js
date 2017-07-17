const appBooks = {
  template: '#viewBooks',

  firebase: {
    books: firebase.database().ref('books')
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
