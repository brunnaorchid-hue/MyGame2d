import { BLOCK, CHUNK_W } from '../world/worldgen.js';
export class Renderer{
  constructor(canvas,ctx,world,player){ this.canvas=canvas; this.ctx=ctx; this.world=world; this.player=player; }
  clearAndSky(cam){
    this.ctx.setTransform(1,0,0,1,0,0); this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    this.ctx.setTransform(cam.scale,0,0,cam.scale,-cam.x*cam.scale,-cam.y*cam.scale);
    const g = this.ctx.createLinearGradient(0,0,0,this.canvas.height); g.addColorStop(0,'#87CEEB'); g.addColorStop(1,'#5db2ff');
    this.ctx.fillStyle = g; this.ctx.fillRect(cam.x, cam.y, this.canvas.width / cam.scale, this.canvas.height / cam.scale);
  }
  drawTerrain(cam){
    const leftBlock = Math.floor((cam.x - 3*BLOCK)/BLOCK); const rightBlock = Math.floor((cam.x + this.canvas.width / cam.scale + 3*BLOCK)/BLOCK);
    const leftChunk = Math.floor(leftBlock/CHUNK_W), rightChunk = Math.floor(rightBlock/CHUNK_W);
    for(let cx=leftChunk; cx<=rightChunk; cx++){ const cols = this.world.getChunk(cx); for(let i=0;i<cols.length;i++){ const bx = cx*CHUNK_W + i; const px = bx*BLOCK; const surface = cols[i]; const sy = surface*BLOCK; this.ctx.fillStyle='#4CAF50'; this.ctx.fillRect(Math.round(px),Math.round(sy),BLOCK,BLOCK); this.ctx.fillStyle='#8B4513'; for(let d=1; d<=6; d++) this.ctx.fillRect(Math.round(px),Math.round(sy+d*BLOCK),BLOCK,BLOCK); } }
  }
  drawTrees(cam){
    const leftBlock = Math.floor((cam.x - 400)/BLOCK); const rightBlock = Math.floor((cam.x + this.canvas.width / cam.scale + 400)/BLOCK);
    const leftChunk = Math.floor(leftBlock/CHUNK_W), rightChunk = Math.floor(rightBlock/CHUNK_W);
    const time = performance.now()/1000;
    for(let cx=leftChunk; cx<=rightChunk; cx++){ const m = this.world.treeMap.get(cx); if(!m) continue; m.trunks.forEach(k=>{ const [bx,by]=k.split(',').map(Number); this.ctx.fillStyle='#8B4513'; this.ctx.fillRect(Math.round(bx*BLOCK),Math.round(by*BLOCK),BLOCK,BLOCK); }); m.leaves.forEach(k=>{ const [bx,by]=k.split(',').map(Number); const sway = Math.sin(time + bx*0.3) * 4; const px = bx*BLOCK + sway; this.ctx.globalAlpha=0.95; this.ctx.fillStyle='#4CAF50'; this.ctx.fillRect(Math.round(px),Math.round(by*BLOCK),BLOCK,BLOCK); this.ctx.globalAlpha=1.0; }); }
  }
  drawPlayer(cam){ this.ctx.save(); this.ctx.setTransform(cam.scale,0,0,cam.scale,-cam.x*cam.scale,-cam.y*cam.scale); this.ctx.fillStyle='#c04'; this.ctx.fillRect(Math.round(this.player.x),Math.round(this.player.y - this.player.h),this.player.w,this.player.h); this.ctx.restore(); }
  draw(cam){ try{ this.clearAndSky(cam); this.drawTerrain(cam); this.drawTrees(cam); this.drawPlayer(cam); }catch(e){ console.error('render error',e); } finally { this.ctx.setTransform(1,0,0,1,0,0); } }
}
