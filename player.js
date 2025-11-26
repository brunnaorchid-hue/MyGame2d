export class Player{
 constructor(){this.x=50;this.y=0;this.vx=0;this.vy=0;}
 update(keys){
   const speed=0.2;
   if(keys.a)this.vx-=speed;
   if(keys.d)this.vx+=speed;
   this.vy+=0.4;
   this.x+=this.vx; this.y+=this.vy;
   if(this.y>0){this.y=0;this.vy=0;}
   this.vx*=0.9;
 }
}