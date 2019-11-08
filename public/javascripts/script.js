/* global Vue, global fetch, global axios */
var app = new Vue({
  el: '#app',
  data: {
    pictures: [
      "./pictures/beardBeachMan.jpg",
      "./pictures/manSitting.jpg",
      "./pictures/mathWoman.jpg",
      "./pictures/womanByWall.jpg"
    ],
    faces: [],
    current: 0,
    slideIndex: 1,
  },

  methods: {
    myFunction() {
      alert("Finding face and predicting gender, please wait");
    },
    async upload() {
      console.log("in upload");
      this.myHeight += 5;
      var url = "/faces";
      var localPath = this.pictures[this.current];
      var picturePath = './public' + localPath.substring(1, localPath.length);
      axios.post(url, {
          path: picturePath,
        })
        .then(response => {
          /*"FaceLocation": {
            "LeftX": "integer (int32)",
            "TopY": "integer (int32)",
            "RightX": "integer (int32)",
            "BottomY": "integer (int32)"
          },
          "GenderClassificationConfidence": "number (double)",
          "GenderClass": "string"
          */
          this.faces = [];
          console.log("People identified: " + response.data.PeopleIdentified);
          console.log(response.data);
          for (let i = 0; i < response.data.PeopleIdentified; i++) {
            let face = response.data.PersonWithGender[i];
            this.faces.push({
              myHeight: face.FaceLocation.BottomY - face.FaceLocation.TopY,
              myWidth: face.FaceLocation.RightX - face.FaceLocation.LeftX,
              myTop: face.FaceLocation.TopY,
              myLeft: face.FaceLocation.LeftX,
              gender: face.GenderClass,
              confidence: face.GenderClassificationConfidence,
            });
          }
          console.log(this.faces);
        })
        .catch(e => {
          console.log(e);
        });
    },
    getStyle(face) {
      return {
        //add dynamic properties here
        height: `${face.myHeight}px`,
        width: `${face.myWidth}px`,
        top: `${face.myTop}px`,
        left: `${face.myLeft}px`,
      };
    },

    plusIndex(n) {
      console.log(this.current);
      console.log(this.pictures[this.current])
      this.slideIndex += n;
      var i;
      var x = document.getElementsByClassName("mySlides");
      if (n > x.length) {
        this.slideIndex = 1;
        this.current = 0;
      }
      if (n < 1) {
        this.slideIndex = x.length;
        this.current = x.length - 1;
      }
      for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
      }
      x[this.slideIndex - 1].style.display = "block";
    },

    
  },

  computed: {
    updateStyles() {
      return {
        //add dynamic properties here
        height: `${this.myHeight}px`,
        width: `${this.myWidth}px`,
        top: `${this.myTop}px`,
        left: `${this.myLeft}px`,
      };
    },

    currentImage() {
      return this.pictures[this.current];
    }
  }
});
