import Ship from "./Ship.js";
import Gameboard from "./Gameboard.js";

test('Sink destroyer after three hits', () => {
    const destroyer = new Ship(3);
    destroyer.hit();
    destroyer.hit();
    expect(destroyer.isSunk()).toBeFalsy();
    destroyer.hit();
    expect(destroyer.isSunk()).toBeTruthy();
})

test('Place a ship and sink it', () => {
    const board = new Gameboard();
    board.placeShip(3, 0, 0);

    board.receiveAttack(0, 0);
    board.receiveAttack(1, 0);
    board.receiveAttack(2, 0);

    expect(board.allShipsSunk()).toBeTruthy();
})

test('Records missed attacks', () => {
    const board = new Gameboard();
    board.placeShip(2, 0, 0);

    board.receiveAttack(5, 5);

    expect(board.missedAttacks).toContainEqual([5, 5]);
})