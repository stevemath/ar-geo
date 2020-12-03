const handleAnimations = (id,clipName,repeat,remv)=>{
let properties={
    elId:null,
    obj3D: null,
    animList:null,
    removeTracks:[],
    strAnim: null,
    currentClip:null,
    currentDir:1,
    currentPlaying:false,
    clamp:true,
    loopCallback:null,
    finishCallback:null,
    repeat:false,
}


let setObj3D = (id)=>{
properties.obj3D = document.getElementById(id).object3D;

setAnimList(properties.obj3D)
}

let setAnimList = (obj)=>{
  var arrAnim =  obj.el.object3DMap.mesh.animations;
  console.log(arrAnim)
  properties.animList = arrAnim;
}

let setOffset = (clip)=>{
var tracks = clip.tracks;
var times = tracks[0].times;
var min = Math.min(...times);
var max = Math.max(...times);
tracks.map((item)=>{
    if(min > 0){
   item.shift(-min)
    }
  })
  clip.duration = max -min;


}

let setAllOffsets = ()=>{
    var anims = properties.animList;
    anims.map((clip)=>{
        setOffset(clip)
    })
}

let deleteTrack = (clip,arrNames)=>{
    var tracks = clip.tracks;
    arrNames.map((name)=>{
        var trackName = name;
var selTrack = tracks.find((i)=>{
   // console.log(i)
    if(i && i.name === trackName){
var idx = tracks.indexOf(selTrack);
//console.log(idx)
//console.log(trackName)
//console.log(i.name)
tracks.splice(idx,1)

//console.log(tracks)
    }
})
    })


}

let deleteTracks = (arrNames)=>{

    var anims = properties.animList;
    anims.map((clip)=>{
        deleteTrack(clip,arrNames)
    })

}

let playClip = (clip,dir,repeat,clamp,loopFunction, finishFunction)=>{
var elem = properties.obj3D.el;
    var loop = "";
    if(repeat === true){
        loop="loop:repeat; ";
    }else{
        loop="loop:once; "
    }

    if(finishFunction && finishFunction != null){
    elem.addEventListener("animation-finished", ()=>{
        this.outerHTML = this.outerHTML;
    })
    elem.addEventListener("animation-finished", (e)=>{
console.log("fire finish function")
//console.log(finishFunction)
        finishFunction();
    })
}

    var strAnim = "clip:" + clip + "; " + loop + "clampWhenFinished:" + clamp + ";timeScale:" +  dir + ";crossFadeDuration:.5";
elem.removeAttribute("animation-mixer");
elem.setAttribute("animation-mixer", strAnim);


}

let stopClip = ()=>{
    properties.obj3D.el.setAttribute("animation-mixer", "timeScale:0");
}

let playCurrentClip = ()=>{
    properties.obj3D.el.setAttribute("animation-mixer", "timeScale:1");
}

let init = (id, clipName,repeat,remv)=>{
    properties.elId = id;
    console.log("init: " + id)
    setObj3D(id);

}

init(id);

    return {
        get:()=>{
            return properties.obj3D
        },
        set: (id)=>{
           
            init(id)
        },
        getAnimList : ()=>{
            return properties.animList
            },
            setOffsets:()=>{
                setAllOffsets();
            },
            removeTracks:(arrNames)=>{
deleteTracks(arrNames)
            },
            playClip:(clip,dir,repeat,clamp,loopFunction, finishFunction)=>{
playClip(clip,dir,repeat,clamp,loopFunction, finishFunction)
            },
            play:()=>{
                playCurrentClip()
            },
            stop:()=>{
                stopClip()
            },
    }


}