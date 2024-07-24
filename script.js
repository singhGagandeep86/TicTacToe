let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];

let currentPlayer = 'circle'; // Startspieler ist 'circle'
let gameActive = true; // Spielstatus

let circleSVG = generateCircleSVG(); // SVG für Kreis einmal generieren und speichern
let crossSVG = generateCrossSVG();   // SVG für Kreuz einmal generieren und speichern

function init() {
    render();
}

function handleCellClick(cell, index) {
    let winner = document.getElementById('winner');
    if (fields[index] === null && gameActive) { // Nur wenn das Feld leer ist und das Spiel aktiv ist
        fields[index] = currentPlayer;
        cell.innerHTML = currentPlayer === 'circle' ? circleSVG : crossSVG; // Spielerwechsel
        cell.onclick = null; // Klick deaktivieren
        if (checkWinner()) {
            gameActive = false; // Spiel beenden
            drawWinningLine(checkWinner());
            if (currentPlayer == 'circle') {
                winner.innerHTML = `Spieler mit <div class="circle">Kreis</div> hat gewonnen`;
            }
            else {
            winner.innerHTML = `Spieler mit <div class="cross">Kreuz</div> hat gewonnen`;
            }
        }
        currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
    }
}

function render() {
    let content = document.getElementById('content');
    
    // Tabelle generieren
    let tableHTML = '<table>';
    for (let i = 0; i < 3; i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < 3; j++) {
            let index = i * 3 + j;
            let symbol = '';

            if (fields[index] === 'circle') {
                symbol = circleSVG;
            } else if (fields[index] === 'cross') {
                symbol = crossSVG;
            }

            tableHTML += `<td onclick="handleCellClick(this, ${index})">${symbol}</td>`;  
        }
        tableHTML += '</tr>';
    }
    tableHTML += '</table>';

    // Tabelle dem content-Div zuweisen
    content.innerHTML = tableHTML;
}

// SVG für Kreis generieren
function generateCircleSVG() {
    return `
        <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
            <circle cx="35" cy="35" r="30" stroke="#00B0EF" stroke-width="5" fill="none">
                <animate attributeName="stroke-dasharray" from="0, 188.4" to="188.4, 188.4" dur="380ms" fill="freeze" />
            </circle>
        </svg>
    `;
    
}

// SVG für Kreuz generieren
function generateCrossSVG() {
    return `
        <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
            <line x1="15" y1="15" x2="55" y2="55" stroke="#fec700" stroke-width="5" stroke-linecap="round">
                <animate attributeName="stroke-dasharray" from="0, 56.57" to="56.57, 56.57" dur="380ms" fill="freeze" />
            </line>
            <line x1="55" y1="15" x2="15" y2="55" stroke="#fec700" stroke-width="5" stroke-linecap="round">
                <animate attributeName="stroke-dasharray" from="0, 56.57" to="56.57, 56.57" dur="380ms" fill="freeze" />
            </line>
        </svg>
    `;
}

// Initialisierung
init();

function checkWinner() {
    const winConditions = [
        [0, 1, 2], // Erste Zeile
        [3, 4, 5], // Zweite Zeile
        [6, 7, 8], // Dritte Zeile
        [0, 3, 6], // Erste Spalte
        [1, 4, 7], // Zweite Spalte
        [2, 5, 8], // Dritte Spalte
        [0, 4, 8], // Diagonale von links oben nach rechts unten
        [2, 4, 6], // Diagonale von rechts oben nach links unten
    ];

    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            return condition;
        }
    }

    return null;
}

function isGameOver() {
    return fields.every(field => field !== null);
}

function drawWinningLine(winningCells) {
    let content = document.getElementById('content');
    let table = content.querySelector('table'); 
    // Berechnen der Start- und Endpositionen für die Linie
    let startPos = getCellCenter(winningCells[0]);
    let endPos = getCellCenter(winningCells[2]);

    let lineHTML = `
        <svg class="winning-line" width="100%" height="100%">
            <line x1="${startPos.x}" y1="${startPos.y}" x2="${endPos.x}" y2="${endPos.y}" stroke="white" stroke-width="5" />
        </svg>
    `;

    // Zeige die Gewinnlinie an
    table.innerHTML += lineHTML;
}

function getCellCenter(index) {
    let row = Math.floor(index / 3);
    let col = index % 3;
    let cellSize = 100 + 5; // 70px für die Zelle + 5px für den Abstand
    return {
        x: col * cellSize + cellSize / 2,
        y: row * cellSize + cellSize / 2
    };
}

// Initialisierung
init();