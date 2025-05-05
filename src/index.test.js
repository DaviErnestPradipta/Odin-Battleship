import Ship from "./Ship.js";
import Gameboard from "./Gameboard.js";
import Player from "./Player.js";

test('Sink destroyer after three hits', () => {
    const destroyer = new Ship(3);
    destroyer.hit();
    destroyer.hit();
    expect(destroyer.isSunk()).toBeFalsy();
    destroyer.hit();
    expect(destroyer.isSunk()).toBeTruthy();
});

test('Place a ship and sink it', () => {
    const board = new Gameboard();
    board.placeShip(3, 0, 0);

    board.receiveAttack(0, 0);
    board.receiveAttack(1, 0);
    board.receiveAttack(2, 0);

    expect(board.allShipsSunk()).toBeTruthy();
});

test('Records missed attacks', () => {
    const board = new Gameboard();
    board.placeShip(2, 0, 0);

    board.receiveAttack(5, 5);

    expect(board.missedAttacks).toContainEqual([5, 5]);
});

test('Attack opponent board and hit ship', () => {
    const player1 = new Player();
    const player2 = new Player();

    player2.gameboard.placeShip(2, 0, 0);
    
    player1.attack(player2.gameboard, 0, 0);

    const ship = player2.gameboard.board[0][0];
    expect(ship.hits).toBe(1);
});

test('Compute makes registered random attack', () => {
    const human = new Player();
    const computer = new Player(true);

    const [x, y] = computer.randomAttack(human.gameboard);

    expect(human.gameboard.missedAttacks).toContainEqual([y, x]);
});