/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

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
      
    

      AFRAME.registerComponent('hotspot-click', {
   
        init: function () {
         // var data = this.data;
          var el = this.el;  
        // console.log(el)
         el.addEventListener('mousedown', function (e) {
          window.navigator.vibrate(150,50,150);
          alert("click");
           console.log("click");
           console.log(el)
     console.log(e)
     console.log(e.target.id);
        var link =   document.getElementById(e.target.id);
        console.log(link.getAttribute("position"))
        console.log(el.getAttribute("position"))
      //  console.log(e.getAttribute("position"))
      console.log(distance1)
    if(distance1 < 20){
        window.navigator.vibrate(150,50,150);
    }
          });
     
         
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