export function generateTerrain(width){
 let h=40, arr=[];
 for(let x=0;x<width;x++){
   let elevation=Math.floor(35+Math.sin(x*0.05)*4 + Math.cos(x*0.015)*3);
   arr[x]=elevation;
 }
 return arr;
}