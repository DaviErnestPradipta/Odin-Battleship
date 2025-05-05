import {Ship} from "./index.js";

test('Sink destroyer after three hits', () => {
    const destroyer = new Ship(3);
    destroyer.hit();
    destroyer.hit();
    expect(destroyer.isSunk()).toBeFalsy();
    destroyer.hit();
    expect(destroyer.isSunk()).toBeTruthy();
})