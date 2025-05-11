import {letterMap} from "./Constants.js";

export default function initialize(human) {
    let selectedShip = null;
    let selectedShipLength = null;
    let isVertical = false;

    const ships = document.querySelectorAll('.human.ship');
    const board = document.querySelector('.human.board');
    const cells = Array.from(board.children);

    document.getElementById('arrow-button').addEventListener('click', () => {
        isVertical = !isVertical;
    });

    ships.forEach(ship => {
        ship.addEventListener('click', () => {
            if (ship.classList.contains('placed')) return;
            ships.forEach(ship => ship.classList.remove('bold'));
            ship.classList.add('bold');
            selectedShip = ship;
            selectedShipLength = parseInt(ship.dataset.length);
        });
    });

    cells.forEach((cell, index) => {
        const x = index % 10;
        const y = Math.floor(index / 10);

        cell.addEventListener('mouseover', () => {
            if (!selectedShipLength) return;
            const cellsToBlink = getCells(x, y, selectedShipLength, isVertical);
            if (cellsToBlink) {
                cellsToBlink.forEach(cell => {
                    cell.classList.add('blink');
                    cell.textContent = letterMap[selectedShipLength];
                });
            }
        });

        cell.addEventListener('mouseout', () => {
            cells.forEach(cell => {
                cell.classList.remove('blink');
                if (!cell.classList.contains('placed')) cell.textContent = '';
            });
        });

        cell.addEventListener('click', () => {
            if (!selectedShipLength) return;
            const cellsToPlace = getCells(x, y, selectedShipLength, isVertical);
            if (cellsToPlace) {
                try {
                    human.gameboard.placeShip(selectedShipLength, x, y, isVertical);
                    if (selectedShip) selectedShip.classList.add('placed');

                    cellsToPlace.forEach(cell => {
                        cell.classList.remove('blink');
                        cell.classList.add('placed');
                        cell.textContent = letterMap[selectedShipLength];
                    });

                    ships.forEach(ship => ship.classList.remove('bold'));
                    selectedShipLength = null;
                    selectedShip = null;

                    const allPlaced = Array.from(ships).every(ship => ship.classList.contains('placed'));
                    if (allPlaced) {
                        document.getElementById('turn-button').disabled = true;
                        document.getElementById('arrow-button').disabled = true;
                    }
                } catch (err) {
                    console.warn("Invalid ship placement");
                }
            }
        });
    });

    function getCells(x, y, length, vertical) {
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
}