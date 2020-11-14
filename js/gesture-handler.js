/* global AFRAME, THREE */

AFRAME.registerComponent("gesture-handler", {
    schema: {
      enabled: { default: true },
      rotationFactor: { default: 5 },
      minScale: { default: 0.3 },
      maxScale: { default: 8 },
    },
  
    init: function () {
        console.log(this.el)
        console.log(this.el.sceneEl)
     
      this.handleScale = this.handleScale.bind(this);
      this.handleRotation = this.handleRotation.bind(this);
      this.handleTap = this.handleTap.bind(this);
  
      this.isVisible = false;
      this.initialScale = this.el.object3D.scale.clone();
      this.scaleFactor = 1;
  
      this.el.sceneEl.addEventListener("markerFound", (e) => {
        this.isVisible = true;
      });
  
      this.el.sceneEl.addEventListener("markerLost", (e) => {
        this.isVisible = false;
      });


      var char = document.querySelector("#dancer");
    var sphere = document.querySelector("#sphere");
      sphere.addEventListener("hit",(e)=>{
console.log("hit")
        console.log(e)

      })

      sphere.addEventListener("hitend",(e)=>{
        console.log("hitend")
                console.log(e)
        
              })


              can.addEventListener("hitclosest",(e)=>{
console.log("hit closest")
        console.log(e)

      })

    

      can.addEventListener("hitstart",(e)=>{
        console.log("hit start")
                console.log(e)
        
              })
//var lookCount =0;

// char.addEventListener("animation-finished",(e)=>{
//   // console.log(e)
//    var clip = e.detail.action._clip.name;
//    if(clip === "Jump" ){
//   // console.log("Jump Finished");
//   //  char.setAttribute( 'animation-mixer','clip: Looking; loop:repeat;crossFadeDuration:0.3;clampWhenFinished:true;'); 

// }

// })

char.addEventListener("animation-loop",(e)=>{
   // console.log(e)
    var clip = e.detail.action._clip.name;
   

  
    if(clip === "Looking" ){
  console.log(clip + " - " )
       // lookCount++;
//         if( lookCount >= 1){
//         char.setAttribute( 'animation-mixer','clip: Jump; loop:repeat; crossFadeDuration:0.3; clampWhenFinished:false;'); 
// lookCount= 0;
// console.log("start jump")
//         }
var can = document.querySelector("#can");
//can.setAttribute("animation","property: position;from:  3.25 0 -1;to:-3.5 0 -1;loop:once; dir:alternate; dur:3500;autoplay:true;delay:0;")
//can.setAttribute("animation__2","property: rotation; to: 0 90 90; loop: true; dur: 250;")

    }

    if(clip === "Jump" ){
        console.log("Jump Finished");
         char.setAttribute( 'animation-mixer','clip: Looking; loop:repeat;crossFadeDuration:0.3;'); 
     
     }
   
})

    },
  
    update: function () {
      if (this.data.enabled) {
        this.el.sceneEl.addEventListener("onefingermove", this.handleRotation);
      //  this.el.sceneEl.addEventListener("twofingermove", this.handleScale);
        this.el.sceneEl.addEventListener("tap", this.handleTap);
      } else {
        this.el.sceneEl.removeEventListener("onefingermove", this.handleRotation);
       // this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
        this.el.sceneEl.removeEventListener("tap", this.handleTap);
      }
    },
  
    remove: function () {
      this.el.sceneEl.removeEventListener("onefingermove", this.handleRotation);
      this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
    },
  
    handleRotation: function (event) {
      if (this.isVisible) {
        this.el.object3D.rotation.y +=
          event.detail.positionChange.x * this.data.rotationFactor;
        this.el.object3D.rotation.x +=
          event.detail.positionChange.y * this.data.rotationFactor;
      }
    },
  handleTap:function(event){
    if (this.isVisible) {
//alert("tap")
var char = document.querySelector("#dancer")
char.setAttribute( 'animation-mixer','clip: Jump; loop:repeat;easing: easeInOutQuad;');
    }
  //  this.el.animation="property: object3D.position.y; to:.75"
  
  char.setAttribute("animation","property: position;from: .75 0 -1; to:.75 2.25 -1;loop:2; dir:alternate; dur:455;autoplay:true;delay:50;easing: easeInOutQuad;")
   setTimeout(()=>{ char.removeAttribute("animation")}, 1500);
  },
    handleScale: function (event) {
      if (this.isVisible) {
        this.scaleFactor *=
          1 + event.detail.spreadChange / event.detail.startSpread;
  
        this.scaleFactor = Math.min(
          Math.max(this.scaleFactor, this.data.minScale),
          this.data.maxScale
        );
  
        this.el.object3D.scale.x = this.scaleFactor * this.initialScale.x;
        this.el.object3D.scale.y = this.scaleFactor * this.initialScale.y;
        this.el.object3D.scale.z = this.scaleFactor * this.initialScale.z;
      }
    },
  });