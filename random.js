export function seedToInt(s){ let n=2166136261; for(let i=0;i<s.length;i++) n = (n ^ s.charCodeAt(i)) * 16777619 >>> 0; return n; }
export function hash32(v, seed){ let x = (v ^ seed) >>> 0; x = (x + 0x7ed55d16 + (x<<12)) >>> 0; x = (x ^ 0xc761c23c) ^ (x >>> 19); x = (x + 0x165667b1 + (x<<5)) >>> 0; x = (x + 0xd3a2646c) ^ (x<<9); return x >>> 0; }
export function hash01(v, seed){ return hash32(v, seed) / 4294967296; }
