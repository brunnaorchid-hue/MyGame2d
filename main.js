import { Engine } from './src/engine/engine.js';
const engine = new Engine({canvasId: 'game'});
window.__engine = engine;
engine.start();
