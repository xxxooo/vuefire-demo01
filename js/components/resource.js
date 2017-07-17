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
