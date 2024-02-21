import './global.js';
import 'p5/lib/addons/p5.sound';
import * as p5 from 'p5';
import * as myLibrary from '../YiizReactiveImages/index';
/* import { readdirSync } from 'fs'; */

let stems : myLibrary.Sound[] = [];
let isPlaying: boolean = false;
let frameActual=0;
const sketch = (p: p5) => {
  const canvasWidth = 800;
  const canvasHeight = 800;

  p.preload = () => {
    p.soundFormats('mp3');
    //leer los ficheros de forma automatica
/*     readdirSync('./dirpath', {withFileTypes: true})
      .filter(item => !item.isDirectory())
      .map(item => item.name)
      .forEach(item=> {
        console.log(item)
        stems.push(new myLibrary.Sound(item,p)
        )}); */
    stems.push(new myLibrary.Sound('sounds/beautifulIntro5-Audio.mp3',p))
    stems.push(new myLibrary.Sound('sounds/beautifulIntro2-imagiropiano2.mp3',p))
    stems.push(new myLibrary.Sound('sounds/beautifulIntro8-Vital.mp3',p))
    stems.push(new myLibrary.Sound('sounds/beautifulIntro9-Vital.mp3',p))
    stems.push(new myLibrary.Sound('sounds/beautifulIntro7-BBCSymphonyOrchestra.mp3',p))
    stems.push(new myLibrary.Sound('sounds/beautifulIntro6-BBCSymphonyOrchestra.mp3',p))

  };

  p.setup = () => {
    let cnv = p.createCanvas(canvasWidth, canvasHeight);
    cnv.mouseClicked(togglePlay);
    p.rectMode('center');
  };

  function togglePlay() {
    if(isPlaying){
      stems.forEach((item)=>{
        item.getLoadedSound().pause();
      });
      isPlaying=false;
    }else{
      stems.forEach(item => {
        item.getLoadedSound().loop();
      });
      isPlaying=true;
    }
  }

  p.draw = () => {
    let c1 = p.color(0,0,70);
    let c2 = p.color(100, 0, 100);
    for(let y=0; y<800; y++){
      let n = p.map(y,0,800,0,1);
      let newc = p.lerpColor(c1,c2,n);
      p.stroke(newc);
      p.line(0,y,800, y);
    }
    let i : number = 67;
    stems.forEach(stem=>{
      stem.draw(i,frameActual);
      i+=133;
    });
    frameActual++;
  };
};

new p5(sketch);


