import { World } from '../world/worldgen.js';
import { Renderer } from './renderer.js';
import { Player } from '../entities/player.js';
export class Engine{
  constructor(opts={}){
    this.canvas = document.getElementById(opts.canvasId || 'game');
    if(!this.canvas) throw new Error('Canvas element #game not found');
    this.ctx = this.canvas.getContext('2d');
    this.seed = opts.seed || Math.floor(Math.random()*1e9).toString(36);
    this.seedInt = (function(s){ let n=2166136261; for(let i=0;i<s.length;i++) n = (n ^ s.charCodeAt(i)) * 16777619 >>> 0; return n; })(this.seed);
    this.world = new World(this.seedInt);
    this.player = new Player();
    this.renderer = new Renderer(this.canvas,this.ctx,this.world,this.player);
    this.keys = {}; window.addEventListener('keydown',e=>{ if(e.repeat) return; this.keys[e.key]=true; }); window.addEventListener('keyup',e=>{ this.keys[e.key]=false; });
    document.getElementById('seed').textContent = 'Seed: ' + this.seed;
    this.resize(); window.addEventListener('resize', ()=>this.resize());
    this.lastTime = performance.now(); this.running = false;
  }
  resize(){ this.canvas.width = innerWidth; this.canvas.height = innerHeight; }
  start(){ this.player.x = 0; const startBlock = this.world.surfaceBlocksAt(Math.floor(this.player.x / 32)); this.player.y = startBlock*32; this.cam = {x:this.player.x,y:this.player.y,scale:1,targetScale:1,swayTime:0}; this.running=true; requestAnimationFrame(t=>this.loop(t)); }
  loop(now){ const dt = Math.min(0.05,(now - this.lastTime)/1000); this.lastTime = now; try{ this.update(dt); this.renderer.draw(this.cam); }catch(e){ console.error(e); document.getElementById('info').textContent = 'Runtime error: '+e.message; this.running=false; return; } if(this.running) requestAnimationFrame(t=>this.loop(t)); }
  update(dt){
    // simple movement mapping A/D and space jump
    const left = !!this.keys['a'], right = !!this.keys['d'];
    if(left) this.player.velX = -this.player.walkV; else if(right) this.player.velX = this.player.walkV; else this.player.velX = 0;
    if((this.keys[' ']||this.keys['w']) && this.player.onGround){ this.player.velY = this.player.jumpV; this.player.onGround=false; }
    this.player.velY += this.player.gravity*dt;
    this.player.resolveMovement(dt,this.world);
    // camera
    this.cam.targetScale = 1; this.cam.scale += (this.cam.targetScale - this.cam.scale)*Math.min(1,dt*6); this.cam.swayTime += dt;
    this.cam.x = this.player.x + this.player.w/2 - this.canvas.width/(2*this.cam.scale); this.cam.y = this.player.y + this.player.h/2 - this.canvas.height/(2*this.cam.scale);
    const info = document.getElementById('info'); if(info){ const bx = Math.floor(this.player.x/32); info.textContent = 'Seed: '+this.seed+' | Biome: '+this.world.stableSuperBiome(bx)+' | X:'+Math.floor(this.player.x)+' Y:'+Math.floor(this.player.y); }
  }
}
