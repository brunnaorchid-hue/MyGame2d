export const BLOCK = 32; export const CHUNK_W = 32;
import { hash01 } from '../core/random.js';
export class World{
  constructor(seed){ this.seed = seed||0; this.chunkCache = new Map(); this.treeMap = new Map(); }
  surfaceBlocksAt(bx){ if(!Number.isFinite(bx)) return 6; const v = Math.floor(6 + Math.sin(bx*0.12 + (this.seed%100)/100)*3 + Math.sin(bx*0.05)*2); return v; }
  genChunk(chunkX){ const cols = new Int16Array(CHUNK_W); const baseBX = chunkX*CHUNK_W; const trunks = new Set(), leaves = new Set(); for(let i=0;i<CHUNK_W;i++){ cols[i]=this.surfaceBlocksAt(baseBX+i); const bx = baseBX+i; const h = cols[i]; if(hash01(bx*12345,this.seed) < 0.08){ for(let t=0;t<4;t++) trunks.add(bx+','+(h-1-t)); const top = h-1-4; for(let dx=-2;dx<=2;dx++) for(let dy=-2;dy<=2;dy++) if(dx*dx+dy*dy<=4) leaves.add((bx+dx)+','+(top+dy)); } } this.treeMap.set(chunkX,{trunks:trunks,leaves:leaves}); return cols; }
  getChunk(cx){ if(!this.chunkCache.has(cx)) this.chunkCache.set(cx,this.genChunk(cx)); return this.chunkCache.get(cx); }
  blockAt(bx,by){ const cx = Math.floor(bx/CHUNK_W); const m = this.treeMap.get(cx); if(m){ if(m.trunks.has(bx+','+by)) return 0; if(m.leaves.has(bx+','+by)) return 0; } const cols = this.getChunk(cx); const local = bx - cx*CHUNK_W; const surf = cols[local]; if(by===surf) return 1; if(by>surf && by<surf+12) return 2; return 0; }
  stableSuperBiome(bx){ return 'Planícies'; }
}
