import {BOARD_SIZE, letterMap} from "./Constants.js";

export function createBoard(containerSelector) {
    const board = document.querySelector(containerSelector);
    for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
        const cell = document.createElement('div');
        board.appendChild(cell);
    }
};

export function createShip(length, x, y, isVertical = false, boardSelector) {
    const reveal = boardSelector.includes('human');
    if (reveal) revealShip(length, x, y, isVertical, boardSelector);
    updateTracker(length, boardSelector, 'placed');
}

export function updateTracker(length, boardSelector, state) {
    const side = boardSelector.includes('computer') ? 'computer' : 'human';
    const tracker = document.querySelector(`.${side}.tracker`);
    const shipElements = Array.from(tracker.querySelectorAll(`.${side}.ship`));
    const letter = letterMap[length];

    const target = shipElements.find(ship => 
        ship.textContent === letter && 
        !ship.classList.contains(state)
    );

    if ((side && state !== 'hit') || !side) target.classList.add(state);
}

export function updateCell(x, y, boardSelector, state) {
    const board = document.querySelector(boardSelector);
    const cellIndex = y * BOARD_SIZE + x;
    const cell = board.children[cellIndex];
    cell.classList.add(state);
}

function revealShip(length, x, y, isVertical = false, boardSelector) {
    const board = document.querySelector(boardSelector);

    for (let i = 0; i < length; i++) {
        const row = isVertical ? y + i : y;
        const col = isVertical ? x : x + i;

        const cellIndex = row * BOARD_SIZE + col;
        const cell = board.children[cellIndex];

        if (cell) cell.textContent = letterMap[length];
    }
}