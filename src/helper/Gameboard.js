import {BOARD_SIZE} from "./Constants.js";
import {createShip, updateCell, updateTracker} from "./DOM.js";
import Ship from "./Ship.js";

export default class Gameboard {
    constructor(boardSelector = '.human.board') {
        this.board = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null));
        this.ships = [];
        this.missedAttacks = [];
        this.boardSelector = boardSelector;
    }

    placeShip(length, x, y, isVertical = false) {
        const ship = new Ship(length);
        const positions = [];

        for (let i = 0; i < length; i++) {
            const row = isVertical ? y + i : y;
            const col = isVertical ? x : x + i;

            if (row >= BOARD_SIZE || col >= BOARD_SIZE || this.board[row][col] !== null)
                throw new Error("Invalid ship placement");

            positions.push([row, col]);
        }

        positions.forEach(([row, col]) => this.board[row][col] = ship);
        this.ships.push({ship, positions, hits: []});

        createShip(length, x, y, isVertical, this.boardSelector);
    }

    receiveAttack(x, y) {
        const cell = this.board[y][x];

        if (cell instanceof Ship) {
            cell.hit();
            const shipData = this.ships.find(s => s.ship === cell);
            shipData.hits.push([y, x]);

            updateTracker(cell.length, this.boardSelector, 'hit');
            updateCell(x, y, this.boardSelector, 'hit');

            if (cell.isSunk()) {
                updateTracker(cell.length, this.boardSelector, 'sunk');
            }
        }

        else {
            this.missedAttacks.push([y, x]);
            updateCell(x, y, this.boardSelector, 'miss');
        }
    }

    allShipsSunk() {
        return this.ships.every(({ship}) => ship.isSunk());
    }
}