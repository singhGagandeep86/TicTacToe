let fields = [
    null,
    null,
    'circle',
    'circle',
    null,
    null,
    'cross',
    'cross',
    null,
];

function init(){
    render();
}

function render() {
    let content = document.getElementById('content');

    // Generate Table
    let tableHTML = '<table>';
    for (let i = 0; i < 3; i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < 3; j++) {
            let index = i * 3 + j;
            let symbol = '';

            if (fields[index] === 'circle') {
                symbol = generateCircleSVG();
            } else if (fields[index] === 'cross') {
                symbol = generateCrossSVG();
            }

            tableHTML += `<td>${symbol}</td>`;
        }
        tableHTML += '</tr>';
    }
    tableHTML += '</table>';

    // Set table HTML to contetnDiv
    content.innerHTML = tableHTML;
}

function generateCircleSVG() {
    const svgNS = "http://www.w3.org/2000/svg";
    const svgElem = document.createElementNS(svgNS, "svg");
    svgElem.setAttribute("width", "70");
    svgElem.setAttribute("height", "70");
    svgElem.setAttribute("viewBox", "0 0 70 70");

    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", "35");
    circle.setAttribute("cy", "35");
    circle.setAttribute("r", "30");
    circle.setAttribute("stroke", "#00B0EF");
    circle.setAttribute("stroke-width", "5");
    circle.setAttribute("fill", "none");

    const animate = document.createElementNS(svgNS, "animate");
    animate.setAttribute("attributeName", "stroke-dasharray");
    animate.setAttribute("from", "0, 188.4"); // Circumference of the circle
    animate.setAttribute("to", "188.4, 188.4");
    animate.setAttribute("dur", "980ms");
    animate.setAttribute("fill", "freeze");

    circle.appendChild(animate);
    svgElem.appendChild(circle);

    return svgElem.outerHTML;
}

function generateCrossSVG() {
    const svgNS = "http://www.w3.org/2000/svg";
    const svgElem = document.createElementNS(svgNS, "svg");
    svgElem.setAttribute("width", "70");
    svgElem.setAttribute("height", "70");
    svgElem.setAttribute("viewBox", "0 0 70 70");

    const line1 = document.createElementNS(svgNS, "line");
    line1.setAttribute("x1", "15");
    line1.setAttribute("y1", "15");
    line1.setAttribute("x2", "55");
    line1.setAttribute("y2", "55");
    line1.setAttribute("stroke", "#fec700");
    line1.setAttribute("stroke-width", "5");
    line1.setAttribute("stroke-linecap", "round");

    const animate1 = document.createElementNS(svgNS, "animate");
    animate1.setAttribute("attributeName", "stroke-dasharray");
    animate1.setAttribute("from", "0, 56.57"); // Length of the line
    animate1.setAttribute("to", "56.57, 56.57");
    animate1.setAttribute("dur", "980ms");
    animate1.setAttribute("fill", "freeze");

    line1.appendChild(animate1);

    const line2 = document.createElementNS(svgNS, "line");
    line2.setAttribute("x1", "55");
    line2.setAttribute("y1", "15");
    line2.setAttribute("x2", "15");
    line2.setAttribute("y2", "55");
    line2.setAttribute("stroke", "#fec700");
    line2.setAttribute("stroke-width", "5");
    line2.setAttribute("stroke-linecap", "round");

    const animate2 = document.createElementNS(svgNS, "animate");
    animate2.setAttribute("attributeName", "stroke-dasharray");
    animate2.setAttribute("from", "0, 56.57"); // Length of the line
    animate2.setAttribute("to", "56.57, 56.57");
    animate2.setAttribute("dur", "980ms");
    animate2.setAttribute("fill", "freeze");

    line2.appendChild(animate2);

    svgElem.appendChild(line1);
    svgElem.appendChild(line2);

    return svgElem.outerHTML;
}


