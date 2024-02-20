import './global.js';
import 'p5/lib/addons/p5.sound';
import * as p5 from 'p5';
import { Prueba } from './prueba/prueba.js';

let sound: p5.SoundFile;

const sketch = (p: p5) => {
  const canvasWidth = 800;
  const canvasHeight = 600;
  let fft: p5.FFT;

  p.preload = () => {
    p.soundFormats('mp3')
    sound = p.loadSound(
      'https://raw.githubusercontent.com/yosshitaku067/images-for-stackblitz/main/marbletechno1.mp3'
    );
  };

  p.setup = () => {
    let cnv = p.createCanvas(canvasWidth, canvasHeight);
    console.log("Buenas");
    cnv.mouseClicked(togglePlay);
    fft = new p5.FFT(0.2, 8192);
    fft.setInput(sound);
  };

  p.draw = () => {
    p.background(0);
    p.noStroke();

    const spectrum = fft.analyze();
    for (let i = 0; i < spectrum.length; i++) {
      const x1 = p.map(
        p.log(i),
        0,
        p.log(spectrum.length),
        p.width / 2,
        p.width
      );
      const x2 = p.map(p.log(i), 0, p.log(spectrum.length), p.width / 2, 0);
      const w1 =
        p.map(p.log(i + 1), 0, p.log(spectrum.length), p.width / 2, p.width) -
        x1 +
        1;
      const w2 =
        p.map(p.log(i + 1), 0, p.log(spectrum.length), p.width / 2, 0) - x2 - 1;
      const br = p.map(p.pow(spectrum[i], 2), 0, p.pow(255, 2), 0, 255);
      p.fill(br);
      p.rect(x1, 0, w1, p.height);
      p.rect(x2, 0, w2, p.height);
    }

    p.text('tap to play', 20, 20);
  };
};

new p5(sketch);





function togglePlay() {
  if(sound.isPlaying()){
    sound.pause();
  }else{
    sound.loop();
  }
}

