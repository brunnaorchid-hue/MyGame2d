import {generateTerrain} from './worldgen.js';
import {Player} from './player.js';
import {draw} from './renderer.js';
import {Engine} from './engine.js';

const canvas=document.getElementById('game');
const eng=new Engine(canvas);
const terrain=generateTerrain(500);
const player=new Player();

function loop(){
 requestAnimationFrame(loop);
 player.update(eng.keys);
 let cam={x:player.x*20-eng.w/2, w:eng.w, h:eng.h};
 draw(eng.ctx,terrain,player,cam);
}
loop();