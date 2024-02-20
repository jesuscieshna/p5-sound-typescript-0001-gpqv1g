import p5, { Amplitude } from "p5";
import { IModulator } from "./IModulator";
export class Sound{
    private p : p5;
    private audioFile: string;
    private loadedSound : p5.SoundFile;
    private midiFile: string;
    private amplitude: Amplitude;
    private modulators: Map<string, IModulator>

    constructor(audioFile:string, p:p5){
        this.p = p;
        this.audioFile = audioFile;
        this.loadedSound = p.loadSound(this.audioFile);
        this.amplitude = new Amplitude;
        this.amplitude.setInput(this.loadedSound);
    }

    public getLoadedSound(): p5.SoundFile{
        return this.loadedSound;
    }

    public draw(pos:number){
        this.loadedSound.setVolume(1);
        this.p.stroke(255-pos,255,pos);
        this.p.strokeWeight(5);
        for(let i = 100; i<=700; i+=100){
            
            if(i%200==0){
                this.p.fill(0)
                this.p.rect(pos,i,this.amplitude.getLevel()*200);
            }else{
                this.p.fill(255)
                this.p.ellipse(pos,i,this.amplitude.getLevel()*200);
            }
           
        }
    }

}