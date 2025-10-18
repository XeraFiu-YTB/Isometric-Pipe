import { addLine, getLines } from './state.js';
import { updateScene } from './viewer3d.js';

const canvas = document.getElementById('canvas-2d');
const ctx = canvas.getContext('2d');

let width, height;
let isDrawing = false;
let startPoint = null;
let currentPoint = null;
let lockAxis = null; // null, 'x', or 'y'

const gridSize = 50;
const angle = 30 * Math.PI / 180;
const cosAngle = Math.cos(angle);
const sinAngle = Math.sin(angle);

function getIsometricGridPoint(x, y) {
    // This is a simplified snapping logic. A more robust solution would involve inverse transformation.
    const isoX = Math.round(x / (gridSize * cosAngle)) * (gridSize * cosAngle);
    const isoY = Math.round(y / (gridSize * cosAngle)) * (gridSize * cosAngle);
    return { x: isoX, y: isoY };
}

function handleKeyDown(event) {
    if (event.key === 'x') {
        lockAxis = 'x';
    } else if (event.key === 'y') {
        lockAxis = 'y';
    }
}

function handleKeyUp(event) {
    if (event.key === 'x' || event.key === 'y') {
        lockAxis = null;
    }
}

function handleMouseDown(event) {
    isDrawing = true;
    startPoint = getIsometricGridPoint(event.offsetX, event.offsetY);
}

function handleMouseMove(event) {
    if (!isDrawing) return;
    currentPoint = getIsometricGridPoint(event.offsetX, event.offsetY);

    if (lockAxis === 'x') {
        currentPoint.y = startPoint.y;
    } else if (lockAxis === 'y') {
        currentPoint.x = startPoint.x;
    }

    redraw();
    if (startPoint && currentPoint) {
        ctx.beginPath();
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.lineTo(currentPoint.x, currentPoint.y);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw dimension label
        const dx = currentPoint.x - startPoint.x;
        const dy = currentPoint.y - startPoint.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const midX = startPoint.x + dx / 2;
        const midY = startPoint.y + dy / 2;
        ctx.fillStyle = '#000';
        ctx.font = '12px Arial';
        ctx.fillText(distance.toFixed(2), midX, midY - 5);
    }
}

function handleMouseUp() {
    if (isDrawing && startPoint && currentPoint) {
        addLine({ start: startPoint, end: currentPoint });
        updateScene();
    }
    isDrawing = false;
    startPoint = null;
    currentPoint = null;
    redraw();
}

function resizeCanvas() {
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = width;
    canvas.height = height;
    redraw();
}

function drawGrid() {
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 0.5;

    // This grid drawing logic can be improved for better performance and accuracy
    for (let x = -width; x < width * 2; x += gridSize) {
        for (let y = -height; y < height * 2; y += gridSize) {
            const isoX = (x - y) * cosAngle;
            const isoY = (x + y) * sinAngle;
            ctx.beginPath();
            ctx.arc(isoX, isoY, 1, 0, 2 * Math.PI);
            ctx.fillStyle = '#ccc';
            ctx.fill();
        }
    }
}

function drawLines() {
    const lines = getLines();
    lines.forEach(line => {
        ctx.beginPath();
        ctx.moveTo(line.start.x, line.start.y);
        ctx.lineTo(line.end.x, line.end.y);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.stroke();
    });
}

function redraw() {
    ctx.clearRect(0, 0, width, height);
    drawGrid();
    drawLines();
}

export function initCanvas2D() {
    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    resizeCanvas();
    console.log('2D Canvas Initialized with drawing capabilities');
}
