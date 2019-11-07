/* global Vue, global fetch, global axios */
var app = new Vue({
  el: '#app',
  data: {
  },
  methods: {
    async getREST() {
      console.log("get REST");
      var url = "/getcity?q=" + this.prefix;
      try {
        let response = await axios.get(url);
        console.log(response.data);
        this.cities = response.data;
        return true;
      }
      catch (error) {
        console.log(error);
      }
    },
  },
});
