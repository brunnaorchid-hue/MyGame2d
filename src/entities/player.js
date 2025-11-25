export class Player{
  constructor(){ this.x=0; this.y=0; this.w=28; this.h=40; this.velX=0; this.velY=0; this.onGround=false; this.gravity=2000; this.jumpV=-520; this.walkV=120; this.runV=260; this.dashV=800; this.accelGround=7000; this.accelAir=900; this.brake=4000; this.charge=0; }
  isCollidingAt(px,pyBottom,w,h,world){ const left=Math.floor(px/32), right=Math.floor((px+w-1)/32); const top=Math.floor((pyBottom-h)/32), bottom=Math.floor((pyBottom-1)/32); for(let bx=left;bx<=right;bx++) for(let by=top;by<=bottom;by++) if(world.blockAt(bx,by)!==0) return true; return false; }
  resolveMovement(dt,world){
    const nx=this.x+this.velX*dt; if(!this.isCollidingAt(nx,this.y,this.w,this.h,world)) this.x=nx; else this.velX=0;
    const ny=this.y+this.velY*dt; if(!this.isCollidingAt(this.x,ny,this.w,this.h,world)){ this.y=ny; this.onGround=false; } else { if(this.velY>0){ let testY=Math.floor(this.y); const limit=Math.max(-1000,Math.floor(this.y-32*20)); while(testY>=limit){ if(!this.isCollidingAt(this.x,testY,this.w,this.h,world)){ this.y=testY; this.velY=0; this.onGround=true; break; } testY-=1; } } else this.velY=0; } }
}
