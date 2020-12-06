var rReaderPos = "-"
var bookOpen = false;

    AFRAME.registerComponent('navigate-on-click', {
        schema: {
          url: {
            default: ''
          }
        },
        init: function () {
          console.log("hello")
          console.log(this.el)
          var data = this.data;
          var el = this.el;
          el.addEventListener('click', function () {
            //window.location.href = data.url;
            window.open(data.url, '_blank');
          });
        }
      });
      
      AFRAME.registerComponent('rotation-reader', {
        /**
         * We use IIFE (immediately-invoked function expression) to only allocate one
         * vector or euler and not re-create on every tick to save memory.
         */
        tick: (function () {
          var position = new THREE.Vector3();
          var quaternion = new THREE.Quaternion();
      
          return function () {
            this.el.object3D.getWorldPosition(position);
            console.log( this.el.object3D.getWorldPosition(position))
            rReaderPos =  this.el.object3D.getWorldPosition(position)
            this.el.object3D.getWorldQuaternion(quaternion);
            // position and rotation now contain vector and quaternion in world space.
          };
        })
      });

      AFRAME.registerComponent('hotspot-click', {
   
        init: function () {
         // var data = this.data;
          var el = this.el;  
         console.log(el)
         el.addEventListener('click', function (e) {
          window.navigator.vibrate(200);
          const camera = AFRAME.scenes[0].camera;
  var link =   document.getElementById(e.target.id);
          var dist = link.getAttribute('distance')
           console.log(dist); 
           // alert(dist);
           console.log(el)
     console.log(e)
     console.log(e.target.id);
      
        console.log(link.getAttribute("position"))
        console.log(el.getAttribute("position"))
if(e.target.id === "raccoon1"){
 followRaccoon();
 // console.log(camera.parent.position)
   // camera.position.z = 
 //   var newPos = camera.parent.position.x  + " " + camera.parent.position.y + " " + el.getAttribute("position").z * .6;
//newPos = -2.5
   // camera.el.setAttribute("animation", "property:position;to:" + newPos + ";dur:850")
}

if(e.target.id ==="info1"){
  var book = document.getElementById("book2").object3D;
 
  handleBookClick()
  book.visible = true;
}
if(e.target.id === "book2"){

  //camera.el.setAttribute("animation", "property:position;to:'0 1 0';dur:850")
  handleBookClick()

}
 
      //  console.log(e.getAttribute("position"))
     
    // if(distance1 < 20){
    //     window.navigator.vibrate(150,50,150);
    // }
          });
     
         
        }
      });

      AFRAME.registerComponent("overlay", {
        dependencies: ['material'],
        init: function () {
          this.el.sceneEl.renderer.sortObjects = true;
          this.el.object3D.renderOrder = 100;
          this.el.components.material.material.depthTest = false;
        }
  });

      AFRAME.registerComponent('open-popup', {
        init: function () {
         
          var el = this.el;
          el.addEventListener('click', (e) => {     
           alert('popup')
          });
        }
      });

      AFRAME.registerComponent('markerhandler', {

        init: function() {
    //       el.addEventListener('mousedown', function (e) {
            console.log("click");
    //   console.log(e)
    //  console.log(e.target.id);
            const animatedMarker = document.querySelector("#ant1");
           // const aEntity = document.querySelector("#dancer");
            const aEntity = document.querySelector("#ant1");
    
             animatedMarker.addEventListener('click', function(ev, target){
              console.log("markerclick");
              alert("marker click")
              console.log(ev)
              console.log(aEntity)
              console.log(ev.detail)
                const intersectedElement = ev && ev.detail && ev.detail.intersectedEl;
              console.log(intersectedElement)

                if (aEntity && intersectedElement === aEntity) {
                  //let colors = ["red", "green", "blue", "black", "orange", "white"]
                    // const scale = aEntity.getAttribute('scale');
                    // Object.keys(scale).forEach((key) => scale[key] = scale[key] + 1);
                    // aEntity.setAttribute('scale', scale);
                  //  aEntity.setAttribute('color', colors[Math.floor(Math.random() * colors.length)])
// aEntity.setAttribute("animation-mixer","clip: Reaction");
// setTimeout(()=>{
//   aEntity.setAttribute("animation-mixer","clip: DancingTwerk");

// },1500)
var popup = document.querySelector(".popup")
var invisible = popup.offsetParent === null
console.log(invisible)
if(invisible === true){
popup.setAttribute("style","display:flex");
}

                }
            });
    }});


    var handleBookClick = function(e){
console.log("book open:", bookOpen)
      var book2 = document.getElementById("book2").object3D;
var hud = document.getElementById("hud")
var pg = document.querySelector(".page-elem");


if(bookOpen === false){
book2.el.setAttribute("animation", "property:rotation; to:'0 0 -90'; dur:700;autoplay:true;")
//hud.setAttribute("animation__scale", "property:position; to:'5 0 0'; dur:2000;autoplay:true;")
hud.setAttribute("animation__pos", "property:position; to:'0 0 -.38'; dur:1000;autoplay:true;")


      var mesh = book2.el.object3DMap.mesh;
      
      mesh.animations[0].duration=1.5;
      
      book2.el.addEventListener("animation-finished", (e)=>{
          console.log(e)
       
        if(bookOpen === true){
         pg.style.display= "inline-block";
        }
      })

      book2.el.setAttribute("animation-mixer" ,"clip:*;repetitions:0;crossFadeDuration:0.5;clampWhenFinished:true;")
bookOpen =true;

var closeLink = document.querySelector(".close-book");

closeLink.addEventListener("click", (e)=>{closeBook()})

    }else{
     closeBook();
    }
    }

    var closeBook = function(){
      console.log("close book")
      var book2 = document.getElementById("book2").object3D;
      var hud = document.getElementById("hud")
      var pg = document.querySelector(".page-elem");
      
      pg.style.display= "none";
     
      book2.el.removeAttribute("animation-mixer")
      book2.el.setAttribute("animation-mixer" ,"clip:*;timeScale:-1;repetitions:1;crossFadeDuration:0.5;clampWhenFinished:true;")
      book2.el.setAttribute("animation", "property:rotation; to:'0 0 0'; dur:700;autoplay:true;")
      book2.el.setAttribute("animation__scale", "property:scale; to:'0 0 0'; dur:1000;autoplay:true;")
bookOpen = false;
    }

    const visibleHeightAtZDepth = ( depth ) => {
      const camera = AFRAME.scenes[0].camera;
      
//var camera = document.getElementById("cam");

      // compensate for cameras not positioned at z=0
      const cameraOffset = camera.position.z;
      if ( depth < cameraOffset ) depth -= cameraOffset;
      else depth += cameraOffset;
    
      // vertical fov in radians
    
      const vFOV = camera.fov * Math.PI / 180; 
      console.log(vFOV)
      console.log(2 * Math.tan( vFOV / 2 ) * Math.abs( depth ))
      console.log(camera.aspect)
      // Math.abs to ensure the result is always positive
      return 2 * Math.tan( vFOV / 2 ) * Math.abs( depth );
    };
    
    const visibleWidthAtZDepth = ( depth ) => {
     const camera = AFRAME.scenes[0].camera;
      
//var camera = document.getElementById("cam").object3D;

      const height = visibleHeightAtZDepth( depth, camera );
      let width = height * camera.aspect;
      return width;
    };
    
    const setHudPosition = ( hudx, hudy, depth) => {
    console.log("set hud position", hudx + " " + hudy)
      document.getElementById('hud').setAttribute("position", hudx + " "   + hudy + " " + depth);
      //document.getElementById('hud').object3D.position.set(hudx,hudy, depth);
    }
    const setHudPositionold = ( fovWidth, fovHeight, depth) => {
      console.log(fovHeight);
      console.log(fovWidth);

      document.getElementById('hud').object3D.position.set(-fovWidth/2, fovHeight/2, depth);
    }
    
    
    var testBookOpen = function(){

      var book6 = document.getElementById("booktest").object3D;
      
    console.log(book6)
    console.log(book6.el.object3DMap)
      

            var mesh = book6.el.object3DMap.mesh;
            
            mesh.animations[0].duration=15;
            mesh.animations[1].duration=0;
            mesh.animations[0].tracks =[] //.splice(0,151)
            mesh.animations[1].tracks = [] //.splice(0,151)
            console.log(mesh)
            book6.el.addEventListener("animation-finished", (e)=>{
                console.log(e)
             
              
            })
      //  'T-Pose (No Animation)'
      setTimeout(()=>{
 book6.el.setAttribute("animation-mixer" ,"clip:*;repetitions:0;clampWhenFinished:true;")
      

      },3000)
           
    }