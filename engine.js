export class Engine{
 constructor(canvas){
   this.c=canvas; this.ctx=canvas.getContext('2d');
   this.w=canvas.width=innerWidth;
   this.h=canvas.height=innerHeight;
   this.keys={};
   onkeydown=e=>this.keys[e.key.toLowerCase()]=true;
   onkeyup=e=>this.keys[e.key.toLowerCase()]=false;
 }
}