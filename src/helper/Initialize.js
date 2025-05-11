import {
    setupShipToSelect, 
    setupCellsToBlink, 
    setupCellsToPlace
} from "./InitializeHelpers.js";

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

    setupShipToSelect(ships, (ship, length) => {
        selectedShip = ship;
        selectedShipLength = length;
    });

    setupCellsToBlink(cells, () => selectedShipLength, () => isVertical);

    setupCellsToPlace(cells, human, ships, 
        () => selectedShipLength,
        () => isVertical,
        () => selectedShip,
        () => {
            selectedShip = null;
            selectedShipLength = null;
        }
    );
}