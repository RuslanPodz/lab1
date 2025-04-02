function startSimulation() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const x0 = parseFloat(document.getElementById("x0").value);
    const y0 = parseFloat(document.getElementById("y0").value);
    const angle = parseFloat(document.getElementById("angle").value) * Math.PI / 180;
    const v0 = parseFloat(document.getElementById("velocity").value);
    const a = parseFloat(document.getElementById("acceleration").value);
    const color = document.getElementById("color").value;
    
    const v0x = v0 * Math.cos(angle);
    const v0y = v0 * Math.sin(angle);
    const ax = a * Math.cos(angle);
    const ay = a * Math.sin(angle);
    
    let t = 0;
    const dt = 0.1;
    
    
    const scale = Math.max(Math.abs(x0), Math.abs(y0), Math.abs(v0 * 2));
    drawGrid(ctx, canvas, scale);
    drawAxes(ctx, canvas);
    
    
    ctx.setLineDash([5, 15]);
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 + x0, canvas.height / 2 - y0);
    
    function update() {
        const x = x0 + v0x * t + 0.5 * ax * t * t;
        const y = y0 + v0y * t + 0.5 * ay * t * t;
        
        if (y >= -canvas.height / 2 && x <= canvas.width / 2) {
            ctx.lineTo(canvas.width / 2 + x, canvas.height / 2 - y);
            ctx.stroke();
            t += dt;
            requestAnimationFrame(update);
        }
    }
    update();
}

function drawAxes(ctx, canvas) {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    
    
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
    
    
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
}

function drawGrid(ctx, canvas, scale) {
    ctx.strokeStyle = "#ccc";
    ctx.lineWidth = 0.5;
    const step = Math.max(20, canvas.width / (scale * 4));
    
    for (let x = canvas.width / 2 % step; x < canvas.width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    
    for (let y = canvas.height / 2 % step; y < canvas.height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

function clearCanvas() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    
    document.getElementById("x0").value = 0;
    document.getElementById("y0").value = 0;
    document.getElementById("angle").value = 0;
    document.getElementById("velocity").value = 0;
    document.getElementById("acceleration").value = 0;
    document.getElementById("color").value = "#000000";  
    
    
    const scale = 1;
    drawGrid(ctx, canvas, scale);
    drawAxes(ctx, canvas);

    
    location.reload();
}
