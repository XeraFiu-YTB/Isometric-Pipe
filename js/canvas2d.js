const canvas = document.getElementById('canvas-2d');
const ctx = canvas.getContext('2d');

let width, height;

function resizeCanvas() {
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = width;
    canvas.height = height;
    drawGrid();
}

function drawGrid() {
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 0.5;

    const gridSize = 50; // pixels
    const angle = 30 * Math.PI / 180; // 30 degrees in radians
    const cosAngle = Math.cos(angle);
    const sinAngle = Math.sin(angle);

    // Draw horizontal lines (isometric)
    for (let i = -height; i < height; i++) {
        const y = i * gridSize;
        ctx.beginPath();
        ctx.moveTo(-width, y * cosAngle);
        ctx.lineTo(width * 2, y * cosAngle - width * sinAngle);
        ctx.stroke();
    }

    // Draw vertical lines (isometric)
    for (let i = -width; i < width * 2; i++) {
        const x = i * gridSize;
        ctx.beginPath();
        ctx.moveTo(x * cosAngle, -height);
        ctx.lineTo(x * cosAngle + height * sinAngle, height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x * cosAngle, -height);
        ctx.lineTo(x * cosAngle - height * sinAngle, height);
        ctx.stroke();
    }
}


export function initCanvas2D() {
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    console.log('2D Canvas Initialized');
}
