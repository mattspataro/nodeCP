/* global Vue, global fetch, global axios */
var app = new Vue({
  el: '#app',
  data: {
    imgSrc: ''
  },
  methods: {
    async getREST() {
      console.log("get REST");
      try {
        var response = axios.post('/faces', {
          photoObj: this.imgSrc
        });
        // var response = axios.get('/faces', {
        //   photoObj: this.imgSrc
        //   .then(function (response) {
        //   console.log(response);
        // });
        console.log(response.data);
        return true;
      }
      catch (error) {
        console.log(error);
      }
    },
    attachfile(event){
      var files= event.target.files;
      this.imgSrc = window.URL.createObjectURL(files[0]);
      console.log(this.imgSrc);
    },
    browsefiles() {
      var input = document.createElement('input');
      input.type = "file";
      input.click();
      input.addEventListener("change",function(event){
        this.attachfile(event);
      });
      
    },
  },
  
});