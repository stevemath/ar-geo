// Component that detects and emits events for touch gestures
var start = 0;
var cTouch = -1;
     
AFRAME.registerComponent("gesture-detector", {
    schema: {
      element: { default: "" }
    },
  
    init: function() {
      this.targetElement =
        this.data.element && document.querySelector(this.data.element);
  
      if (!this.targetElement) {
        this.targetElement = this.el;
      }
  
      this.internalState = {
        previousState: null
      };
  
      this.emitGestureEvent = this.emitGestureEvent.bind(this);
  
      this.targetElement.addEventListener("touchstart", this.emitGestureEvent);
  
      this.targetElement.addEventListener("touchend", this.emitGestureEvent);
  
      this.targetElement.addEventListener("touchmove", this.emitGestureEvent);
    },
  
    remove: function() {
      this.targetElement.removeEventListener("touchstart", this.emitGestureEvent);
  
      this.targetElement.removeEventListener("touchend", this.emitGestureEvent);
  
      this.targetElement.removeEventListener("touchmove", this.emitGestureEvent);
    },
  
    emitGestureEvent(event) {
      const currentState = this.getTouchState(event);
      const previousState = this.internalState.previousState;
  
      const gestureContinues =
        previousState &&
        currentState &&
        currentState.touchCount == previousState.touchCount;
  
      const gestureEnded = previousState && !gestureContinues;
  
      const gestureStarted = currentState && !gestureContinues;
      
      if (gestureEnded) {
cTouch = previousState.touchCount;
       // details.innerHTML = JSON.stringify(previousState)

     details.innerHTML = cTouch;
       
        const eventName =     this.getEventPrefix(previousState.touchCount) + "fingerend";

 // var endTime = performance.now();
var duration = parseInt(new Date().getTime()) - parseInt(start)
 // alert(eventName );




details.innerHTML = details.innerHTML + " " + eventName + " >>> " + duration;



if(duration <150 && cTouch === 1 ){
//alert("start tap handler")
        this.el.emit("tap", previousState);
      }

      this.internalState.previousState = null;
    }
      if (gestureStarted) {
        currentState.startTime = performance.now();
  start = new Date().getTime();
        currentState.startPosition = currentState.position;
  
        currentState.startSpread = currentState.spread;
  
        const eventName =  this.getEventPrefix(currentState.touchCount) + "fingerstart";
  
        this.el.emit(eventName, currentState);
  
        this.internalState.previousState = currentState;
      }
  
      if (gestureContinues) {
        const eventDetail = {
          positionChange: {
            x: currentState.position.x - previousState.position.x,
  
            y: currentState.position.y - previousState.position.y
          }
        };
  
        if (currentState.spread) {
          eventDetail.spreadChange = currentState.spread - previousState.spread;
        }
  
        // Update state with new data
  
        Object.assign(previousState, currentState);
  
        // Add state data to event detail
  
        Object.assign(eventDetail, previousState);
  
        const eventName =
          this.getEventPrefix(currentState.touchCount) + "fingermove";
  
        this.el.emit(eventName, eventDetail);
      }
    },
  
    getTouchState: function(event) {
      if (event.touches.length === 0) {
        return null;
      }
  
      // Convert event.touches to an array so we can use reduce
  
      const touchList = [];
  
      for (let i = 0; i < event.touches.length; i++) {
        touchList.push(event.touches[i]);
      }
  
      const touchState = {
        touchCount: touchList.length
      };
  
      // Calculate center of all current touches
  
      const centerPositionRawX =
        touchList.reduce((sum, touch) => sum + touch.clientX, 0) /
        touchList.length;
  
      const centerPositionRawY =
        touchList.reduce((sum, touch) => sum + touch.clientY, 0) /
        touchList.length;
  
      touchState.positionRaw = { x: centerPositionRawX, y: centerPositionRawY };
  
      // Scale touch position and spread by average of window dimensions
  
      const screenScale = 2 / (window.innerWidth + window.innerHeight);
  
      touchState.position = {
        x: centerPositionRawX * screenScale,
        y: centerPositionRawY * screenScale
      };
  
      // Calculate average spread of touches from the center point
  
      if (touchList.length >= 2) {
        const spread =
          touchList.reduce((sum, touch) => {
            return (
              sum +
              Math.sqrt(
                Math.pow(centerPositionRawX - touch.clientX, 2) +
                  Math.pow(centerPositionRawY - touch.clientY, 2)
              )
            );
          }, 0) / touchList.length;
  
        touchState.spread = spread * screenScale;
      }
  
      return touchState;
    },
  
    getEventPrefix(touchCount) {
      const numberNames = ["one", "two", "three", "many"];
  
      return numberNames[Math.min(touchCount, 4) - 1];
    },
    handleTap(el){

    }
  });