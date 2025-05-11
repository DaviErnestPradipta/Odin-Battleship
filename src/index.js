import "./script.css";
import {createBoard} from "./helper/DOM.js";
import Player from "./helper/Player.js";
import {shipLengths} from "./helper/Constants.js";

createBoard('.human.board');
createBoard('.computer.board');

const human = new Player();
const computer = new Player(true);

shipLengths.forEach(length => {
    computer.gameboard.placeShipRandomly(length);
});

// Modify from here

import {letterMap} from "./helper/Constants.js";

let selectedShip = null;
let selectedShipLength = null;
let isVertical = false;

const humanShips = document.querySelectorAll('.human.tracker .human.ship');

// 🆕 Handle rotation toggle
document.getElementById('arrow-button').addEventListener('click', () => {
    isVertical = !isVertical;
});

// 🆕 Handle ship tracker selection
humanShips.forEach(ship => {
    ship.addEventListener('click', () => {
        if (ship.classList.contains('placed')) return;
    
        humanShips.forEach(el => el.classList.remove('bold'));
        ship.classList.add('bold');
    
        selectedShip = ship;
        selectedShipLength = parseInt(ship.dataset.length); // Use dataset!
    });    
});

// 🆕 Hover + click interaction for placing ships
const board = document.querySelector('.human.board');
const cells = Array.from(board.children);

cells.forEach((cell, index) => {
    const x = index % 10;
    const y = Math.floor(index / 10);

    cell.addEventListener('mouseover', () => {
        if (!selectedShipLength) return;
        const cellsToBlink = getCellsToPreview(x, y, selectedShipLength, isVertical);
        if (cellsToBlink) {
            cellsToBlink.forEach(c => {
                c.classList.add('blink');
                c.textContent = letterMap[selectedShipLength]; // ✅ Show letter on preview
            });
        }
    });

    cell.addEventListener('mouseout', () => {
        cells.forEach(c => {
            c.classList.remove('blink');
            if (!c.classList.contains('placed')) c.textContent = ''; // ✅ Don’t erase placed letters
        });
    });

    cell.addEventListener('click', () => {
        if (!selectedShipLength) return;
        const cellsToPlace = getCellsToPreview(x, y, selectedShipLength, isVertical);
        if (cellsToPlace) {
            try {
                human.gameboard.placeShip(selectedShipLength, x, y, isVertical);

                // ✅ Mark only one matching tracker as placed
                if (selectedShip) selectedShip.classList.add('placed');

                humanShips.forEach(el => el.classList.remove('bold'));
                selectedShipLength = null;
                selectedShip = null;
            } catch (err) {
                console.warn("Invalid ship placement");
            }
        }
    });
});

function getCellsToPreview(x, y, length, vertical) {
    const board = document.querySelector('.human.board');
    const cells = [];

    for (let i = 0; i < length; i++) {
        const row = vertical ? y + i : y;
        const col = vertical ? x : x + i;
        if (row >= 10 || col >= 10) return null;

        const index = row * 10 + col;
        const cell = board.children[index];
        if (!cell || cell.classList.contains('placed')) return null;

        cells.push(cell);
    }

    return cells;
}