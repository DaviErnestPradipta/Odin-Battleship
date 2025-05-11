import {letterMap} from "./Constants.js";
import {getCells} from "./DOM.js";

export function setupShipToSelect(ships, onSelect) {
    ships.forEach(ship => {
        ship.addEventListener('click', () => {
            if (ship.classList.contains('placed')) return;
            ships.forEach(s => s.classList.remove('bold'));
            ship.classList.add('bold');
            const length = parseInt(ship.dataset.length);
            onSelect(ship, length);
        });
    });
}

export function setupCellsToBlink(cells, getSelectedLength, getIsVertical) {
    cells.forEach((cell, index) => {
        const x = index % 10;
        const y = Math.floor(index / 10);

        cell.addEventListener('mouseover', () => {
            const length = getSelectedLength();
            if (!length) return;

            const cellsToBlink = getCells(x, y, length, getIsVertical());
            if (cellsToBlink) {
                cellsToBlink.forEach(cell => {
                    cell.classList.add('blink');
                    cell.textContent = letterMap[length];
                });
            }
        });

        cell.addEventListener('mouseout', () => {
            cells.forEach(cell => {
                cell.classList.remove('blink');
                if (!cell.classList.contains('placed')) cell.textContent = '';
            });
        });
    });
}

export function setupCellsToPlace(cells, human, ships, 
    getLength, getIsVertical, getSelectedShip, clearSelection) {
    cells.forEach((cell, index) => {
        const x = index % 10;
        const y = Math.floor(index / 10);

        cell.addEventListener('click', () => {
            const length = getLength();
            if (!length) return;

            const cellsToPlace = getCells(x, y, length, getIsVertical());
            if (cellsToPlace) {
                try {
                    human.gameboard.placeShip(length, x, y, getIsVertical());
                    const selectedShip = getSelectedShip();
                    if (selectedShip) selectedShip.classList.add('placed');

                    cellsToPlace.forEach(cell => {
                        cell.classList.remove('blink');
                        cell.classList.add('placed');
                        cell.textContent = letterMap[length];
                    });

                    ships.forEach(ship => ship.classList.remove('bold'));
                    clearSelection();

                    const allPlaced = Array.from(ships).every(
                        ship => ship.classList.contains('placed'));
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
}