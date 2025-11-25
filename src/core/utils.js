export function safe(v,def){ return (typeof v==='number' && isFinite(v))?v:def; }
