import {BOARD_SIZE} from "./Constants.js";
import Ship from "./Ship.js";

export default class Gameboard {
    constructor() {
        this.board = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null));
        this.ships = [];
        this.missedAttacks = [];
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
    }

    receiveAttack(x, y) {
        const cell = this.board[y][x];

        if (cell instanceof Ship) {
            cell.hit();
            const shipData = this.ships.find(s => s.ship === cell);
            shipData.hits.push([y, x]);
        }

        else this.missedAttacks.push([y, x]);
    }

    allShipsSunk() {
        return this.ships.every(({ship}) => ship.isSunk());
    }
}