import {BOARD_SIZE} from "./Constants.js";

export function createShip(length, x, y, isVertical = false, boardSelector) {
    const board = document.querySelector(boardSelector);

    const letterMap = {
        5: 'A',
        4: 'B',
        3: 'C',
        2: 'D',
        1: 'S'
    };

    const shipLetter = letterMap[length];
    if (!shipLetter) return;

    for (let i = 0; i < length; i++) {
        const row = isVertical ? y + i : y;
        const col = isVertical ? x : x + i;

        const cellIndex = row * BOARD_SIZE + col;
        const cell = board.children[cellIndex];

        if (cell) cell.textContent = shipLetter;
    }

    updateTracker(shipLetter, boardSelector);
}

function updateTracker(letter, boardSelector) {
    const side = boardSelector.includes('computer') ? 'computer' : 'human';
    const tracker = document.querySelector(`.${side}.tracker`);
    const shipElements = Array.from(tracker.querySelectorAll(`.${side}.ship`));

    const target = shipElements.find(ship => 
        ship.textContent === letter && 
        !ship.classList.contains('placed')
    );

    if (target) target.classList.add('placed');
}


export function createBoard(containerSelector) {
    const board = document.querySelector(containerSelector);
    for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
        const cell = document.createElement('div');
        board.appendChild(cell);
    }
};