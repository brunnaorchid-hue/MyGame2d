export function draw(ctx,terrain,player,cam){
 ctx.fillStyle='#7ec0ee';
 ctx.fillRect(0,0,cam.w,cam.h);
 ctx.fillStyle='#4c9a2a';
 for(let x=0;x<terrain.length;x++){
   let sx=x*20-cam.x;
   ctx.fillRect(sx, cam.h - terrain[x]*20, 20, terrain[x]*20);
 }
 ctx.fillStyle='#222';
 ctx.fillRect(player.x*20-cam.x, cam.h-player.y*20-20, 20,20);
}