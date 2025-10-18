import { initCanvas2D } from './canvas2d.js';
import { initViewer3D } from './viewer3d.js';
import { initProjectSettings } from './projectSettings.js';

document.addEventListener('DOMContentLoaded', () => {
    initCanvas2D();
    initViewer3D();
    initProjectSettings();
    console.log('PipeForge Designer is running!');
});
