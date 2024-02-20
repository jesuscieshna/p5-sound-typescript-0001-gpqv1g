import './global.js';
import 'p5/lib/addons/p5.sound';
import * as p5 from 'p5';
import * as myLibrary from '../YiizReactiveImages/index';
/* import { readdirSync } from 'fs'; */

let stems : myLibrary.Sound[] = [];
let isPlaying: boolean = false;

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
    p.background(0);
    let i : number = 67;
    stems.forEach(stem=>{
      stem.draw(i);
      i+=133;
    });
  };
};

new p5(sketch);



