const svg = d3.select("#canvas");
const width = 800;
const height = 400;
const line = d3.line()
    .x(d => width / 2 + d.x)
    .y(d => height / 2 - d.y);

drawAxes(svg, width, height);
drawGrid(svg, width, height);

function startSimulation() {
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

    const path = svg.append("path")
        .attr("stroke", color)
        .attr("stroke-dasharray", "5, 15")
        .attr("fill", "none");

    const points = [];

    function update() {
        const x = x0 + v0x * t + 0.5 * ax * t * t;
        const y = y0 + v0y * t + 0.5 * ay * t * t;

        if (y >= -height / 2 && x <= width / 2) {
            points.push({ x, y });
            path.attr("d", line(points));
            t += dt;
            requestAnimationFrame(update);
        }
    }

    update();
}

function drawAxes(svg, width, height) {
    const g = svg.append("g")
        .attr("stroke", "black")
        .attr("stroke-width", 1);

    g.append("line")
        .attr("x1", 0)
        .attr("y1", height / 2)
        .attr("x2", width)
        .attr("y2", height / 2);

    g.append("line")
        .attr("x1", width / 2)
        .attr("y1", 0)
        .attr("x2", width / 2)
        .attr("y2", height);
}

function drawGrid(svg, width, height) {
    const step = 20;

    const g = svg.append("g")
        .attr("stroke", "#ccc")
        .attr("stroke-width", 0.5);

    for (let x = width / 2 % step; x < width; x += step) {
        g.append("line")
            .attr("x1", x)
            .attr("y1", 0)
            .attr("x2", x)
            .attr("y2", height);
    }

    for (let y = height / 2 % step; y < height; y += step) {
        g.append("line")
            .attr("x1", 0)
            .attr("y1", y)
            .attr("x2", width)
            .attr("y2", y);
    }
}

function clearSVG() {
    svg.selectAll("path").remove();
}
