const c=document.getElementById('game');const ctx=c.getContext('2d');
function resize(){c.width=innerWidth;c.height=innerHeight;}onresize=resize;resize();
let t=0;
function loop(){
 t+=0.01;
 ctx.fillStyle='#87CEEB';ctx.fillRect(0,0,c.width,c.height);
 // ground
 ctx.fillStyle='#228B22';
 ctx.fillRect(0,c.height-100,c.width,100);
 // simple trees
 for(let i=0;i<10;i++){
  let x=i*150+50;
  ctx.fillStyle='#8B4513';
  ctx.fillRect(x,c.height-150,20,50);
  ctx.fillStyle='#006400';
  ctx.beginPath();
  ctx.arc(x+10,c.height-170,30+5*Math.sin(t+i),0,Math.PI*2);
  ctx.fill();
 }
 requestAnimationFrame(loop);
}
loop();
