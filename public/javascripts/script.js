/* global Vue, global fetch, global axios */
var app = new Vue({
  el: '#app',
  data: {
    pictures: [
      "./pictures/beardBeachMan.jpg",
      "./pictures/redhead.jpg",
      "./pictures/redSweater.jpg",
      "./pictures/womanByWall.jpg"
    ],
    faces: [],
    current: 0,
    slideIndex: 1,
    loading: false,
  },
  mounted: function() {
    this.$nextTick(function() {
      this.plusIndex(0);
    });
  },
  methods: {
    async upload() {
      alert("PLEASE WAIT AT LEAST 10 SECONDS!!!");
      console.log("in upload");
      this.myHeight += 5;
      var url = "/faces";
      var localPath = this.pictures[this.current];
      var picturePath = './public' + localPath.substring(1, localPath.length);
      console.log("picturePath: " + picturePath);
      this.loading = true;
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
          this.loading = false;
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
      this.faces = [];
      console.log("Passes in: " + n);
      console.log("Current: " + this.current);

      this.slideIndex += n; //update index
      var x = document.getElementsByClassName("mySlides");

      if (this.slideIndex > x.length) {
        this.slideIndex = 1;
      }
      if (this.slideIndex < 1) {
        this.slideIndex = x.length;
      }
      this.current = this.slideIndex - 1;
      console.log("Now: " + this.pictures[this.current]);
      var i;
      for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
      }
      x[this.slideIndex - 1].style.display = "block";
    },
  },
});
