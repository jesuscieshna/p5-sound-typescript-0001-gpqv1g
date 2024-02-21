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

    public draw(pos:number,frameActual:number){
        this.p.stroke(255-pos,255,pos,200);

        for(let i = -60; i<=800; i++){
            this.p.strokeWeight(1);
            for(let j=0; j<=60; j+=30){
                this.p.point(pos+(Math.sin((i/(pos))+(frameActual/4))*20)+(j/10),i+j);
            }
        }
        this.p.stroke(255-pos,255,pos,200);
        this.p.strokeWeight(5);
        for(let i = 100; i<=700; i+=100){
            
            if(i%200==0){
                this.p.fill(80)
                this.p.rect(pos,i,this.amplitude.getLevel()*200);
            }else{
                this.p.fill(255)
                this.p.ellipse(pos,i,this.amplitude.getLevel()*200);
            }
           
        }

    }

}