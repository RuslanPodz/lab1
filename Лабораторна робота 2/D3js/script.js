const width = 800;
const height = 400;
const svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height);

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
    const acceleration = parseFloat(document.getElementById("acceleration").value);
    const color = document.getElementById("color").value;

    const g = 9.81 * (acceleration / 10);
    const v0x = v0 * Math.cos(angle);
    const v0y = v0 * Math.sin(angle);

    let t = 0;
    const dt = 0.1;
    let maxHeight = 0;
    let totalDistance = 0;

    const path = svg.append("path")
        .attr("stroke", color)
        .attr("fill", "none");

    const points = [];

    function update() {
        const x = x0 + v0x * t;
        const y = y0 + v0y * t - 0.5 * g * t * t;

        if (y >= 0) {
            points.push({ x, y });
            path.attr("d", line(points));

            if (y > maxHeight) {
                maxHeight = y;
            }

            totalDistance = x;
            t += dt;
            requestAnimationFrame(update);
        } else {
            displayResults(t, totalDistance, maxHeight, v0y, g);
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

    g.append("text")
        .attr("x", width - 10)
        .attr("y", height / 2 - 10)
        .attr("font-size", "14px")
        .attr("text-anchor", "middle")
        .text("м");

    g.append("text")
        .attr("x", width / 2 + 10)
        .attr("y", 10)
        .attr("font-size", "14px")
        .attr("text-anchor", "middle")
        .text("м");

    g.append("text")
        .attr("x", width - 20)
        .attr("y", height / 2 - 20)
        .attr("font-size", "14px")
        .attr("text-anchor", "middle")
        .text("X");

    g.append("text")
        .attr("x", width / 2 + 20)
        .attr("y", 20)
        .attr("font-size", "14px")
        .attr("text-anchor", "middle")
        .text("Y");

    for (let i = -width / 2; i <= width / 2; i += 50) {
        g.append("line")
            .attr("x1", width / 2 + i)
            .attr("y1", height / 2 - 5)
            .attr("x2", width / 2 + i)
            .attr("y2", height / 2 + 5);

        g.append("text")
            .attr("x", width / 2 + i)
            .attr("y", height / 2 + 20)
            .attr("font-size", "12px")
            .attr("text-anchor", "middle")
            .text(i + " м");
    }

    for (let i = -height / 2; i <= height / 2; i += 50) {
        g.append("line")
            .attr("x1", width / 2 - 5)
            .attr("y1", height / 2 - i)
            .attr("x2", width / 2 + 5)
            .attr("y2", height / 2 - i);

        g.append("text")
            .attr("x", width / 2 - 20)
            .attr("y", height / 2 - i)
            .attr("font-size", "12px")
            .attr("text-anchor", "middle")
            .text(i + " м");
    }
}

function drawGrid(svg, width, height) {
    const step = 50;
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
    document.getElementById("time").textContent = "";
    document.getElementById("distance").textContent = "";
    document.getElementById("height").textContent = "";
}

function displayResults(time, distance, maxHeight, v0y, g) {
    const totalTime = (2 * v0y) / g;
    document.getElementById("time").textContent = totalTime.toFixed(2);
    document.getElementById("distance").textContent = distance.toFixed(2);
    document.getElementById("height").textContent = maxHeight.toFixed(2);
}